import algosdk from "algosdk";
import { getAlgodClient } from "../utils/algodClient.js";
import { Transaction } from "../models/Transaction.js";

const algodClient = getAlgodClient();

export async function waitForConfirmation(txId, maxRounds = 10) {
  const status = await algodClient.status().do();
  let lastRound = status["last-round"];
  const startRound = lastRound;
  const maxRound = startRound + maxRounds;

  while (lastRound < maxRound) {
    const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
    if (pendingInfo && pendingInfo["confirmed-round"] && pendingInfo["confirmed-round"] > 0) {
      return pendingInfo;
    }
    await algodClient.statusAfterBlock(lastRound + 1).do();
    const s = await algodClient.status().do();
    lastRound = s["last-round"];
  }
  throw new Error("Transaction not confirmed in time");
}

export async function sendAlgos(senderMnemonic, to, amountAlgos, note) {
  if (!algosdk.isValidAddress(to)) throw new Error("Invalid recipient address");

  const recoveredAccount = algosdk.mnemonicToSecretKey(senderMnemonic);
  const from = recoveredAccount.addr;

  const amountMicro = Math.round(amountAlgos * 1e6);
  const params = await algodClient.getTransactionParams().do();

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from,
    to,
    amount: amountMicro,
    suggestedParams: params,
    note: note ? new TextEncoder().encode(note) : undefined
  });

  const signedTxn = txn.signTxn(recoveredAccount.sk);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();

  const dbRecord = await Transaction.create({
    txId,
    from,
    to,
    amount: amountAlgos,
    status: "pending",
    note,
    createdAt: new Date()
  });

  return { txId, dbRecord };
}

export async function getTransactionStatus(txId) {
  const pending = await algodClient.pendingTransactionInformation(txId).do();
  const confirmedRound = pending["confirmed-round"] || null;
  let status = "pending";
  if (confirmedRound && confirmedRound > 0) status = "confirmed";
  if (pending["pool-error"] && pending["pool-error"].length > 0) status = "failed";

  await Transaction.findOneAndUpdate({ txId }, { status, confirmedRound });

  return { txId, status, confirmedRound, pending };
}

export async function listTransactions(limit = 50) {
  return Transaction.find().sort({ createdAt: -1 }).limit(limit);
}

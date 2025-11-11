import algosdk from "algosdk";

const algodToken = "";
const algodServer = "https://testnet-api.algonode.cloud";
const algodPort = "";
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

// Sender ke details
const senderMnemonic = "sword comfort syrup amateur direct cereal boat man west prefer aisle welcome side rose athlete develop brief club power allow refuse nasty bachelor above mom"; // ⚠️ test mnemonic hi daalna
const senderAccount = algosdk.mnemonicToSecretKey(senderMnemonic);

// Receiver ka address
const receiver = "TW3A3ZK4HPAQ3FGBGGQJW6CA67U65M4TDKH3DH645EYL46P37NA2T6Z2MI";

(async () => {
  try {
    // Transaction params
    let params = await algodClient.getTransactionParams().do();

    // Amount in microAlgos (1 Algo = 1e6 microAlgo)
    let amount = 1000000; // 1 Algo

    let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: senderAccount.addr,
      to: receiver,
      amount: amount,
      suggestedParams: params,
    });

    // Sign the transaction
    let signedTxn = txn.signTxn(senderAccount.sk);

    // Send transaction
    let tx = await algodClient.sendRawTransaction(signedTxn).do();
    console.log("✅ Transaction sent with ID:", tx.txId);

    // Wait for confirmation
    await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
    console.log("🎉 Transaction confirmed!");
  } catch (err) {
    console.error("❌ Send Error:", err);
  }
})();

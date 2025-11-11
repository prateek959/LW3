import algosdk from "algosdk";

const algodToken = "";
const algodServer = "https://testnet-api.algonode.cloud";
const algodPort = "";

// 👇 Tumhara sender account ka mnemonic yahan paste karo
const mnemonic = "pet kind caution test denial over tiny laundry cat spider verify clog someone execute eternal control sound into duck opera cabin puzzle slot able close";

// 👇 Receiver address (agar nahi hai, to main ek test de sakta hoon)
const receiver = "PUT_RECEIVER_ADDRESS_HERE"; // Replace karo apne valid TestNet address se

const runTransaction = async () => {
  try {
    const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

    const sender = algosdk.mnemonicToSecretKey(mnemonic);
    const params = await algodClient.getTransactionParams().do();

    const amount = 0.1 * 1e6; // 0.1 ALGO in microAlgos
    const note = new TextEncoder().encode("testing transaction");

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: sender.addr,
      to: receiver,
      amount,
      note,
      suggestedParams: params,
    });

    const signedTxn = txn.signTxn(sender.sk);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();

    console.log("✅ Transaction sent successfully!");
    console.log("Transaction ID:", txId);
  } catch (err) {
    console.error("❌ Error sending transaction:", err.message);
  }
};

runTransaction();

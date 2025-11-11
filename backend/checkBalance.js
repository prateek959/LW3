import algosdk from "algosdk";

const algodToken = "";
const algodServer = "https://testnet-api.algonode.cloud";
const algodPort = "";

// Client banao
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

// Apna address paste karo (jo tumne faucet me use kiya tha)
const address = "BE2UNZIAJVHKHVF76YII66PK4MX3PEJRVB6BWOXJB2KW2C2EJDMIOYX4AI"; // ← yahan apna address daalna

(async () => {
  try {
    const accountInfo = await algodClient.accountInformation(address).do();
    console.log("✅ Balance (in microAlgos):", accountInfo.amount);
    console.log("💰 Balance (in ALGOs):", accountInfo.amount / 1e6);
  } catch (err) {
    console.error("❌ Error checking balance:", err);
  }
})();

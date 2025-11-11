import algosdk from "algosdk";

const algodToken = "";
const algodServer = "https://testnet-api.algonode.cloud";
const algodPort = "";

// Client banao
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

// Apna address paste karo (jo tumne faucet me use kiya tha)
const address = "3FP7TLLC2PRKUAUKM43JTK25QBWMHVXJEQIANOJHZE5CDLZGYA5QFPVTPM"; // ← yahan apna address daalna
// sword comfort syrup amateur direct cereal boat man west prefer aisle welcome side rose athlete develop brief club power allow refuse nasty bachelor above mom
(async () => {
  try {
    const accountInfo = await algodClient.accountInformation(address).do();
    console.log("✅ Balance (in microAlgos):", accountInfo.amount);
    console.log("💰 Balance (in ALGOs):", accountInfo.amount / 1e6);
  } catch (err) {
    console.error("❌ Error checking balance:", err);
  }
})();

import algosdk from "algosdk";

const account = algosdk.generateAccount();

// In your SDK version, account.addr is already a string
const address = account.addr;
const mnemonic = algosdk.secretKeyToMnemonic(account.sk);

console.log("✅ Your new Algorand TestNet Account created!");
console.log("Address:", address);
console.log("Mnemonic:", mnemonic);

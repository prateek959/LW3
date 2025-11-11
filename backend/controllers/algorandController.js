import { validationResult } from "express-validator";
import * as algorandService from "../services/algorandService.js";

export async function send(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { to, amount, mnemonic, note } = req.body;
    if (!mnemonic) return res.status(400).json({ error: "Sender mnemonic required" });
    if (!to) return res.status(400).json({ error: "Recipient address required" });
    if (typeof amount !== "number" || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    const result = await algorandService.sendAlgos(mnemonic, to, amount, note);
    return res.status(201).json({ message: "Transaction submitted", txId: result.txId });
  } catch (err) {
    console.error("Send Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}

export async function status(req, res) {
  try {
    const { txId } = req.params;
    if (!txId) return res.status(400).json({ error: "txId required" });

    const info = await algorandService.getTransactionStatus(txId);
    return res.json(info);
  } catch (err) {
    console.error("Status Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}

export async function transactions(req, res) {
  try {
    const list = await algorandService.listTransactions();
    return res.json(list);
  } catch (err) {
    console.error("Transactions Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}

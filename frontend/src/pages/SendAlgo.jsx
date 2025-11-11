import React, { useState, useEffect, useRef } from "react";
import api from "../utils/api";

export default function SendAlgo() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const pollRef = useRef(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const handleSend = async () => {
    setResult(null);
    if (!to || !amount || !mnemonic) {
      alert("Please fill recipient, amount and mnemonic.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/api/algorand/send", {
        to: to.trim(),
        amount: parseFloat(amount),
        mnemonic: mnemonic.trim(),
        note: note.trim()
      });
      const txId = res.data.txId;
      setResult({ txId, status: "submitted" });

      // Poll status every 2s until confirmed or max attempts
      let attempts = 0;
      pollRef.current = setInterval(async () => {
        attempts++;
        try {
          const s = await api.get(`/api/algorand/status/${txId}`);
          const { status, confirmedRound } = s.data;
          setResult(prev => ({ ...prev, status, confirmedRound }));
          if (status === "confirmed" || status === "failed" || attempts >= 20) {
            clearInterval(pollRef.current);
            pollRef.current = null;
            setLoading(false);
          }
        } catch (err) {
          // ignore but keep polling
          if (attempts >= 20) {
            clearInterval(pollRef.current);
            pollRef.current = null;
            setLoading(false);
          }
        }
      }, 2000);

    } catch (err) {
      const msg = err?.response?.data?.error || err.message || "Unknown error";
      setResult({ error: msg });
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Send ALGO</h2>
      <label className="small-muted">Recipient address</label>
      <input value={to} onChange={e => setTo(e.target.value)} placeholder="Algorand address (TestNet)" />
      <label className="small-muted">Amount (ALGO)</label>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 0.1" />
      <label className="small-muted">Sender mnemonic (25 words) — test only</label>
      <textarea value={mnemonic} onChange={e => setMnemonic(e.target.value)} rows={3} placeholder="paste 25-word mnemonic here" />
      <label className="small-muted">Note (optional)</label>
      <input value={note} onChange={e => setNote(e.target.value)} placeholder="optional note" />
      <div style={{marginTop:12}}>
        <button onClick={handleSend} disabled={loading}>{loading ? "Sending..." : "Send Transaction"}</button>
      </div>

      {result && (
        <div style={{marginTop:16}}>
          <h4>Result</h4>
          <div className="pre">
            <pre style={{margin:0}}>{JSON.stringify(result, null, 2)}</pre>
          </div>
          {result.txId && (
            <p className="small-muted">View status at: <code>/api/algorand/status/{result.txId}</code></p>
          )}
        </div>
      )}
    </div>
  );
}

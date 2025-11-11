import React, { useState, useEffect } from "react";
import api from "../utils/api";

export default function Transactions() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/algorand/transactions");
      setList(res.data || []);
    } catch (err) {
      alert("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  return (
    <div className="card">
      <h2>Saved Transactions</h2>
      <button onClick={fetch} style={{marginBottom:12}}>Refresh</button>
      {loading && <div className="small-muted">Loading...</div>}
      {list.length === 0 && <div className="small-muted">No transactions found.</div>}
      {list.map(tx => (
        <div key={tx.txId} style={{marginBottom:10, padding:10, border:"1px solid #eef2f7", borderRadius:8}}>
          <div><strong>TxId:</strong> {tx.txId}</div>
          <div><strong>From:</strong> {tx.from}</div>
          <div><strong>To:</strong> {tx.to}</div>
          <div><strong>Amount:</strong> {tx.amount} ALGO</div>
          <div><strong>Status:</strong> {tx.status} {tx.confirmedRound ? ` (round ${tx.confirmedRound})` : ""}</div>
          <div className="small-muted">Created: {new Date(tx.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}

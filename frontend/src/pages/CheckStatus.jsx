import React, { useState } from "react";
import api from "../utils/api";

export default function CheckStatus() {
  const [txId, setTxId] = useState("");
  const [info, setInfo] = useState(null);

  const handleCheck = async () => {
    if (!txId) return alert("Enter txId");
    try {
      const res = await api.get(`/api/algorand/status/${txId.trim()}`);
      setInfo(res.data);
    } catch (err) {
      const msg = err?.response?.data?.error || err.message || "Error";
      setInfo({ error: msg });
    }
  };

  return (
    <div className="card">
      <h2>Check Transaction Status</h2>
      <input value={txId} onChange={e => setTxId(e.target.value)} placeholder="Transaction ID (txId)" />
      <div style={{marginTop:10}}>
        <button onClick={handleCheck}>Check Status</button>
      </div>

      {info && (
        <div style={{marginTop:16}}>
          <h4>Response</h4>
          <div className="pre">
            <pre style={{margin:0}}>{JSON.stringify(info, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

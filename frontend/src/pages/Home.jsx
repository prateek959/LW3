import React from "react";

export default function Home() {
  return (
    <div className="card">
      <h1>Algorand TestNet DApp</h1>
      <p className="small-muted">Send ALGO on TestNet, view and check transaction status. Your backend must be running at <code>http://localhost:4000</code>.</p>
      <hr />
      <p>Steps:</p>
      <ol>
        <li>Create / fund TestNet account (you already did).</li>
        <li>Go to <strong>Send</strong> and paste recipient, amount, and your 25-word mnemonic (test only).</li>
        <li>Use <strong>Transactions</strong> to view stored DB transactions and <strong>Check Status</strong> to verify confirmations.</li>
      </ol>
    </div>
  );
}

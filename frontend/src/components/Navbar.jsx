import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{fontWeight:700}}>Algorand DApp</div>
        <div className="small-muted">TestNet</div>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/send">Send</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/status">Check Status</Link>
      </div>
    </div>
  );
}

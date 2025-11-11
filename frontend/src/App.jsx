import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SendAlgo from "./pages/SendAlgo";
import Transactions from "./pages/Transactions";
import CheckStatus from "./pages/CheckStatus";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/send" element={<SendAlgo />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/status" element={<CheckStatus />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

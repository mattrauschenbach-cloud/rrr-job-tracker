import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  return (
    <div className="app">
      <h1>🏗️ RRR Job Tracker</h1>
      <p>Jobs. Workers. Time. Materials. Payroll.</p>

      <div className="card">
        <h2>We are live, bruh.</h2>
        <p>Next we build the dashboard.</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

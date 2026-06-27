import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const navItems = [
  "Dashboard",
  "Jobs",
  "Workers",
  "Time",
  "Materials",
  "Payroll",
  "Reports",
  "Settings",
];

function App() {
  const [page, setPage] = useState("Dashboard");

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">RRR</div>

          <h1>RRR Job Tracker</h1>

          <p>Remodeling Command Center</p>
        </div>

        <nav>
          {navItems.map((item) => (
            <button
              key={item}
              className={page === item ? "navBtn active" : "navBtn"}
              onClick={() => setPage(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">

        <div className="topbar">

          <div>
            <h2>{page}</h2>
            <p>Track labor, materials, payroll, and profit.</p>
          </div>

          <button className="primaryBtn">
            + Add Entry
          </button>

        </div>

        <div className="statsGrid">

          <div className="statCard">
            <span>Active Jobs</span>
            <strong>3</strong>
          </div>

          <div className="statCard">
            <span>Labor This Week</span>
            <strong>$0.00</strong>
          </div>

          <div className="statCard">
            <span>Materials</span>
            <strong>$0.00</strong>
          </div>

          <div className="statCard profit">
            <span>Estimated Profit</span>
            <strong>$0.00</strong>
          </div>

        </div>

        <div className="panel">
          <h3>{page}</h3>

          <p>
            Welcome to the RRR Job Tracker.
          </p>

          <p>
            Next we'll build:
          </p>

          <ul>
            <li>✔ Jobs</li>
            <li>✔ Workers</li>
            <li>✔ Time Tracking</li>
            <li>✔ Materials</li>
            <li>✔ Payroll</li>
            <li>✔ Reports</li>
          </ul>
        </div>

      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

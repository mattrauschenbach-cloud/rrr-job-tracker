import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { navItems } from "./data";
import "./style.css";

function App() {
  const [page, setPage] = useState("Dashboard");

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">RRR</div>
          <div>
            <h1>Job Tracker</h1>
            <p>Remodeling Command Center</p>
          </div>
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
        <header className="topbar">
          <div>
            <h2>{page}</h2>
            <p>Track labor, materials, payroll, and profit.</p>
          </div>
          <button className="primaryBtn">+ Add Entry</button>
        </header>

        <section className="statsGrid">
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
        </section>

        <section className="panel">
          <h3>{page}</h3>
          <p>This is where the {page.toLowerCase()} screen will go.</p>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

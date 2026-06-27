import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { navItems } from "./data";
import "./style.css";

function App() {
  const [page, setPage] = useState("Dashboard");

  const [jobs, setJobs] = useState([
    {
      id: 1,
      name: "Rosemary Garage",
      customer: "Rosemary Client",
      address: "15054 Rosemary",
      price: 32000,
      status: "In Progress",
      labor: 0,
      materials: 0,
    },
  ]);

  const [newJob, setNewJob] = useState({
    name: "",
    customer: "",
    address: "",
    price: "",
    status: "In Progress",
  });

  function addJob(e) {
    e.preventDefault();

    if (!newJob.name || !newJob.price) return;

    setJobs([
      ...jobs,
      {
        id: Date.now(),
        name: newJob.name,
        customer: newJob.customer,
        address: newJob.address,
        price: Number(newJob.price),
        status: newJob.status,
        labor: 0,
        materials: 0,
      },
    ]);

    setNewJob({
      name: "",
      customer: "",
      address: "",
      price: "",
      status: "In Progress",
    });
  }

  const totals = useMemo(() => {
    const contractTotal = jobs.reduce((sum, job) => sum + Number(job.price), 0);
    const laborTotal = jobs.reduce((sum, job) => sum + Number(job.labor), 0);
    const materialTotal = jobs.reduce((sum, job) => sum + Number(job.materials), 0);

    return {
      contractTotal,
      laborTotal,
      materialTotal,
      profit: contractTotal - laborTotal - materialTotal,
    };
  }, [jobs]);

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
          <button className="primaryBtn" onClick={() => setPage("Jobs")}>
            + Add Job
          </button>
        </header>

        <section className="statsGrid">
          <div className="statCard">
            <span>Active Jobs</span>
            <strong>{jobs.length}</strong>
          </div>
          <div className="statCard">
            <span>Contract Total</span>
            <strong>${totals.contractTotal.toLocaleString()}</strong>
          </div>
          <div className="statCard">
            <span>Labor + Materials</span>
            <strong>${(totals.laborTotal + totals.materialTotal).toLocaleString()}</strong>
          </div>
          <div className="statCard profit">
            <span>Estimated Profit</span>
            <strong>${totals.profit.toLocaleString()}</strong>
          </div>
        </section>

        {page === "Dashboard" && (
          <section className="panel">
            <h3>Dashboard</h3>
            <p>Welcome to the RRR Job Tracker.</p>

            <div className="jobGrid">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        )}

        {page === "Jobs" && (
          <section className="panel">
            <h3>Add New Job</h3>

            <form className="formGrid" onSubmit={addJob}>
              <input
                placeholder="Job name"
                value={newJob.name}
                onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
              />

              <input
                placeholder="Customer name"
                value={newJob.customer}
                onChange={(e) => setNewJob({ ...newJob, customer: e.target.value })}
              />

              <input
                placeholder="Job address"
                value={newJob.address}
                onChange={(e) => setNewJob({ ...newJob, address: e.target.value })}
              />

              <input
                type="number"
                placeholder="Contract price"
                value={newJob.price}
                onChange={(e) => setNewJob({ ...newJob, price: e.target.value })}
              />

              <select
                value={newJob.status}
                onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
              >
                <option>Lead</option>
                <option>Scheduled</option>
                <option>In Progress</option>
                <option>Complete</option>
                <option>Paid</option>
              </select>

              <button className="primaryBtn">Save Job</button>
            </form>

            <h3 className="sectionTitle">All Jobs</h3>

            <div className="jobGrid">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        )}

        {page !== "Dashboard" && page !== "Jobs" && (
          <section className="panel">
            <h3>{page}</h3>
            <p>This screen is next.</p>
          </section>
        )}
      </main>
    </div>
  );
}

function JobCard({ job }) {
  const totalCost = Number(job.labor) + Number(job.materials);
  const profit = Number(job.price) - totalCost;

  return (
    <div className="jobCard">
      <div className="jobTop">
        <div>
          <h4>{job.name}</h4>
          <p>{job.customer || "No customer added"}</p>
        </div>
        <span className="statusBadge">{job.status}</span>
      </div>

      <p className="address">{job.address || "No address added"}</p>

      <div className="moneyGrid">
        <div>
          <span>Contract</span>
          <strong>${Number(job.price).toLocaleString()}</strong>
        </div>
        <div>
          <span>Cost</span>
          <strong>${totalCost.toLocaleString()}</strong>
        </div>
        <div>
          <span>Profit</span>
          <strong className={profit >= 0 ? "goodMoney" : "badMoney"}>
            ${profit.toLocaleString()}
          </strong>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

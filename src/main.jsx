import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

import "./style.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Workers from "./pages/Workers";
import Time from "./pages/Time";
import Materials from "./pages/Materials";
import Payroll from "./pages/Payroll";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import {
  listenToJobs,
  createJob
} from "./services/jobsService";

import {
  listenToWorkers,
  createWorker
} from "./services/workersService";

function App() {
  const [page, setPage] = useState("Dashboard");

  const [jobs, setJobs] = useState([]);
  const [workers, setWorkers] = useState([]);

  const [newJob, setNewJob] = useState({
    name: "",
    customer: "",
    address: "",
    price: "",
    status: "In Progress",
  });

  const [newWorker, setNewWorker] = useState({
    name: "",
    rate: "",
    status: "Active",
  });

  useEffect(() => {
    const unsubscribeJobs = listenToJobs(setJobs);
    const unsubscribeWorkers = listenToWorkers(setWorkers);

    return () => {
      unsubscribeJobs();
      unsubscribeWorkers();
    };
  }, []);

  async function addJob(e) {
    e.preventDefault();

    if (!newJob.name || !newJob.price) return;

    await createJob({
      ...newJob,
      price: Number(newJob.price),
      labor: 0,
      materials: 0,
    });

    setNewJob({
      name: "",
      customer: "",
      address: "",
      price: "",
      status: "In Progress",
    });
  }

  async function addWorker(e) {
    e.preventDefault();

    if (!newWorker.name || !newWorker.rate) return;

    await createWorker({
      name: newWorker.name,
      rate: Number(newWorker.rate),
      status: newWorker.status,
    });

    setNewWorker({
      name: "",
      rate: "",
      status: "Active",
    });
  }

  const totals = useMemo(() => {
    const contractTotal = jobs.reduce((s, j) => s + Number(j.price || 0), 0);
    const laborTotal = jobs.reduce((s, j) => s + Number(j.labor || 0), 0);
    const materialTotal = jobs.reduce((s, j) => s + Number(j.materials || 0), 0);

    return {
      contractTotal,
      laborTotal,
      materialTotal,
      profit: contractTotal - laborTotal - materialTotal,
    };
  }, [jobs]);

  function renderPage() {
    switch (page) {
      case "Dashboard":
        return <Dashboard jobs={jobs} totals={totals} />;

      case "Jobs":
        return (
          <Jobs
            jobs={jobs}
            newJob={newJob}
            setNewJob={setNewJob}
            addJob={addJob}
          />
        );

      case "Workers":
        return (
          <Workers
            workers={workers}
            newWorker={newWorker}
            setNewWorker={setNewWorker}
            addWorker={addWorker}
          />
        );

      case "Time":
        return <Time />;

      case "Materials":
        return <Materials />;

      case "Payroll":
        return <Payroll />;

      case "Reports":
        return <Reports />;

      case "Settings":
        return <Settings />;

      default:
        return <Dashboard jobs={jobs} totals={totals} />;
    }
  }

  return (
    <div className="appShell">
      <Sidebar page={page} setPage={setPage} />

      <main className="main">
        <Topbar page={page} setPage={setPage} />

        {renderPage()}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

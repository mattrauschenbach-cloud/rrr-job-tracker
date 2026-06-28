import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

import "./style.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Workers from "./pages/Workers";
import Time from "./pages/Time";
import Materials from "./pages/Materials";
import Payroll from "./pages/Payroll";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import { listenToJobs, createJob } from "./services/jobsService";
import { listenToWorkers, createWorker } from "./services/workersService";
import { listenToTimeEntries, createTimeEntry } from "./services/timeService";

function App() {
  const [page, setPage] = useState("Dashboard");
  const [selectedJob, setSelectedJob] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);

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

  const [timeEntry, setTimeEntry] = useState({
    workerId: "",
    jobId: "",
    date: "",
    hours: "",
    lunchMinutes: "",
    notes: "",
  });

  useEffect(() => {
    const unsubscribeJobs = listenToJobs(setJobs);
    const unsubscribeWorkers = listenToWorkers(setWorkers);
    const unsubscribeTime = listenToTimeEntries(setTimeEntries);

    return () => {
      unsubscribeJobs();
      unsubscribeWorkers();
      unsubscribeTime();
    };
  }, []);

  function openJob(job) {
    setSelectedJob(job);
    setPage("Job Details");
  }

  function closeJob() {
    setSelectedJob(null);
    setPage("Jobs");
  }

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

  async function addTimeEntry(e) {
    e.preventDefault();

    if (!timeEntry.workerId || !timeEntry.jobId || !timeEntry.hours) return;

    await createTimeEntry({
      ...timeEntry,
      hours: Number(timeEntry.hours),
      lunchMinutes: Number(timeEntry.lunchMinutes || 0),
    });

    setTimeEntry({
      workerId: "",
      jobId: "",
      date: "",
      hours: "",
      lunchMinutes: "",
      notes: "",
    });
  }

  function getWorker(workerId) {
    return workers.find((worker) => worker.id === workerId);
  }

  const laborTotal = useMemo(() => {
    return timeEntries.reduce((sum, entry) => {
      const worker = getWorker(entry.workerId);
      const rate = Number(worker?.rate || 0);
      const hours = Number(entry.hours || 0);

      return sum + rate * hours;
    }, 0);
  }, [timeEntries, workers]);

  const totals = useMemo(() => {
    const contractTotal = jobs.reduce((s, j) => s + Number(j.price || 0), 0);
    const materialTotal = jobs.reduce((s, j) => s + Number(j.materials || 0), 0);

    return {
      contractTotal,
      laborTotal,
      materialTotal,
      profit: contractTotal - laborTotal - materialTotal,
    };
  }, [jobs, laborTotal]);

  function renderPage() {
    switch (page) {
      case "Dashboard":
        return <Dashboard jobs={jobs} totals={totals} openJob={openJob} />;

      case "Jobs":
        return (
          <Jobs
            jobs={jobs}
            newJob={newJob}
            setNewJob={setNewJob}
            addJob={addJob}
            openJob={openJob}
          />
        );

      case "Job Details":
        return selectedJob ? (
          <JobDetails job={selectedJob} onBack={closeJob} />
        ) : (
          <Jobs
            jobs={jobs}
            newJob={newJob}
            setNewJob={setNewJob}
            addJob={addJob}
            openJob={openJob}
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

      case "Daily Log":
        return (
          <Time
            jobs={jobs}
            workers={workers}
            timeEntry={timeEntry}
            setTimeEntry={setTimeEntry}
            addTimeEntry={addTimeEntry}
          />
        );

      case "Materials":
        return <Materials />;

      case "Payroll":
        return <Payroll />;

      case "Reports":
        return <Reports />;

      case "Settings":
        return <Settings />;

      default:
        return <Dashboard jobs={jobs} totals={totals} openJob={openJob} />;
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


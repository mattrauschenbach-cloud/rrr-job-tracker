import React, { useMemo, useState } from "react";
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

function App() {

  const [page,setPage]=useState("Dashboard");

  const [jobs,setJobs]=useState([
    {
      id:1,
      name:"Rosemary Garage",
      customer:"Rosemary Client",
      address:"15054 Rosemary",
      price:32000,
      status:"In Progress",
      labor:0,
      materials:0
    }
  ]);

  const [newJob,setNewJob]=useState({
    name:"",
    customer:"",
    address:"",
    price:"",
    status:"In Progress"
  });

  function addJob(e){

    e.preventDefault();

    if(!newJob.name || !newJob.price) return;

    setJobs([
      ...jobs,
      {
        id:Date.now(),
        ...newJob,
        price:Number(newJob.price),
        labor:0,
        materials:0
      }
    ]);

    setNewJob({
      name:"",
      customer:"",
      address:"",
      price:"",
      status:"In Progress"
    });

  }

  const totals=useMemo(()=>{

    const contractTotal=jobs.reduce((s,j)=>s+j.price,0);

    const laborTotal=jobs.reduce((s,j)=>s+j.labor,0);

    const materialTotal=jobs.reduce((s,j)=>s+j.materials,0);

    return{
      contractTotal,
      laborTotal,
      materialTotal,
      profit:contractTotal-laborTotal-materialTotal
    }

  },[jobs]);

  function renderPage(){

    switch(page){

      case "Dashboard":
        return <Dashboard jobs={jobs} totals={totals}/>

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
        return <Workers/>

      case "Time":
        return <Time/>

      case "Materials":
        return <Materials/>

      case "Payroll":
        return <Payroll/>

      case "Reports":
        return <Reports/>

      case "Settings":
        return <Settings/>

      default:
        return <Dashboard jobs={jobs} totals={totals}/>
    }

  }

  return(

    <div className="appShell">

      <Sidebar
        page={page}
        setPage={setPage}
      />

      <main className="main">

        <Topbar
          page={page}
          setPage={setPage}
        />

        {renderPage()}

      </main>

    </div>

  );

}

createRoot(document.getElementById("root")).render(<App/>);

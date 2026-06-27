import JobCard from "../components/JobCard";

export default function Dashboard({ jobs, totals }) {
  return (
    <>
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

      <section className="panel">
        <h3>Dashboard</h3>
        <p>Welcome to RRR OS.</p>

        <div className="jobGrid">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </>
  );
}

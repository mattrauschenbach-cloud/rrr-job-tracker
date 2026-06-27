import JobCard from "../components/JobCard";

export default function Jobs({ jobs, newJob, setNewJob, addJob }) {
  return (
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
  );
}

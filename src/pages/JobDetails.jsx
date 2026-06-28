export default function JobDetails({ job, onBack }) {
  const labor = Number(job.labor || 0);
  const materials = Number(job.materials || 0);
  const contract = Number(job.price || 0);
  const totalCost = labor + materials;
  const profit = contract - totalCost;

  return (
    <section className="panel jobDetails">
      <button className="secondaryBtn" onClick={onBack}>
        ← Back to Jobs
      </button>

      <div className="jobHero">
        <div>
          <span className="eyebrow">Job Workspace</span>
          <h3>{job.name}</h3>
          <p>{job.customer || "No customer added"}</p>
          <p className="address">{job.address || "No address added"}</p>
        </div>

        <span className="statusBadge">{job.status}</span>
      </div>

      <div className="detailsStats">
        <div>
          <span>Contract</span>
          <strong>${contract.toLocaleString()}</strong>
        </div>
        <div>
          <span>Labor</span>
          <strong>${labor.toLocaleString()}</strong>
        </div>
        <div>
          <span>Materials</span>
          <strong>${materials.toLocaleString()}</strong>
        </div>
        <div>
          <span>Profit</span>
          <strong className={profit >= 0 ? "goodMoney" : "badMoney"}>
            ${profit.toLocaleString()}
          </strong>
        </div>
      </div>

      <div className="workspaceTabs">
        <button className="tab activeTab">Overview</button>
        <button className="tab">Crew</button>
        <button className="tab">Daily Log</button>
        <button className="tab">Materials</button>
        <button className="tab">Photos</button>
        <button className="tab">Invoices</button>
        <button className="tab">Notes</button>
      </div>

      <div className="workspaceGrid">
        <div className="workspaceCard">
          <h4>Job Snapshot</h4>
          <p>Status: {job.status}</p>
          <p>Customer: {job.customer || "Not added"}</p>
          <p>Address: {job.address || "Not added"}</p>
        </div>

        <div className="workspaceCard">
          <h4>Budget vs Actual</h4>
          <p>Contract: ${contract.toLocaleString()}</p>
          <p>Total Cost: ${totalCost.toLocaleString()}</p>
          <p>Profit: ${profit.toLocaleString()}</p>
        </div>

        <div className="workspaceCard">
          <h4>Next Up</h4>
          <p>Daily logs, materials, photos, and notes will connect here next.</p>
        </div>
      </div>
    </section>
  );
}

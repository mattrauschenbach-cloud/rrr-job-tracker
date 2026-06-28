export default function JobCard({ job, onOpen }) {
  const totalCost = Number(job.labor || 0) + Number(job.materials || 0);
  const profit = Number(job.price || 0) - totalCost;

  return (
    <button className="jobCard clickableCard" onClick={() => onOpen(job)}>
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
          <strong>${Number(job.price || 0).toLocaleString()}</strong>
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
    </button>
  );
}

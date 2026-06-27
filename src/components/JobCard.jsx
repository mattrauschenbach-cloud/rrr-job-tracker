export default function JobCard({ job }) {
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

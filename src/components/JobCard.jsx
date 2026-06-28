export default function JobCard({ job }) {
  const contract = Number(job.price || 0);
  const labor = Number(job.labor || 0);
  const materials = Number(job.materials || 0);
  const totalCost = labor + materials;
  const profit = contract - totalCost;
  const margin = contract > 0 ? (profit / contract) * 100 : 0;

  return (
    <div className="jobCard premiumJobCard">
      <div className="jobTop">
        <div>
          <span className="eyebrow">Job</span>
          <h4>{job.name || "Unnamed Job"}</h4>
          <p>{job.customer || "No customer added"}</p>
        </div>

        <span className="statusBadge">{job.status || "In Progress"}</span>
      </div>

      <p className="address">{job.address || "No address added"}</p>

      <div className="moneyGrid">
        <div>
          <span>Contract</span>
          <strong>${contract.toLocaleString()}</strong>
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

      <div className="jobFooter">
        <span>Margin: {margin.toFixed(1)}%</span>
        <span>Tap to open soon</span>
      </div>
    </div>
  );
}

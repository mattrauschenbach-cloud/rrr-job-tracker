export default function Payroll({ workers = [], timeEntries = [] }) {
  const payroll = workers.map((worker) => {
    const workerEntries = timeEntries.filter(
      (entry) => entry.workerId === worker.id
    );

    const totalHours = workerEntries.reduce(
      (sum, entry) => sum + Number(entry.hours || 0),
      0
    );

    const rate = Number(worker.rate || 0);
    const owed = totalHours * rate;

    return {
      ...worker,
      totalHours,
      owed,
    };
  });

  const totalPayroll = payroll.reduce((sum, worker) => sum + worker.owed, 0);

  return (
    <section className="panel">
      <h3>Payroll</h3>
      <p>Tracks worker hours and calculates what you owe.</p>

      <div className="statCard" style={{ marginTop: "20px" }}>
        <span>Total Payroll Due</span>
        <strong>${totalPayroll.toLocaleString()}</strong>
      </div>

      <h3 className="sectionTitle">Workers</h3>

      {payroll.length === 0 ? (
        <div className="emptyState">
          <h4>No workers yet</h4>
          <p>Add workers and daily logs first.</p>
        </div>
      ) : (
        <div className="jobGrid">
          {payroll.map((worker) => (
            <div className="jobCard" key={worker.id}>
              <div className="jobTop">
                <div>
                  <h4>{worker.name}</h4>
                  <p>${Number(worker.rate || 0).toFixed(2)} / hr</p>
                </div>

                <span className="statusBadge">{worker.status || "Active"}</span>
              </div>

              <div className="moneyGrid" style={{ marginTop: "18px" }}>
                <div>
                  <span>Hours</span>
                  <strong>{worker.totalHours}</strong>
                </div>

                <div>
                  <span>Rate</span>
                  <strong>${Number(worker.rate || 0).toFixed(2)}</strong>
                </div>

                <div>
                  <span>Owed</span>
                  <strong className="goodMoney">
                    ${worker.owed.toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function Workers({ workers, newWorker, setNewWorker, addWorker }) {
  return (
    <section className="panel">
      <h3>Add Worker</h3>

      <form className="formGrid" onSubmit={addWorker}>
        <input
          placeholder="Worker name"
          value={newWorker.name}
          onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Hourly rate"
          value={newWorker.rate}
          onChange={(e) => setNewWorker({ ...newWorker, rate: e.target.value })}
        />

        <select
          value={newWorker.status}
          onChange={(e) => setNewWorker({ ...newWorker, status: e.target.value })}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button className="primaryBtn">Save Worker</button>
      </form>

      <h3 className="sectionTitle">Workers</h3>

      <div className="jobGrid">
        {workers.map((worker) => (
          <div className="jobCard" key={worker.id}>
            <div className="jobTop">
              <div>
                <h4>{worker.name}</h4>
                <p>${Number(worker.rate).toFixed(2)} / hr</p>
              </div>

              <span className="statusBadge">{worker.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

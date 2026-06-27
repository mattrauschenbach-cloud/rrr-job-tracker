export default function Time({
  jobs,
  workers,
  timeEntry,
  setTimeEntry,
  addTimeEntry
}) {
  return (
    <section className="panel">
      <h3>Daily Log</h3>
      <p>Track who worked, where they worked, hours, lunch, and notes.</p>

      <form className="formGrid" onSubmit={addTimeEntry}>
        <select
          value={timeEntry.workerId}
          onChange={(e) =>
            setTimeEntry({ ...timeEntry, workerId: e.target.value })
          }
        >
          <option value="">Select worker</option>
          {workers.map((worker) => (
            <option key={worker.id} value={worker.id}>
              {worker.name}
            </option>
          ))}
        </select>

        <select
          value={timeEntry.jobId}
          onChange={(e) =>
            setTimeEntry({ ...timeEntry, jobId: e.target.value })
          }
        >
          <option value="">Select job</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={timeEntry.date}
          onChange={(e) =>
            setTimeEntry({ ...timeEntry, date: e.target.value })
          }
        />

        <input
          type="number"
          step="0.25"
          placeholder="Hours worked"
          value={timeEntry.hours}
          onChange={(e) =>
            setTimeEntry({ ...timeEntry, hours: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Lunch minutes"
          value={timeEntry.lunchMinutes}
          onChange={(e) =>
            setTimeEntry({ ...timeEntry, lunchMinutes: e.target.value })
          }
        />

        <input
          placeholder="Work completed / notes"
          value={timeEntry.notes}
          onChange={(e) =>
            setTimeEntry({ ...timeEntry, notes: e.target.value })
          }
        />

        <button className="primaryBtn">Save Daily Log</button>
      </form>
    </section>
  );
}

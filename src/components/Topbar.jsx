export default function Topbar({ page, setPage }) {
  return (
    <header className="topbar">
      <div>
        <h2>{page}</h2>
        <p>RRR OS — jobsite command center.</p>
      </div>

      <button className="primaryBtn desktopOnly" onClick={() => setPage("Jobs")}>
        + Add Job
      </button>

      <button className="fab" onClick={() => setPage("Daily Log")}>
        +
      </button>
    </header>
  );
}

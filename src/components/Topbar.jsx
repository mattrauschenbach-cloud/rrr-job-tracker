export default function Topbar({ page, setPage }) {
  return (
    <header className="topbar">
      <div>
        <h2>{page}</h2>
        <p>Track labor, materials, payroll, and profit.</p>
      </div>

      <button className="primaryBtn" onClick={() => setPage("Jobs")}>
        + Add Job
      </button>
    </header>
  );
}

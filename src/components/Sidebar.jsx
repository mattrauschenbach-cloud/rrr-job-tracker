import { navItems } from "../data";

export default function Sidebar({ page, setPage }) {
  return (
    <>
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">RRR</div>
          <div>
            <h1>OS</h1>
            <p>Remodeling Command Center</p>
          </div>
        </div>

        <nav className="sideNav">
          {navItems.map((item) => (
            <button
              key={item}
              className={page === item ? "navBtn active" : "navBtn"}
              onClick={() => setPage(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <nav className="bottomNav">
        {["Dashboard", "Jobs", "Daily Log", "Materials", "Payroll"].map((item) => (
          <button
            key={item}
            className={page === item ? "bottomBtn bottomActive" : "bottomBtn"}
            onClick={() => setPage(item)}
          >
            <span>{iconFor(item)}</span>
            <small>{shortName(item)}</small>
          </button>
        ))}
      </nav>
    </>
  );
}

function iconFor(item) {
  if (item === "Dashboard") return "🏠";
  if (item === "Jobs") return "📁";
  if (item === "Daily Log") return "⏱";
  if (item === "Materials") return "📦";
  if (item === "Payroll") return "💰";
  return "•";
}

function shortName(item) {
  if (item === "Daily Log") return "Log";
  return item;
}

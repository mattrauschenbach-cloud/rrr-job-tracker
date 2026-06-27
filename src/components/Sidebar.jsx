import { navItems } from "../data";

export default function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">RRR</div>
        <div>
          <h1>Job Tracker</h1>
          <p>Remodeling Command Center</p>
        </div>
      </div>

      <nav>
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
  );
}

import { Link } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        position: "fixed",
      }}
    >
      <h2>Admin Panel</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link style={{ color: "white" }} to="/">
          Dashboard
        </Link>

        <Link style={{ color: "white" }} to="/tasks">
          Tasks
        </Link>

        {role === "admin" && (
          <>
            <Link style={{ color: "white" }} to="/users">
              Users
            </Link>

            <Link style={{ color: "white" }} to="/logs">
              Activity Logs
            </Link>
          </>
        )}

        <Link style={{ color: "white" }} to="/login">
          Login
        </Link>
      </nav>
    </div>
  );
}
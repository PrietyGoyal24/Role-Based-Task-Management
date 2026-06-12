import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: 20 }}>
        <div>Total Users: {data.totalUsers}</div>
        <div>Total Tasks: {data.totalTasks}</div>
        <div>Completed: {data.completedTasks}</div>
        <div>Pending: {data.pendingTasks}</div>
      </div>
    </div>
  );
}
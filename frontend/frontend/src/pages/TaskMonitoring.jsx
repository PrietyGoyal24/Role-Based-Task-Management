import { useEffect, useState } from "react";
import api from "../services/api";

export default function TaskMonitoring() {
  const [tasks, setTasks] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "admin") {
      api.get("/admin/tasks").then((res) => setTasks(res.data));
    } else {
      api.get("/tasks/my").then((res) => setTasks(res.data));
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Monitoring</h2>

      {tasks.map((t) => (
        <div key={t._id}>
          {t.title} - {t.status}
        </div>
      ))}
    </div>
  );
}
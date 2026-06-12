import { useEffect, useState } from "react";
import api from "../services/api";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/admin/logs").then((res) => {
      setLogs(res.data);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Activity Logs</h2>

      {logs.map((l, i) => (
        <div key={i}>
          {l.user} → {l.action}
        </div>
      ))}
    </div>
  );
}
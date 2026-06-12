import { useEffect, useState } from "react";
import api from "../services/api";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const deleteUser = async (id) => {
    await api.delete(`/admin/user/${id}`);
    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>User Management</h2>

      {users.map((u) => (
        <div key={u._id} style={{ marginBottom: 10 }}>
          {u.name} - {u.email} - {u.role}

          <button onClick={() => deleteUser(u._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
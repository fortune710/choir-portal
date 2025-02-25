"use client";
import { useState, useEffect } from "react";
import { assignRole, getUsers } from "@/app/api/services/adminService";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);  // ✅ Specify that users is an array of User
  const [selectedRole, setSelectedRole] = useState<string>("");

  useEffect(() => {
    async function fetchUsers() {
      const data: User[] = await getUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const handleAssignRole = async (userId: string) => {
    await assignRole(userId, selectedRole);
    alert("Role assigned successfully!");
  };

  return (
    <div>
      <h1>Manage Users & Assign Roles</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <select onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
            <button onClick={() => handleAssignRole(user.id)}>Assign Role</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

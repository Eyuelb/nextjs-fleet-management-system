import React from "react";
import { user } from "db/schema";

type User = typeof user.$inferSelect 


interface UserTableProps {
  users: User[];
  onUpdateUser: (id: string, updatedUser: typeof user.$inferSelect) => void;
  onDeleteUser: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onUpdateUser, onDeleteUser }) => {
  const handleUpdate = (id: string, updatedFields: typeof user.$inferSelect) => {
    onUpdateUser(id, updatedFields);
  };

  const handleDelete = (id: string) => {
    onDeleteUser(id);
  };
  return (
    <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleUpdate(user.id,user)}>
                  Update
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

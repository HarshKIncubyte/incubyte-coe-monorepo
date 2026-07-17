import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "../graphql/queries/users";
import type { GetUsersData } from "../types/user";
import CreateUser from "../components/CreateUser";
import "./UsersPage.css";

function UsersPage() {
  const { data, loading, error } = useQuery<GetUsersData>(GET_USERS);

  if (loading) return <p className="status-message">Loading users...</p>;
  if (error) return <p className="status-message">Error: {error.message}</p>;
  if (!data) return <p className="status-message">No data found.</p>;

  return (
    <div className="users-page">
      <h1>User Management</h1>

      <div className="dashboard">
        <div className="left-panel">
          <CreateUser />
        </div>

        <div className="right-panel">
          <h2>Users</h2>

          {data.users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            data.users.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;

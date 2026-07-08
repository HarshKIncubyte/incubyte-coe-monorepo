import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "../graphql/queries/users";
import type { GetUsersData } from "../types/user";

function UsersPage() {
  const { data, loading, error } = useQuery<GetUsersData>(GET_USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  return (
    <div>
      <h1>Users</h1>

      {data.users.map((user) => (
        <p key={user.id}>
          {user.name} - {user.email}
        </p>
      ))}
    </div>
  );
}

export default UsersPage;

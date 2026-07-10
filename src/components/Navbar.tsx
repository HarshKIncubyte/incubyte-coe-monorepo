import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
      <span>Welcome, <strong>{user.name}</strong></span>
    </nav>
  );
}

import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function UserProfile() {
  const { user, updateName, updateEmail } = useUser();

  // Local state — only this component needs these, no other component cares
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{user.name}</h2>
      <p>{user.email}</p>

      {/* Update Name */}
      <div>
        <input
          type="text"
          value={inputName}
          placeholder="Enter new name"
          onChange={(e) => setInputName(e.target.value)}
        />
        <button
          onClick={() => {
            if (inputName.trim()) {
              updateName(inputName);
              setInputName(""); // clear after update
            }
          }}
        >
          Update Name
        </button>
      </div>

      {/* Update Email */}
      <div>
        <input
          type="email"
          value={inputEmail}
          placeholder="Enter new email"
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <button
          onClick={() => {
            if (inputEmail.trim()) {
              updateEmail(inputEmail);
              setInputEmail(""); // clear after update
            }
          }}
        >
          Update Email
        </button>
      </div>
    </div>
  );
}

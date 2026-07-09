import { useState } from "react";
import { useMutation } from "@apollo/client/react";

import { CREATE_USER } from "../graphql/mutations/users";
import { GET_USERS } from "../graphql/queries/users";

import type {
  CreateUserData,
  CreateUserVariables,
} from "../types/user";

import "./CreateUser.css";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [createUser, { loading }] = useMutation<
    CreateUserData,
    CreateUserVariables
  >(CREATE_USER);

  const handleCreateUser = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!name.trim() || !email.trim()) {
      setErrorMessage("Name and Email are required.");
      return;
    }

    try {
      const { data } = await createUser({
        variables: {
          name,
          email,
        },
        refetchQueries: [{ query: GET_USERS }],
      });

      if (data?.createUser.errors.length === 0) {
        setName("");
        setEmail("");
        setSuccessMessage("User created successfully!");
      } else {
        setErrorMessage(data?.createUser.errors.join(", ") ?? "");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="create-user">
      <h2>Create User</h2>

      {successMessage && (
        <p className="success">{successMessage}</p>
      )}

      {errorMessage && (
        <p className="error">{errorMessage}</p>
      )}

      <label>Name</label>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label>Email</label>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <button onClick={handleCreateUser} disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
    </div>
  );
}

export default CreateUser;

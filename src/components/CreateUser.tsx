import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  Alert,
  Box,
  Button,
  Field,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { CREATE_USER } from "../graphql/mutations/users";
import { GET_USERS } from "../graphql/queries/users";
import type {
  CreateUserData,
  CreateUserVariables,
  GetUsersData,
} from "../types/user";

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

        optimisticResponse: {
          createUser: {
            __typename: "CreateUserPayload",
            user: {
              __typename: "User",
              id: `temp-${Date.now()}`,
              name,
              email,
            },
            errors: [],
          },
        },

        update(cache, { data }) {
          const existingData = cache.readQuery<GetUsersData>({
            query: GET_USERS,
          });

          const newUser = data?.createUser.user;

          if (!existingData || !newUser) return;

          // Remove any optimistic version of this user
          const users = existingData.users.filter(
            (user) => !(user.email === newUser.email && user.id.startsWith("temp-"))
          );

          cache.writeQuery<GetUsersData>({
            query: GET_USERS,
            data: {
              users: [...users, newUser],
            },
          });
        },
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
    <Box className="rounded-lg shadow-md" bg="white" p={6}>
      <Heading size="md" mb={4}>
        Create User
      </Heading>

      {successMessage && (
        <Alert.Root status="success" mb={4}>
          <Alert.Indicator />
          <Alert.Title>{successMessage}</Alert.Title>
        </Alert.Root>
      )}

      {errorMessage && (
        <Alert.Root status="error" mb={4}>
          <Alert.Indicator />
          <Alert.Title>{errorMessage}</Alert.Title>
        </Alert.Root>
      )}

      <Stack gap={4}>
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field.Root>

        <Button
          colorPalette="blue"
          onClick={handleCreateUser}
          loading={loading}
        >
          {loading ? "Creating..." : "Create User"}
        </Button>
      </Stack>
    </Box>
  );
}

export default CreateUser;

import { useState } from "react";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useUser } from "../context/UserContext";

export default function UserProfile() {
  const { user, updateName, updateEmail } = useUser();

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  return (
    <Box className="rounded-lg shadow-md" bg={{ base: "white", _dark: "gray.800" }} p={6} mb={6}>
      <Heading size="md" mb={1}>
        {user.name}
      </Heading>
      <Text color="gray.500" mb={4}>
        {user.email}
      </Text>

      <Stack gap={4}>
        <Field.Root>
          <Field.Label>Update Name</Field.Label>
          <Stack direction="row" gap={2}>
            <Input
              value={inputName}
              placeholder="Enter new name"
              onChange={(e) => setInputName(e.target.value)}
            />
            <Button
              colorPalette="blue"
              onClick={() => {
                if (inputName.trim()) {
                  updateName(inputName);
                  setInputName("");
                }
              }}
            >
              Update
            </Button>
          </Stack>
        </Field.Root>

        <Field.Root>
          <Field.Label>Update Email</Field.Label>
          <Stack direction="row" gap={2}>
            <Input
              type="email"
              value={inputEmail}
              placeholder="Enter new email"
              onChange={(e) => setInputEmail(e.target.value)}
            />
            <Button
              colorPalette="blue"
              onClick={() => {
                if (inputEmail.trim()) {
                  updateEmail(inputEmail);
                  setInputEmail("");
                }
              }}
            >
              Update
            </Button>
          </Stack>
        </Field.Root>
      </Stack>
    </Box>
  );
}

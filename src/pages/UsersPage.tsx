import { useQuery } from "@apollo/client/react";
import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { GET_USERS } from "../graphql/queries/users";
import type { GetUsersData } from "../types/user";
import CreateUser from "../components/CreateUser";

function UsersPage() {
  const { data, loading, error } = useQuery<GetUsersData>(GET_USERS);

  if (loading) return <Text p={6}>Loading users...</Text>;
  if (error) return <Text p={6} color="red.500">Error: {error.message}</Text>;
  if (!data) return <Text p={6}>No data found.</Text>;

  return (
    <Box className="max-w-6xl mx-auto" p={6}>
      <Heading size="lg" mb={6}>
        User Management
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
        <Box>
          <CreateUser />
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Users
          </Heading>

          {data.users.length === 0 ? (
            <Text>No users found.</Text>
          ) : (
            <VStack gap={3} align="stretch">
              {data.users.map((user) => (
                <Box
                  key={user.id}
                  className="rounded-lg shadow-sm"
                  bg="white"
                  p={4}
                >
                  <Text fontWeight="bold">{user.name}</Text>
                  <Text color="gray.500" fontSize="sm">
                    {user.email}
                  </Text>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default UsersPage;

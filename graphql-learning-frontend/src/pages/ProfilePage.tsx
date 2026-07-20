import { Box } from "@chakra-ui/react";
import UserProfile from "../components/UserProfile";

function ProfilePage() {
  return (
    <Box className="max-w-6xl mx-auto" p={6}>
      <UserProfile />
    </Box>
  );
}

export default ProfilePage;

import { Box, Flex, Heading, IconButton } from "@chakra-ui/react"
import { useColorMode } from "./ui/color-mode"
import { useUser } from "../context/UserContext"

export default function Navbar() {
  const { user } = useUser()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box bg={colorMode === "light" ? "gray.100" : "gray.800"} px={6} py={4}>
      <Flex justify="space-between" align="center">
        <Heading size="md" className="text-blue-600">
          GraphQL App
        </Heading>
        <Flex align="center" gap={4}>
          <span className="text-sm font-medium">
            Welcome, <strong>{user.name}</strong>
          </span>
          <IconButton
            aria-label="Toggle color mode"
            onClick={toggleColorMode}
            size="sm"
            variant="outline"
          >
            {colorMode === "dark" ? "☀️" : "🌙"}
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  )
}

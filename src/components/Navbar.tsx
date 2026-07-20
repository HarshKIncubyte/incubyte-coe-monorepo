import { Box, Flex, Heading, IconButton } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { useColorMode } from "./ui/color-mode"
import { useUser } from "../context/UserContext"

const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  fontWeight: isActive ? 700 : 500,
  textDecoration: isActive ? "underline" : "none",
})

export default function Navbar() {
  const { user } = useUser()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box bg={colorMode === "light" ? "gray.100" : "gray.800"} px={6} py={4}>
      <Flex justify="space-between" align="center">
        <Heading size="md" color="brand.500">
          GraphQL App
        </Heading>
        <Flex align="center" gap={6}>
          <Flex align="center" gap={4} className="text-sm">
            <NavLink to="/profile" style={navLinkStyle}>
              Profile
            </NavLink>
            <NavLink to="/users" style={navLinkStyle}>
              Users
            </NavLink>
          </Flex>
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

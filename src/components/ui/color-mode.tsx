import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react"
import { ThemeProvider, useTheme } from "next-themes"
import type { IconButtonProps } from "@chakra-ui/react"

export interface ColorModeProviderProps {
  children: React.ReactNode
}

export function ColorModeProvider({ children }: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleColorMode = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")
  return { colorMode: resolvedTheme, toggleColorMode }
}

export function ColorModeButton(props: Omit<IconButtonProps, "aria-label">) {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        {...props}
      >
        {colorMode === "dark" ? "☀️" : "🌙"}
      </IconButton>
    </ClientOnly>
  )
}

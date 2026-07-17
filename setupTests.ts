import "@testing-library/jest-dom";
import { deserialize, serialize } from "node:v8";

// jest-environment-jsdom's global doesn't include structuredClone; Apollo's MockedProvider needs it.
if (typeof global.structuredClone !== "function") {
  global.structuredClone = (value: unknown) => deserialize(serialize(value));
}

// jsdom doesn't implement matchMedia; next-themes (used by ColorModeProvider) needs it.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
        setupFiles: ["./test-setup.ts", './src/tests/setup.ts', 'vitest-localstorage-mock'],   // setUp Files is used for '@testing-library/jest-dom'
        globals: true
    },
});
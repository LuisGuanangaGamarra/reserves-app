import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    roots: ["<rootDir>/tests"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    setupFilesAfterEnv: ["<rootDir>/tests/setup-tests.ts"],
    moduleNameMapper: {
        "\\.(css|scss|sass)$": "<rootDir>/tests/style-mock.ts",
    },
    transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.jest.json" }],
    },
    testMatch: ["**/?(*.)+(spec|test).(ts|tsx)"],
    resetMocks: true,
    clearMocks: true,
    testPathIgnorePatterns: ["/node_modules/", "/tests/e2e/"],
};

export default config;
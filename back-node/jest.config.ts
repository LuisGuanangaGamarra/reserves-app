import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    rootDir: "./",
    moduleFileExtensions: ["ts", "js", "json"],
    testMatch: ["<rootDir>/tests/**/*.(spec|test).ts"],
    setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],

    verbose: true,
    clearMocks: true,

    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/main.ts",
        "!src/**/migrations/**",
        "!src/**/entities/**.orm-entity.ts",
        "!src/**/dto/**",
        "!src/**/mapper/**/helper.ts"
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],
    modulePaths: ["<rootDir>/src"],
    moduleDirectories: ["node_modules", "src"],
};

export default config;

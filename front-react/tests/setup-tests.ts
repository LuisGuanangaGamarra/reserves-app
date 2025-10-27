import "@testing-library/jest-dom";
import "cross-fetch/polyfill";

const originalError = console.error;
beforeAll(() => {
    console.error = (...args: any[]) => {
        const msg = String(args[0] ?? "");
        if (
            msg.includes("Warning: An update to") &&
            msg.includes("not wrapped in act")
        ) {
            return;
        }
        originalError(...args);
    };
});

afterAll(() => {
    console.error = originalError;
});

import { formatToLocalTime } from "../../../src/utils/date-format.util";

describe("formatToLocalTime", () => {
    it("formatea la fecha por defecto con zona local", () => {
        const iso = "2024-01-01T12:34:56.000Z";
        const out = formatToLocalTime(iso);
        expect(typeof out).toBe("string");
        expect(out.length).toBeGreaterThan(10);
    });

    it("permite patrón y tz custom", () => {
        const iso = "2024-01-01T12:34:56.000Z";
        const out = formatToLocalTime(iso, "yyyy-MM-dd HH:mm", "UTC");
        expect(out).toBe("2024-01-01 12:34");
    });
});
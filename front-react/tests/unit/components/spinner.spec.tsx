import { render, screen } from "@testing-library/react";
import { Spinner } from "../../../src/components/spinner/spinner";

describe("Spinner", () => {
    it("renderiza con rol status y aria-busy", () => {
        render(<Spinner />);
        const status = screen.getByRole("status");
        expect(status).toBeInTheDocument();
        expect(status).toHaveAttribute("aria-busy", "true");
    });

    it("permite tamaños sm, md, lg y mezcla className", () => {
        const { rerender } = render(<Spinner size="sm" className="extra" />);
        let status = screen.getByRole("status");
        expect(status.className).toMatch(/extra/);
        expect(status.className).toMatch(/spinner/); // clase base mapeada por CSS modules
        expect(status.className).toMatch(/sm|md|lg/);

        rerender(<Spinner size="lg" />);
        status = screen.getByRole("status");
        expect(status.className).toMatch(/lg/);
    });

    it("aplica style inline", () => {
        render(<Spinner style={{ width: 10, height: 10 }} />);
        const status = screen.getByRole("status");
        expect(status).toHaveStyle({ width: "10px", height: "10px" });
    });
});
import { Router } from "express";
import { generateCsrfToken } from "../middlewares/csrf.middleware";

const router = Router();

router.get("/csrf-token", (req, res) => {
    const token = generateCsrfToken(req, res);

    res.status(200).json({
        message: "CSRF token generado correctamente",
        token,
    });
});

export default router;
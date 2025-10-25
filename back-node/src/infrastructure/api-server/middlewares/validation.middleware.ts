import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { DomainException } from "../../../domain/exceptions/domain.exception";

export function validateSchema(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const exception = new DomainException('ERROR_VALIDATION', 'Errores de validación', {
            errors: errors.array(),
        })
        return res.status(400).json(exception)
    }

    next();
}

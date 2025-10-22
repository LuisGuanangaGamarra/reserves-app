import { Router } from "express";

import { reserveById } from "../feature/reserve-by-id";
import { reserveSave } from "../feature/reserve-save";

const router = Router();

router.post("/", function (req, res, next) {
    reserveSave(req.body)
        .then((response) => {
            res.json(response);
        })
        .catch(next);
});

router.get("/:id", function (req, res, next) {
    reserveById(req.params.id)
        .then((response) => {
            if (response == null) {
                res.status(404).send("Reserve not found");
            } else {
                res.send(response);
            }
        })
        .catch(next);
});

export default router;
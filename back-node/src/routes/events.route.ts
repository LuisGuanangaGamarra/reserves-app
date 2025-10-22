import { Router } from "express";

import { eventById } from "../feature/event-by-id";
import { eventList } from "../feature/event-list";

const router = Router();

router.get("/", function (req, res, next) {
    eventList()
        .then((events) => res.send(events))
        .catch(next);
});

router.get("/:id", function (req, res, next) {
    eventById(req.params.id)
        .then((response) => {
            if (response == null) {
                res.status(404).send("Event not found");
            } else {
                res.send(response);
            }
        })
        .catch(next);
});

export default router;
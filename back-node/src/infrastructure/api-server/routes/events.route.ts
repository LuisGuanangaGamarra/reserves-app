import { NextFunction, Request, Response, Router } from "express";
import { Container } from 'inversify';
import { Mapper } from "@automapper/core";
import { checkSchema } from 'express-validator';

import { GetAllEventsUseCase } from '../../../application/use-cases/get-all-events.use-case';
import { TokenMapper } from "../../mapper/core/automapper.config";
import { EventResponseDto } from "../../../presentation/dto/event-response.dto";
import { EventAggregate } from "../../../domain/aggregates/event.aggregate";
import { GetEventByIdUseCase } from "../../../application/use-cases/get-event-by-id.use-case";
import { EventDetailResponseDto } from "../../../presentation/dto/event-detail-response.dto";
import { validateSchema } from '../middlewares/validation.middleware';
import { IdSchema } from '../validators/id.schema';

export default function createEventRoute(container: Container): Router {
    const router = Router();
    const mapper:Mapper = container.get<Mapper>(TokenMapper);

    router.get("/", async (req, res, next) => {
        const getAllEvents = container.get<GetAllEventsUseCase>(GetAllEventsUseCase);
        const events = await getAllEvents.execute();
        const response = mapper.mapArray(events, EventAggregate, EventResponseDto);
        res.status(200).json(response);
    });

    router.get("/:id",
        checkSchema(IdSchema),
        validateSchema,
        async (req: Request, res: Response, next: NextFunction) => {
            const getEventByIdUC = container.get<GetEventByIdUseCase>(GetEventByIdUseCase);
            try {
                const event = await getEventByIdUC.execute(Number(req.params.id));
                const response = mapper.map(event, EventAggregate, EventDetailResponseDto);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        }
    )

    return router;

}
import { Container } from "inversify/lib/esm";
import { NextFunction, Request, Response, Router } from "express";
import { Mapper } from "@automapper/core";

import { TokenMapper } from "../../mapper/core/automapper.config";
import { checkSchema } from "express-validator";
import { IdSchema } from "../validators/id.schema";
import { validateSchema } from "../middlewares/validation.middleware";
import {GetReserveByIdUseCase} from "../../../application/use-cases/get-reserve-by-id.use-case";

import {ReserveAggregate} from "../../../domain/aggregates/reserve.aggregate";
import {ReserveResponseDto} from "../../../presentation/dto/reserve-response.dto";
import {GetEventByIdUseCase} from "../../../application/use-cases/get-event-by-id.use-case";
import {CreateReserveSchema} from "../validators/reserve.schema";
import {ReserveRequestDto} from "../../../presentation/dto/reserve-request.dto";
import {SaveReserveUseCase} from "../../../application/use-cases/save-reserve.use-case";

export default function createReserveRoute(container: Container): Router {
    const router = Router();
    const mapper:Mapper = container.get<Mapper>(TokenMapper);

    router.get('/:id',
        checkSchema(IdSchema),
        validateSchema,
        async (req: Request, res: Response, next: NextFunction) => {
            const { id } = req.params;
            const getReserveByIdUC = container.get<GetReserveByIdUseCase>(GetReserveByIdUseCase);
            const getEventByIdUC = container.get<GetEventByIdUseCase>(GetEventByIdUseCase);
            try {
                const reserve = await getReserveByIdUC.execute(Number(id));
                const event = await  getEventByIdUC.execute(reserve.eventId);
                const response = mapper.map(reserve, ReserveAggregate, ReserveResponseDto, {
                    extraArgs: () => ({ event })
                });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        }
    )

    router.post('/',
        checkSchema(CreateReserveSchema),
        validateSchema,
        async (req: Request, res: Response, next: NextFunction) => {
            const { eventId, seatNumbers } = req.body;

            const getEventByIdUC = container.get<GetEventByIdUseCase>(GetEventByIdUseCase);
            const getSaveReserveUseCase = container.get<SaveReserveUseCase>(SaveReserveUseCase);
            try {

                const request = {
                    eventId: Number(eventId),
                    seatNumbers: seatNumbers as number[]
                } as ReserveRequestDto

                let reserveAgregate = mapper.map(request, ReserveRequestDto, ReserveAggregate);
                reserveAgregate = await getSaveReserveUseCase.execute(reserveAgregate)
                const event = await  getEventByIdUC.execute(reserveAgregate.eventId);
                const response = mapper.map(reserveAgregate, ReserveAggregate, ReserveResponseDto, {
                    extraArgs: () => ({ event })
                });
                res.status(201).json(response);
            } catch (error) {
                next(error);
            }
        },
    )

    return router;
}
import {
    Mapper,
    MappingProfile,
    createMap,
    forMember,
    mapFrom,
    mapWithArguments,
} from '@automapper/core';
import mapProps from "../helper";

import { ReserveAggregate } from "../../../domain/aggregates/reserve.aggregate";
import { ReserveOrmEntity } from "../../persistence/typeorm/entities/reserve.orm-entity";
import { ReserveRequestDto } from "../../../presentation/dto/reserve-request.dto";
import {ReserveResponseDto, SeatReserveView} from "../../../presentation/dto/reserve-response.dto";
import { EventAggregate } from "../../../domain/aggregates/event.aggregate";


export const ReserveProfile: MappingProfile = (mapper: Mapper) => {
    createMap(
        mapper,
        ReserveOrmEntity,
        ReserveAggregate,
        ...mapProps(['eventId', 'createdAt']),
        forMember(
            (destination: ReserveAggregate) => destination.id,
            mapFrom((source: ReserveOrmEntity) => source.id)
        ),
        forMember(
            (destination: ReserveAggregate) => destination.seatNumbers,
            mapFrom((source: ReserveOrmEntity) =>
                Array.isArray(source.seatNumbers)
                    ? source.seatNumbers.map((n: any) => Number(n))
                    : []
            )
        ),
    )

    createMap(
        mapper,
        ReserveAggregate,
        ReserveOrmEntity,
        ...mapProps(['eventId', 'seatNumbers', 'createdAt']),
        forMember(
            (destination: ReserveAggregate) => destination.id,
            mapFrom((source: ReserveOrmEntity) => source.id)
        ),
    )

    createMap(
        mapper,
        ReserveAggregate,
        ReserveResponseDto,
        forMember(
            (destination: ReserveResponseDto) => destination.seats,
            mapFrom((source: ReserveAggregate) => source.seatNumbers)
        ),
        forMember(
            (destination: ReserveResponseDto) => destination.id,
            mapFrom((source: ReserveAggregate) => source.id)
        ),
        forMember(
            (destination: ReserveResponseDto) => destination.event,
            mapWithArguments((_, { event }) => {
                const eventEntity = event as EventAggregate;
                return {
                    id: Number(eventEntity.id!),
                    name: eventEntity.name,
                    date: eventEntity.date.toISOString(),
                    price: eventEntity.price,
                    location: eventEntity.location?.address ?? '',
                } as SeatReserveView
            }),
        ),
        forMember(
            (destination: ReserveResponseDto) => destination.totalPrice,
            mapWithArguments((reserve, { event }) => {
                const eventEntity = event as EventAggregate;
                const reserveEntity = reserve as ReserveAggregate;
                return eventEntity.price * reserveEntity.seatNumbers.length;
            }),
        ),
    )

    createMap(
        mapper,
        ReserveRequestDto,
        ReserveAggregate,
        ...mapProps(['eventId', 'seatNumbers']),
        forMember(
            (destination: ReserveAggregate) => destination.id,
            mapFrom(() => null)
        ),
        forMember(
            (destination: ReserveAggregate) => destination.createdAt,
            mapFrom(() => null)
        ),
    )
};
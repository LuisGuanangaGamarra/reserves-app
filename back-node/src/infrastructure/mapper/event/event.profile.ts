import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import mapProps from "../helper";

import { EventOrmEntity } from '../../persistence/typeorm/entities/event.orm-entity';
import { EventAggregate } from '../../../domain/aggregates/event.aggregate';
import { LocationEntity } from '../../../domain/entities/location.entity';
import { ReserveAggregate } from '../../../domain/aggregates/reserve.aggregate';
import { SeatEntity } from '../../../domain/entities/seat.entity';
import { EventResponseDto } from "../../../presentation/dto/event-response.dto";
import { EventSeatDomainService } from "../../../domain/services/event-seat.service";
import { EventDetailResponseDto, SeatView } from "../../../presentation/dto/event-detail-response.dto";

export const EventProfile: MappingProfile = (mapper: Mapper) => {
    createMap(
        mapper,
        EventOrmEntity,
        EventAggregate,
        ...mapProps(['name', 'price', 'date']),
        forMember(
            (destination: EventAggregate) => destination.id,
            mapFrom((source: EventOrmEntity) => source.id)
        ),
        forMember(
            (destination: EventAggregate) => destination.location,
            mapFrom((source:EventOrmEntity) => {
                const loc = source.location;
                if (!loc) return null;

                return new LocationEntity(
                    loc.id,
                    loc.name,
                    loc.address,
                    (loc.seats ?? []).map(
                        (seat) => new SeatEntity(seat.id, seat.seatNumber)
                    )
                );
            })
        ),
        forMember(
            (destination: EventAggregate) => destination.reserves,
            mapFrom((source: EventOrmEntity) =>
                (source.reserves ?? []).map(
                    (r) => new ReserveAggregate(r.id,r.eventId, r.seatNumbers, r.createdAt )
                )
            )
        )
    );


    createMap(
        mapper,
        EventAggregate,
        EventResponseDto,
        ...mapProps(['name', 'price']),
        forMember(
            (d) => d.id,
            mapFrom((s) => Number(s.id))
        ),
        forMember(
            (d) => d.date,
            mapFrom((s) => s.date.toISOString())
        ),
        forMember(
            (d: EventResponseDto) => d.location,
            mapFrom((s: EventAggregate) => {
                return s?.location?.address ?? ''
            })
        ),
        forMember(
            (d: EventResponseDto) => d.hasAvailableSeats,
            mapFrom((s: EventAggregate) => {
               const seats = EventSeatDomainService.getAllSeatsWithStatus(s)
                if(seats.length <= 0) return false;

                return seats.some((seat) => seat.status === 'available')
            })
        ),
    );

    createMap(
        mapper,
        EventAggregate,
        EventDetailResponseDto,
        ...mapProps(['name', 'price']),
        forMember(
            (d) => d.id,
            mapFrom((s) => Number(s.id))
        ),
        forMember(
            (d) => d.date,
            mapFrom((s) => s.date.toISOString())
        ),
        forMember(
            (d: EventDetailResponseDto) => d.location,
            mapFrom((s: EventAggregate) => {
                return s?.location?.address ?? ''
            })
        ),
        forMember(
            (d: EventDetailResponseDto) => d.seats,
            mapFrom((s: EventAggregate) => {
                const seats = EventSeatDomainService.getAllSeatsWithStatus(s)
                return seats as SeatView[]
            })
        ),
    );
};

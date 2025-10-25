import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { LocationOrmEntity } from "./location.orm-entity";

@Entity('seats')
export class SeatOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'int',
        nullable: false,
        name: 'seat_number',
    })
    seatNumber!: number;

    @ManyToOne(
        () => LocationOrmEntity,
        (location) => location.seats,
        {
            onDelete: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'location_id' })
    location!: LocationOrmEntity;
}
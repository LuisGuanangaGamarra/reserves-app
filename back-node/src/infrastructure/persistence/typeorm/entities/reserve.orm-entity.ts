import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    DeleteDateColumn,
} from 'typeorm';

import { EventOrmEntity } from './event.orm-entity';

import {
    getDateColumnType,
    getDateDefault,
    getDateOnUpdate,
} from '../utils/date-column.helper';

@Entity('reserves')
export class ReserveOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'event_id', type: 'int', nullable: false })
    eventId!: number;

    @Column({ name: 'seat_numbers', type: 'simple-array', nullable: false })
    seatNumbers!: number[];

    @ManyToOne(() => EventOrmEntity, (event) => event.reserves, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'event_id' })
    event!: EventOrmEntity;

    @Column({
        name: 'created_at',
        type: getDateColumnType(),
        default: () => getDateDefault(),
        nullable: true,
    })
    createdAt!: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: getDateColumnType(),
        nullable: true,
    })
    deletedAt?: Date;
}

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn, DeleteDateColumn,
} from 'typeorm';

import { EventOrmEntity } from './event.orm-entity';

@Entity('reserves')
export class ReserveOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'event_id', type: 'int', nullable: false })
    eventId!: number;

    @Column({
        name: 'seat_numbers',
        type: 'simple-array',
        nullable: false,
    })
    seatNumbers!: number[];

    @ManyToOne(() => EventOrmEntity, (event) => event.reserves, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'event_id' })
    event!: EventOrmEntity;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    createdAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;
}
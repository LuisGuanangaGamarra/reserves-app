import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    DeleteDateColumn,
} from 'typeorm';

import { LocationOrmEntity } from './location.orm-entity';
import { ReserveOrmEntity } from './reserve.orm-entity';

@Entity('events')
export class EventOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    name!: string;

    @Column({ type: 'timestamp', nullable: false })
    date!: Date;

    @Column({ type: 'float', nullable: false })
    price!: number;

    @ManyToOne(() => LocationOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'location_id' })
    location!: LocationOrmEntity;

    @OneToMany(() => ReserveOrmEntity, (reserve) => reserve.event, {
        cascade: true,
    })
    reserves!: ReserveOrmEntity[];

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    createdAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;
}
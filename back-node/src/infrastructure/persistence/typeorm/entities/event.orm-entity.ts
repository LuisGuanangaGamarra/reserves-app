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

import {
    getDateColumnType,
    getDateDefault,
} from '../utils/date-column.helper';

@Entity('events')
export class EventOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    name!: string;

    @Column({ type: getDateColumnType(), nullable: false })
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

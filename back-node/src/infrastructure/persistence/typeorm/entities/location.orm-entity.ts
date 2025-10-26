import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SeatOrmEntity } from './seat.orm-entity';

@Entity('locations')
export class LocationOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false, length: 200 })
    name!: string;

    @Column({ type: 'text', nullable: false })
    address!: string;

    @OneToMany(() => SeatOrmEntity, (seat) => seat.location, {
        cascade: true,
    })
    seats!: SeatOrmEntity[];
}
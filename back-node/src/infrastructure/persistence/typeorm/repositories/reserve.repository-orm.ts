import { injectable, inject } from "inversify";

import { DataSource, Repository } from "typeorm";
import { Mapper } from "@automapper/core";

import { TokenDataSource } from "../data-source";
import { ReserveOrmEntity } from "../entities/reserve.orm-entity";
import { IReserveRepository } from "../../../../domain/repositories/reserve.repository";
import { ReserveAggregate } from "../../../../domain/aggregates/reserve.aggregate";
import { TokenMapper } from "../../../mapper/core/automapper.config";

@injectable()
export class ReserveRepositoryOrm implements IReserveRepository {
    private readonly repo: Repository<ReserveOrmEntity>;
    constructor(
        @inject(TokenMapper) private readonly mapper: Mapper,
        @inject(TokenDataSource) private readonly dataSource: DataSource
    ) {
        this.repo = this.dataSource.getRepository(ReserveOrmEntity);
    }

    async findById(id: number): Promise<ReserveAggregate | null> {
        const reserve = await this.repo.findOne({
            where: { id },
            relations: ["event", "event.location"],
        });

        if (!reserve) return null;

        return this.mapper.map(reserve, ReserveOrmEntity, ReserveAggregate);
    }

    async findByEventId(eventId: number): Promise<ReserveAggregate[]> {
        const reserves = await this.repo.find({
            where: { eventId },
            relations: ["event", "event.location"],
            order: {
                createdAt: "ASC",
            },
        });

        return this.mapper.mapArray(reserves, ReserveOrmEntity, ReserveAggregate);
    }

    async save(reserve: ReserveAggregate): Promise<ReserveAggregate> {
        const entity = this.mapper.map(reserve, ReserveAggregate, ReserveOrmEntity);
        const { createdAt, deletedAt, ...orm } = this.repo.create(entity);
        const ormEntity = await this.repo.save(orm);
        return this.mapper.map(ormEntity, ReserveOrmEntity, ReserveAggregate)
    }
}
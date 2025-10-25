import { injectable, inject } from "inversify";
import { DataSource, Repository } from "typeorm";
import { Mapper } from "@automapper/core";

import { TokenDataSource } from "../data-source";
import { EventOrmEntity } from "../entities/event.orm-entity";
import { IEventRepository } from "../../../../domain/repositories/event.repository";
import { EventAggregate } from "../../../../domain/aggregates/event.aggregate";
import { mapper, TokenMapper } from "../../../mapper/core/automapper.config";

@injectable()
export class EventRepositoryOrm implements IEventRepository {
    private readonly repo: Repository<EventOrmEntity>;

    constructor(
        @inject(TokenMapper) private readonly mapper: Mapper,
        @inject(TokenDataSource) private readonly dataSource: DataSource
    ) {
        this.repo = this.dataSource.getRepository(EventOrmEntity);
    }

    async findAll(): Promise<EventAggregate[]> {
        const events = await this.repo.find({
            relations: ["location", "location.seats", "reserves"],
        });

        return mapper.mapArray(events, EventOrmEntity, EventAggregate);
    }

    async findById(id: number): Promise<EventAggregate | null> {
        const event = await this.repo.findOne({
            where: { id },
            relations: ["location", "location.seats", "reserves"],
        });

        if (!event) return null;

        return this.mapper.map(event, EventOrmEntity, EventAggregate);
    }
}
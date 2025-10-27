import "reflect-metadata";
import { Container } from "inversify";
import { DataSource } from "typeorm";
import { TokenDataSource } from "../../src/infrastructure/persistence/typeorm/data-source";
import { bootstrapContainer } from "../../src/infrastructure/di/container";
import { IReserveRepository, TokenReserveRepository } from "../../src/domain/repositories/reserve.repository";

describe("ReserveRepositoryOrm", () => {
    let container: Container;
    let ds: DataSource;
    let repo: IReserveRepository;

    beforeAll(async () => {
        container = await bootstrapContainer();
        ds = container.get<DataSource>(TokenDataSource);
        repo = container.get<IReserveRepository>(TokenReserveRepository);
    });

    afterAll(async () => {
        if (ds?.isInitialized) await ds.destroy();
    });

    it("save/findById/findByEventId debería persistir y recuperar", async () => {
        const created = await repo.save({ id: null, eventId: 1, seatNumbers: [1, 2], createdAt: new Date() } as any);
        expect(created.id).toBeTruthy();

        const fetched = await repo.findById(created.id!);
        expect(fetched?.seatNumbers).toEqual([1, 2]);

        const list = await repo.findByEventId(1);
        expect(list.some(r => r.id === created.id)).toBe(true);
    });
});
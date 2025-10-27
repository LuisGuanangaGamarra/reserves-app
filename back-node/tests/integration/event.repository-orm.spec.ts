import "reflect-metadata";
import { Container } from "inversify";
import { DataSource } from "typeorm";
import { TokenDataSource } from "../../src/infrastructure/persistence/typeorm/data-source";
import { bootstrapContainer } from "../../src/infrastructure/di/container";
import { IEventRepository, TokenEventRepository } from "../../src/domain/repositories/event.repository";

describe("EventRepositoryOrm", () => {
    let container: Container;
    let ds: DataSource;
    let repo: IEventRepository;

    beforeAll(async () => {
        container = await bootstrapContainer();
        ds = container.get<DataSource>(TokenDataSource);
        repo = container.get<IEventRepository>(TokenEventRepository);
    });

    afterAll(async () => {
        if (ds?.isInitialized) await ds.destroy();
    });

    it("findAll debería retornar eventos sembrados", async () => {
        const items = await repo.findAll();
        expect(items.length).toBeGreaterThan(0);
        expect(items[0]).toHaveProperty("location");
    });

    it("findById debería retornar un evento por id existente y null si no existe", async () => {
        const first = await repo.findById(1);
        expect(first).not.toBeNull();

        const none = await repo.findById(999999);
        expect(none).toBeNull();
    });
});
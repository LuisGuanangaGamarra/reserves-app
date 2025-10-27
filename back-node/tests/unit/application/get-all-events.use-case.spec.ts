import { GetAllEventsUseCase } from "../../../src/application/use-cases/get-all-events.use-case";
import { IEventRepository } from "../../../src/domain/repositories/event.repository";

describe("GetAllEventsUseCase", () => {
    it("debería delegar al repositorio y retornar eventos", async () => {
        const eventsMock = [
            { id: 1, name: "A", date: new Date(), price: 10, location: null, reserves: [] },
            { id: 2, name: "B", date: new Date(), price: 20, location: null, reserves: [] },
        ] as any;

        const repo: IEventRepository = {
            findAll: jest.fn().mockResolvedValue(eventsMock),
            findById: jest.fn(),
        };

        const uc = new GetAllEventsUseCase(repo);
        const res = await uc.execute();
        expect(repo.findAll).toHaveBeenCalledTimes(1);
        expect(res).toHaveLength(2);
    });
});
import { GetReservesByEventIdUseCase } from "../../../src/application/use-cases/get-reserves-by-event-id.use";
import { IReserveRepository } from "../../../src/domain/repositories/reserve.repository";

describe("GetReservesByEventIdUseCase", () => {
    it("debería retornar reservas por evento", async () => {
        const reserves = [
            { id: 1, eventId: 3, seatNumbers: [1], createdAt: new Date() },
            { id: 2, eventId: 3, seatNumbers: [2, 3], createdAt: new Date() },
        ] as any;

        const repo: IReserveRepository = {
            findByEventId: jest.fn().mockResolvedValue(reserves),
            findById: jest.fn(),
            save: jest.fn(),
        };

        const uc = new GetReservesByEventIdUseCase(repo);
        const res = await uc.execute(3);
        expect(repo.findByEventId).toHaveBeenCalledWith(3);
        expect(res).toHaveLength(2);
    });
});
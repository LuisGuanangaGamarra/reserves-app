import { GetReserveByIdUseCase } from "../../../src/application/use-cases/get-reserve-by-id.use-case";
import { IReserveRepository } from "../../../src/domain/repositories/reserve.repository";
import { DomainException } from "../../../src/domain/exceptions/domain.exception";

describe("GetReserveByIdUseCase", () => {
    it("debería lanzar DomainException cuando no existe", async () => {
        const repo: IReserveRepository = {
            findById: jest.fn().mockResolvedValue(null),
            save: jest.fn(),
            findByEventId: jest.fn(),
        };

        const uc = new GetReserveByIdUseCase(repo);
        await expect(uc.execute(99)).rejects.toBeInstanceOf(DomainException);
    });

    it("debería devolver la reserva cuando existe", async () => {
        const reserve = { id: 1, eventId: 2, seatNumbers: [1, 2], createdAt: new Date() } as any;
        const repo: IReserveRepository = {
            findById: jest.fn().mockResolvedValue(reserve),
            save: jest.fn(),
            findByEventId: jest.fn(),
        };
        const uc = new GetReserveByIdUseCase(repo);
        const res = await uc.execute(1);
        expect(res).toEqual(reserve);
    });
});
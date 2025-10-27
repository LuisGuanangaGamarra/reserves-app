import { GetEventByIdUseCase } from "../../../src/application/use-cases/get-event-by-id.use-case";
import { IEventRepository } from "../../../src/domain/repositories/event.repository";
import { DomainException } from "../../../src/domain/exceptions/domain.exception";

describe("GetEventByIdUseCase", () => {
    it("debería devolver el evento si existe", async () => {
        const mockRepo: IEventRepository = {
            findById: jest.fn().mockResolvedValue({ id: 1, name: "Test", date: new Date(), price: 10 }),
            findAll: jest.fn(),
        };

        const useCase = new GetEventByIdUseCase(mockRepo as any);
        const result = await useCase.execute(1);
        expect(result?.name).toBe("Test");
    });

    it("debería lanzar DomainException cuando no existe", async () => {
        const repo: IEventRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findAll: jest.fn(),
        };

        const uc = new GetEventByIdUseCase(repo);
        await expect(uc.execute(99)).rejects.toBeInstanceOf(DomainException);
    });
});

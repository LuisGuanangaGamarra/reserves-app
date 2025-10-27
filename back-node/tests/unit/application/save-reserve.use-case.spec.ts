import { SaveReserveUseCase } from "../../../src/application/use-cases/save-reserve.use-case";
import { IReserveRepository } from "../../../src/domain/repositories/reserve.repository";
import { IEventRepository } from "../../../src/domain/repositories/event.repository";
import { DomainException } from "../../../src/domain/exceptions/domain.exception";

const baseEvent = (extra?: Partial<any>) => ({
    id: 1,
    name: "E",
    date: new Date(),
    price: 10,
    location: { id: 1, name: "L", address: "Addr", seats: [{ id: 1, seatNumber: 1 }, { id: 2, seatNumber: 2 }] },
    reserves: [],
    ...extra,
});

describe("SaveReserveUseCase", () => {
    it("debería fallar si el evento no existe", async () => {
        const reserveRepo = { save: jest.fn(), findByEventId: jest.fn(), findById: jest.fn() } as unknown as IReserveRepository;
        const eventRepo = { findById: jest.fn().mockResolvedValue(null), findAll: jest.fn() } as unknown as IEventRepository;

        const uc = new SaveReserveUseCase(reserveRepo, eventRepo);
        await expect(uc.execute({ eventId: 10, seatNumbers: [1], id: null, createdAt: new Date() } as any))
            .rejects.toBeInstanceOf(DomainException);
    });

    it("debería fallar si hay asientos inválidos", async () => {
        const reserveRepo = { save: jest.fn(), findByEventId: jest.fn(), findById: jest.fn() } as unknown as IReserveRepository;
        const eventRepo = { findById: jest.fn().mockResolvedValue(baseEvent()), findAll: jest.fn() } as unknown as IEventRepository;

        const uc = new SaveReserveUseCase(reserveRepo, eventRepo);
        await expect(uc.execute({ eventId: 1, seatNumbers: [3], id: null, createdAt: new Date() } as any))
            .rejects.toMatchObject({ code: "invalid_seat_number" });
    });

    it("debería fallar si ya están reservados", async () => {
        const event = baseEvent({
            reserves: [{ id: 1, eventId: 1, seatNumbers: [2], createdAt: new Date() }],
        });

        const reserveRepo = { save: jest.fn(), findByEventId: jest.fn(), findById: jest.fn() } as unknown as IReserveRepository;
        const eventRepo = { findById: jest.fn().mockResolvedValue(event), findAll: jest.fn() } as unknown as IEventRepository;

        const uc = new SaveReserveUseCase(reserveRepo, eventRepo);
        await expect(uc.execute({ eventId: 1, seatNumbers: [2], id: null, createdAt: new Date() } as any))
            .rejects.toMatchObject({ code: "seat_already_reserved" });
    });

    it("debería guardar reserva válida", async () => {
        const event = baseEvent();
        const saved = { id: 10, eventId: 1, seatNumbers: [1], createdAt: new Date() };

        const reserveRepo: any = {
            save: jest.fn().mockResolvedValue(saved),
            findByEventId: jest.fn(),
            findById: jest.fn(),
        };
        const eventRepo: any = {
            findById: jest.fn().mockResolvedValue(event),
            findAll: jest.fn(),
        };

        const uc = new SaveReserveUseCase(reserveRepo, eventRepo);
        const res = await uc.execute({ id: null, eventId: 1, seatNumbers: [1], createdAt: new Date() } as any);
        expect(res).toEqual(saved);
        expect(reserveRepo.save).toHaveBeenCalled();
    });
});
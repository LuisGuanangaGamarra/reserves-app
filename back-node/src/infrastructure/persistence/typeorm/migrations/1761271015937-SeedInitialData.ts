import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1761271015937 implements MigrationInterface {
    name = 'SeedInitialData1761271015937';

    private formatDateTimeUTC(date: Date): string {
        return (
            `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ` +
            `${date.getUTCHours()}:${date.getUTCMinutes()}`
        );
    }

    private addDaysUTC(base: Date, days: number, hours: number, minutes: number): Date {
        const d = new Date(Date.UTC(
            base.getUTCFullYear(),
            base.getUTCMonth(),
            base.getUTCDate() + days,
            hours,
            minutes,
            0
        ));
        return d;
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO locations (name, address)
            VALUES
                ('Teatro Nacional', 'Av. Central 123, Quito'),
                ('Coliseo General Rumiñahui', 'Av. 6 de Diciembre, Quito');
        `);

        const locations = await queryRunner.query(`SELECT id FROM locations ORDER BY id ASC;`);

        for (const loc of locations) {
            const seatValues = Array.from({ length: 32 })
                .map((_, i) => `(${i + 1}, ${loc.id})`)
                .join(',');

            await queryRunner.query(`
                INSERT INTO seats (seat_number, location_id)
                VALUES ${seatValues};
            `);
        }

        const now = new Date();
        const f1 = this.formatDateTimeUTC(this.addDaysUTC(now, 7, 20, 0));
        const f2 = this.formatDateTimeUTC(this.addDaysUTC(now, 10, 19, 30));
        const f3 = this.formatDateTimeUTC(this.addDaysUTC(now, 14, 21, 15));


        await queryRunner.query(`
            INSERT INTO events (name, date, price, location_id)
            VALUES
                ('Concierto Sinfónico de Verano', '${f1}', 35.5, ${locations[0].id}),
                ('Evento de Beneficencia', '${f2}', 10.25, ${locations[0].id}),
                ('Festival de Rock 2025', '${f3}', 50.0, ${locations[1].id});
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM events;`);
        await queryRunner.query(`DELETE FROM seats;`);
        await queryRunner.query(`DELETE FROM locations;`);
    }
}

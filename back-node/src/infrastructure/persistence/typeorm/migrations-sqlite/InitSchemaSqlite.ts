import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchemaSqlite1761270212442 implements MigrationInterface {
    name = 'InitSchemaSqlite1761270212442';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      CREATE TABLE locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(200) NOT NULL,
        address TEXT NOT NULL,
        created_at DATETIME DEFAULT (datetime('now'))
      )
    `);

        await queryRunner.query(`
      CREATE TABLE seats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seat_number INTEGER NOT NULL,
        location_id INTEGER,
        created_at DATETIME DEFAULT (datetime('now')),
        FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
      )
    `);

        await queryRunner.query(`
      CREATE TABLE events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(200) NOT NULL,
        date DATETIME NOT NULL,
        price FLOAT NOT NULL,
        created_at DATETIME DEFAULT (datetime('now')),
        updated_at DATETIME DEFAULT (datetime('now')),
        deleted_at DATETIME,
        location_id INTEGER,
        FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
      )
    `);

        await queryRunner.query(`
      CREATE TABLE reserves (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER NOT NULL,
        seat_numbers TEXT NOT NULL,
        created_at DATETIME DEFAULT (datetime('now')),
        updated_at DATETIME DEFAULT (datetime('now')),
        deleted_at DATETIME,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
      )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS reserves`);
        await queryRunner.query(`DROP TABLE IF EXISTS events`);
        await queryRunner.query(`DROP TABLE IF EXISTS seats`);
        await queryRunner.query(`DROP TABLE IF EXISTS locations`);
    }
}

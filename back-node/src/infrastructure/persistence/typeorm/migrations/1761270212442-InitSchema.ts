import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1761270212442 implements MigrationInterface {
    name = 'InitSchema1761270212442';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`locations\` (
                                           \`id\` int NOT NULL AUTO_INCREMENT,
                                           \`name\` varchar(200) NOT NULL,
                                           \`address\` text NOT NULL,
                                           \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                                           PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

        await queryRunner.query(`
            CREATE TABLE \`seats\` (
                                       \`id\` int NOT NULL AUTO_INCREMENT,
                                       \`seat_number\` int NOT NULL,
                                       \`location_id\` int NULL,
                                       \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                                       PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

        await queryRunner.query(`
            CREATE TABLE \`events\` (
                                        \`id\` int NOT NULL AUTO_INCREMENT,
                                        \`name\` varchar(200) NOT NULL,
                                        \`date\` timestamp NOT NULL,
                                        \`price\` float NOT NULL,
                                        \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                                        \`updated_at\` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                                        \`deleted_at\` timestamp(6) NULL,
                                        \`location_id\` int NULL,
                                        PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

        await queryRunner.query(`
            CREATE TABLE \`reserves\` (
                                          \`id\` int NOT NULL AUTO_INCREMENT,
                                          \`event_id\` int NOT NULL,
                                          \`seat_numbers\` text NOT NULL,
                                          \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                                          \`updated_at\` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                                          \`deleted_at\` timestamp(6) NULL,
                                          PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

        await queryRunner.query(`
            ALTER TABLE \`seats\`
                ADD CONSTRAINT \`FK_fc3b8a672c60acf1cdf491e3867\`
                    FOREIGN KEY (\`location_id\`)
                        REFERENCES \`locations\`(\`id\`)
                        ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE \`events\`
                ADD CONSTRAINT \`FK_fccf31c64ec14a66276e9999730\`
                    FOREIGN KEY (\`location_id\`)
                        REFERENCES \`locations\`(\`id\`)
                        ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE \`reserves\`
                ADD CONSTRAINT \`FK_8375b7f28fea82c81febf49d5d1\`
                    FOREIGN KEY (\`event_id\`)
                        REFERENCES \`events\`(\`id\`)
                        ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reserves\` DROP FOREIGN KEY \`FK_8375b7f28fea82c81febf49d5d1\``);
        await queryRunner.query(`ALTER TABLE \`events\` DROP FOREIGN KEY \`FK_fccf31c64ec14a66276e9999730\``);
        await queryRunner.query(`ALTER TABLE \`seats\` DROP FOREIGN KEY \`FK_fc3b8a672c60acf1cdf491e3867\``);
        await queryRunner.query(`DROP TABLE \`reserves\``);
        await queryRunner.query(`DROP TABLE \`events\``);
        await queryRunner.query(`DROP TABLE \`seats\``);
        await queryRunner.query(`DROP TABLE \`locations\``);
    }
}

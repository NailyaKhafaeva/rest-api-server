import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1695118007380 implements MigrationInterface {
    name = 'CreateTables1695118007380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_bb7d685810f5cba57e9ff6756f\` (\`value\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NULL, \`canPublic\` tinyint NULL DEFAULT 0, \`active\` tinyint NULL DEFAULT 0, \`roleValue\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`publications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`header\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`images\` json NULL, \`authorId\` int NOT NULL, \`publicated\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_786dd213dd2da0cf96a3bfd9278\` FOREIGN KEY (\`roleValue\`) REFERENCES \`roles\`(\`value\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`publications\` ADD CONSTRAINT \`FK_83c5d7da55f390768062a47a680\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`publications\` DROP FOREIGN KEY \`FK_83c5d7da55f390768062a47a680\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_786dd213dd2da0cf96a3bfd9278\``);
        await queryRunner.query(`DROP TABLE \`publications\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb7d685810f5cba57e9ff6756f\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}

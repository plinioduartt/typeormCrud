import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTokens1566169329529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "tokens",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: "token",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "revoked",
                    type: "boolean",
                    default: false,
                    isNullable: false
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("tokens");
    }

}

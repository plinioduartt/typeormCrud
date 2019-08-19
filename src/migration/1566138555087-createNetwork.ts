import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createNetwork1566138555087 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "networks",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: "str_cnpj",
                    type: "varchar",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "str_name",
                    type: "varchar",
                    isNullable: false
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("networks");
    }

}

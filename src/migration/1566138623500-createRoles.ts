import { MigrationInterface, QueryRunner, Table } from "typeorm";
import Roles from "../entity/Roles";

export class createRoles1566138623500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "roles",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: "str_name",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "str_desc",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("roles");
    }

}

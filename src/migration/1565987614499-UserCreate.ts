import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UserCreate1565987614499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "users",
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
                    name: "str_username",
                    type: "varchar",
                    length: "255",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                }
            ]
        }), true)

        // await queryRunner.createForeignKey("users", new TableForeignKey({
        //     columnNames: ["roleId"],
        //     referencedColumnNames: ["id"],
        //     referencedTableName: "roles"
        // }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropIndex("users", "IDX_e12875dfb3b1d92d7d7c5377e2");
        await queryRunner.dropTable("users");
    }

}

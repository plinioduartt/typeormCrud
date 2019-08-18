import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, getRepository, BeforeInsert } from "typeorm";
import Roles from "./Roles";
import bcrypt = require("bcryptjs");

@Entity()
class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    str_name: string;

    @Column({ type: "varchar", unique: true, length: 255, nullable: false })
    str_username: string;

    @Column({ type: "varchar", length: 255,  nullable: false }) 
    password: string; 
    
    @OneToOne(() => Roles)
    @JoinColumn()
    role: Roles;    // chave estrangeira

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: string;

    static async seed() {
        const users = await getRepository(Users)
        .createQueryBuilder("roles")
        .getMany();

        const role = await Roles.findOne({ str_name: "Administrator" });

        if (users.length == 0) {
            var user = new Users();
            user.str_name = "Admin";
            user.str_username = "admin";
            user.password = await bcrypt.hash("123456", 10);
            user.role = role;

            user.save();
        }
    }

}

export default Users;
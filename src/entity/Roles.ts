import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Timestamp, getRepository } from "typeorm";

@Entity()
class Roles extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    str_name: string;

    @Column({ type: "varchar", length: 255 })
    str_desc: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: string;


    static async seed() {
        // Seed para roles
            const roles = await getRepository(Roles)
            .createQueryBuilder("roles")
            .getMany();

            if (roles.length === 0) {
                var admin = new Roles();
                admin.str_desc = "Administrator role";
                admin.str_name = "Administrator";
                admin.save();

                var customer = new Roles();
                customer.str_desc = "Customer role";
                customer.str_name = "Customer";
                customer.save();
            }
        //--
    }
    
}

export default Roles;
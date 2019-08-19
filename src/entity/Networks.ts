import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
class Networks extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:"varchar", unique: true, length: 255 })
    str_cnpj: string;

    @Column({ type:"varchar", length: 255 })
    str_name: string;
    
}

export default Networks;
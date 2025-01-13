import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Template {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("json")
    attributes: Record<string, any>; // Stores dynamic fields

    constructor() {
        this.id = 0;
        this.name = '';
        this.attributes = {};
    }
}
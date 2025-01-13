import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('acl')
export class Acl {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    label: string = '';

    @Column()
    name: string = '';
}
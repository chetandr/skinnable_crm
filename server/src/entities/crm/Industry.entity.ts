import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('industries')
export class Industry {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    name: string = '';

    @Column()
    slug: string = '';
}
import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('stages')
export class Stage {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    slug: string = '';

    @Column()
    name: string = '';

    @Column()
    description: string = '';

    @Column()
    sequence: number = 0;

    @Column()
    isFinalStage: boolean = false;

}
import { Column, ObjectIdColumn, ObjectId } from 'typeorm';

export class Address {
  @ObjectIdColumn()
  _id: ObjectId | undefined;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: string;

  constructor() {
    this.street = '';
    this.city = '';
    this.state = '';
    this.postalCode = '';
  }
}
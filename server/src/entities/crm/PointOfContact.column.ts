import { Column } from 'typeorm';


export class PointOfContact {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  designation: string;

  @Column()
  organization: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.mobile = '';
    this.designation = '';
    this.organization = '';
  }
}
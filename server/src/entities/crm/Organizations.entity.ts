import { Entity, Column, ObjectIdColumn, ObjectId, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Address } from './Address.column';
import { PointOfContact } from './PointOfContact.column';
import { StageHistory } from './StageHistory.column';

@Entity()
export class Organizations {
  @ObjectIdColumn()
  _id: ObjectId | undefined;

  @Column()
  organizationName!: string;

  @Column()
  address!: Address;

  @Column()
  industryType!: string;

  @Column()
  website!: string;

  @Column('array')
  pointsOfContact!: PointOfContact[];

  @Column()
  source!: string;

  @Column()
  status!: string;

  @Column()
  current_stage!: string;

  @Column('array')
  stages!: StageHistory[];

  @Column()
  created_at!: string;
}
import { Column } from 'typeorm';


export class StageHistory {

  @Column()
  stage: string;

  @Column()
  created_at: string;

  @Column()
  remarks: string;

  @Column()
  staffId: string;

  @Column()
  organization: string;

  constructor() {
    this.stage = '';
    this.created_at = '';
    this.remarks = '';
    this.staffId = '';
    this.organization = '';
  }
}
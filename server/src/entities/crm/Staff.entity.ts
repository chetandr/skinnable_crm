import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { StaffFile } from './StaffFile.entity';
import { Address } from './Address.column';
import { Acl } from './Acl.entity';
// import { Acl } from './acl.entity'; // Import the Acl class


class EmploymentDetails {
  @Column()
  employeeId: string | undefined;

  @Column()
  designation: string | undefined;

  @Column()
  department: string | undefined;

  @Column()
  joiningDate: string | undefined;

  @Column()
  employmentType: string | undefined;

  @Column()
  managerId: string | undefined;

  @Column()
  status: string | undefined;
}

class Salary {
  @Column()
  base: number | undefined;

  @Column()
  bonus: number | undefined;

  @Column()
  currency: string | undefined;
}

class WorkHours {
  @Column()
  startTime: string | undefined;

  @Column()
  endTime: string | undefined;

  @Column('simple-array') // Stores an array of strings
  days: string[] | undefined;
}

class EmergencyContact {
  @Column()
  name: string | undefined;

  @Column()
  relation: string | undefined;

  @Column()
  phone: string | undefined;
}

@Entity()
export class Staff {
  @ObjectIdColumn()
  _id: ObjectId | undefined;

  @Column()
  firstName: string | undefined;

  @Column()
  lastName: string | undefined;

  @Column()
  email: string | undefined;

  @Column()
  password: string | undefined;

  @Column()
  phone: string | undefined;

  @Column()
  dob: string | undefined;

  @Column()
  gender: string | undefined;

  @Column(() => Address) // Embedding Address class
  address: Address | undefined;

  @Column(() => EmploymentDetails) // Embedding EmploymentDetails class
  employmentDetails: EmploymentDetails | undefined;

  @Column('simple-array') // Stores an array of strings
  roles: string[] | undefined;

  @Column('simple-array') // Stores an array of strings
  permissions: string[] | undefined;

  @Column(() => Salary) // Embedding Salary class
  salary: Salary | undefined;

  @Column(() => WorkHours) // Embedding WorkHours class
  workHours: WorkHours | undefined;

  @Column(() => EmergencyContact) // Embedding EmergencyContact class
  emergencyContact: EmergencyContact | undefined;

  @CreateDateColumn()
  createdAt: Date | undefined;

  @UpdateDateColumn()
  updatedAt: Date | undefined;

  @OneToMany(() => StaffFile, (staffFile: StaffFile) => staffFile.staff)
  files: StaffFile[] | undefined;

  @Column()
  acl!: string[];

  @Column()
  acls!: Acl[];
}
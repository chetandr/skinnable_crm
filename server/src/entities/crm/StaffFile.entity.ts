import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {Staff} from './Staff.entity'; // Assuming a User entity exists

@Entity('staff_files') // Table name
export class StaffFile {
  @PrimaryGeneratedColumn('uuid') // Automatically generates a unique ID
  id: string | undefined;

  @Column({ type: 'text' })
  staffId: string | undefined; // Relation to the User entity

  @Column({ type: 'varchar', length: 255 })
  fileName: string | undefined; // Name of the uploaded file

  @Column({ type: 'text' })
  filePath: string | undefined; // Path or URL where the file is stored

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  fileStatus: string | undefined; // Status of the file (e.g., "pending", "processed", "failed")

  @Column({ type: 'text', nullable: true })
  translatedText: string | undefined; // The text extracted/translated from the file

  @CreateDateColumn()
  createdAt: Date | undefined; // Timestamp for when the file was created

  @UpdateDateColumn()
  updatedAt: Date | undefined; // Timestamp for when the file was last updated

  @ManyToOne(() => Staff, (staff) => staff.files)
  @JoinColumn({ name: 'staffId' }) // Explicitly specify the column used for the join
  staff!: Staff;
}
import { getRepository } from 'typeorm';
import {StaffFile} from '../entities/crm/StaffFile.entity';
import {Staff} from '../entities/crm/Staff.entity';
import { ObjectId } from 'mongodb';
import { AppDataSource } from '../config/db';

export const createStaffFile = async (staffId: string, fileData: Partial<StaffFile>): Promise<StaffFile> => {
  const staffRepository = AppDataSource.getRepository(Staff);
  const staffFileRepository = AppDataSource.getRepository(StaffFile);

  const staff = await staffRepository.findOne({ where: { _id: new ObjectId(staffId) } });
  console.log(staffId, staff);
  if (!staff) {
    throw new Error('Staff not found');
  }
  console.log(staff, fileData);
  const newStaffFile = staffFileRepository.create({
    ...fileData,
    staffId,
  });

  return staffFileRepository.save(newStaffFile);
};

export const getStaffFileById = async (id: string): Promise<StaffFile | null> => {
    const staffFileRepository = getRepository(StaffFile);
    return staffFileRepository.findOne({ where: { id } });
};

export const getStaffFilesByStaffId = async (staffId: string): Promise<StaffFile[]> => {
    const staffFileRepository = getRepository(StaffFile);
    return staffFileRepository.find({ where: { staffId: staffId } });
};

export const updateStaffFile = async (id: string, updateData: Partial<StaffFile>): Promise<StaffFile> => {
    const staffFileRepository = getRepository(StaffFile);
  
    const staffFile = await staffFileRepository.findOne({ where: { id } });
    if (!staffFile) {
      throw new Error('StaffFile not found');
    }
  
    Object.assign(staffFile, updateData);
    return staffFileRepository.save(staffFile);
  };
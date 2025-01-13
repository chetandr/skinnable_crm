import multer from 'multer';
import { Request } from 'express';
import path from 'path';
import fs from 'fs';
import { createStaffFile } from './fileCrud';
import CustomRequest from '../interfaces/customRequest.interface';

// Create an uploads directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req: CustomRequest, file: Express.Multer.File, cb) => {
    cb(null, uploadDir); // Specify upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});


// Initialize Multer
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Optional: Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'));
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
  },
});

export default upload;
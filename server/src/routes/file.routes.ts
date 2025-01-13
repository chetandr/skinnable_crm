import express from 'express';
import upload from '../modules/fileUpload';
import { authMiddleware } from '../middleware/auth.middleware';
import { createStaffFile } from '../modules/fileCrud';
import CustomRequest from '../interfaces/customRequest.interface';
import { StaffFile } from '../entities/crm/StaffFile.entity';

const fileRouter = express.Router();

// Single file upload
fileRouter.post('/upload-single', authMiddleware, upload.single('file'), (req: CustomRequest, res): void => {
    if (!req.file) {
        res.status(400).json({ message: 'No file uploaded.' });
        return;
    } else {
        const file = req.file as Express.Multer.File;
        console.log(file)
        createStaffFile(req.user.id, { fileName: file.originalname, filePath: `${file.destination}/${__filename}`, fileStatus: "uplaoded", translatedText: "", createdAt: new Date() } as StaffFile);

    }
    res.json({
        message: 'File uploaded successfully',
        file: req.file,
    });
});

// Multiple files upload
fileRouter.post('/upload-multiple', authMiddleware, upload.array('files', 5), (req: CustomRequest, res): void => {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        res.status(400).json({ message: 'No files uploaded.' });
        return
    } else {
        const file = (req.files as Express.Multer.File[])[0];
        console.log(file)
        createStaffFile(req.user.id, { fileName: file.originalname, filePath: `${file.destination}/${__filename}`, fileStatus: "uplaoded", translatedText: "", createdAt: new Date() } as StaffFile);
    }
    console.log(res);
    res.json({
        message: 'Files uploaded successfully',
        files: req.files,
    });
});

export default fileRouter;
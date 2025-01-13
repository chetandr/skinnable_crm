import CustomRequest from "../interfaces/customRequest.interface";
import { Response, NextFunction } from "express";

export const validateIndustry = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }
    next();
};

export const validateStage = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }
    next();
};
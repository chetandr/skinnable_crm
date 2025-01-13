import { NextFunction, RequestHandler, Response } from "express";
import CustomRequest from "../interfaces/customRequest.interface";

const requestReferer: RequestHandler = (req: CustomRequest, res: Response, next: NextFunction) => {
  req.referer = (req.headers.referer || req.headers.referrer || '').toString();
  next();
};
export default requestReferer;
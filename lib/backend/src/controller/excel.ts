import { NextFunction, Request, Response } from 'express';
import { readExcelFile } from "../utils/excel"


const handleReadExcelFile  = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = readExcelFile();
        res.status(200).json('after read file')
    } catch (error: any) {
        next(error);
    }
};
export { handleReadExcelFile  }

import { NextFunction, Request, Response } from "express";
import db from "../db";
import { CreditDetails, HttpError } from "../model";

const createCreditDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    CreditDetails.sanitizeBodyExisting(req);
    const creditDetailsrData = req.body;
    const sanitized = CreditDetails.sanitize(creditDetailsrData, false);
    const creditDetails = await db.CreditDetails.createCreditDetails(sanitized);
    res.status(201).json(creditDetails);
  } catch (error: any) {
    next(error);
  }
};

const getCreditDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const creditDetails = await db.CreditDetails.getCreditDetails();
    res.status(200).json(creditDetails);
  } catch (error: any) {
    next(error);
  }
};

const getCreditDetailsById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    CreditDetails.sanitizeIdExisting(req);
    const existCreditDetails = await db.CreditDetails.doesCreditDetailsExist(
      req.params.id
    );
    if (!existCreditDetails) {
      const error: HttpError.Model = {
        status: 404,
        message: "CreditDetails does not exist.",
      };
      throw error;
    }
    const creditDetails = await db.CreditDetails.getCreditDetailsById(
      req.params.id
    );
    res.status(200).json(creditDetails);
  } catch (error: any) {
    next(error);
  }
};

const updateCreditDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    CreditDetails.sanitizeIdExisting(req);
    CreditDetails.sanitizeBodyExisting(req);
    const sanitized = CreditDetails.sanitize(req.body, true);
    const updateCreditDetails = await db.CreditDetails.updateCreditDetails(
      req.params.id,
      sanitized
    );
    res.status(200).json(updateCreditDetails);
  } catch (error: any) {
    next(error);
  }
};

// const deleteCreditDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         CreditDetails.sanitizeIdExisting(req);
//         const existCreditDetails = await db.CreditDetails.doesCreditDetailsExist(req.params.id);
//         if (!existCreditDetails) {
//             const error: HttpError.Model = {
//                 status: 404,
//                 message: 'CreditDetails does not exist.'
//             };
//             throw error;
//         }
//         const deleteCreditDetails = await db.CreditDetails.(req.params.id);
//         res.status(200).json(deleteCustomer);
//     } catch (error: any) {
//         next(error);
//     }
// };

export {
  createCreditDetails,
  getCreditDetails,
  getCreditDetailsById,
  updateCreditDetails,
};
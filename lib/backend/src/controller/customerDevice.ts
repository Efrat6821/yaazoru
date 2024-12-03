import { NextFunction, Request, Response } from 'express';
import db from "../db";
import { CustomerDevice, HttpError } from "@yaazoru/model";

const createCustomerDevice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        CustomerDevice.sanitizeBodyExisting(req);
        const customerDeviceData = req.body;
        const sanitized = CustomerDevice.sanitize(customerDeviceData, false);
        await existingCustomerDevice(sanitized, false);
        const customerDevice = await db.CustomerDevice.createCustomerDevice(sanitized);
        res.status(201).json(customerDevice);
    } catch (error: any) {
        next(error);
    }
};

const getCustomersDevices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const customersDevices = await db.CustomerDevice.getCustomersDevices();
        res.status(200).json(customersDevices);
    } catch (error: any) {
        next(error);
    }
};

const getCustomerDeviceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        CustomerDevice.sanitizeIdExisting(req);
        const existCustomerDevice = await db.CustomerDevice.doesCustomerDeviceExist(req.params.id);
        if (!existCustomerDevice) {
            const error: HttpError.Model = {
                status: 404,
                message: 'CustomerDevice does not exist.'
            };
            throw error;
        }
        const customerDevice = await db.CustomerDevice.getCustomerDeviceById(req.params.id);
        res.status(200).json(customerDevice);
    } catch (error: any) {
        next(error);
    }
};

const updateCustomerDevice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        CustomerDevice.sanitizeIdExisting(req);
        CustomerDevice.sanitizeBodyExisting(req);
        const sanitized = CustomerDevice.sanitize(req.body, true);
        await existingCustomerDevice(sanitized, true);
        const updateCustomerDevice = await db.CustomerDevice.updateCustomerDevice(req.params.id, sanitized);
        res.status(200).json(updateCustomerDevice);
    } catch (error: any) {
        next(error);
    }
};

const deleteCustomerDevice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        CustomerDevice.sanitizeIdExisting(req);
        const existCustomerDevice = await db.CustomerDevice.doesCustomerDeviceExist(req.params.id);
        if (!existCustomerDevice) {
            const error: HttpError.Model = {
                status: 404,
                message: 'CustomerDevice does not exist.'
            };
            throw error;
        }
        const deleteCustomerDevice = await db.CustomerDevice.deleteCustomerDevice(req.params.id);
        res.status(200).json(deleteCustomerDevice);
    } catch (error: any) {
        next(error);
    }
};

const existingCustomerDevice = async (customerDevice: CustomerDevice.Model, hasId: boolean) => {
    try {
        let customerDeviceEx;
        if (hasId) {
            customerDeviceEx = await db.CustomerDevice.findCustomerDevice({
                customerDevice_id: customerDevice.customerDevice_id,
                device_id: customerDevice.device_id,
            });
        } else {
            customerDeviceEx = await db.CustomerDevice.findCustomerDevice({
                device_id: customerDevice.device_id,
            });
        }
        if (customerDeviceEx) {
            try {
                CustomerDevice.sanitizeExistingCustomerDevice(customerDeviceEx, customerDevice);
            } catch (err) {
                throw err;
            }
        };
    } catch (err) {
        throw err;
    }
};


export {
    createCustomerDevice, getCustomersDevices, getCustomerDeviceById, updateCustomerDevice, deleteCustomerDevice,
}
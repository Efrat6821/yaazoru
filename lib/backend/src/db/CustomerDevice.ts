import { CustomerDevice } from "@yaazoru//model";
import getConnection from "./connection";



const createCustomerDevice = async (customerDevice: CustomerDevice.Model) => {
    const knex = getConnection();
    try {
        const [newCustomerDevice] = await knex('yaazoru.customerDevice')
            .insert({
                customer_id: customerDevice.customer_id,
                device_id: customerDevice.device_id,
            }).returning('*');
        return newCustomerDevice;
    }
    catch (err) {
        throw err;
    };
}

const getCustomersDevices = async (): Promise<CustomerDevice.Model[]> => {
    const knex = getConnection();
    try {
        return await knex.select().table('yaazoru.customerDevice');
    }
    catch (err) {
        throw err;
    };
}

const getCustomerDeviceById = async (customerDevice_id: string) => {
    const knex = getConnection();
    try {
        return await knex('yaazoru.customerDevice').where({ customerDevice_id }).first();
    } catch (err) {
        throw err;
    };
};

const updateCustomerDevice = async (customerDevice_id: string, customerDevice: CustomerDevice.Model) => {
    const knex = getConnection();
    try {
        const updateCustomerDevice = await knex('yaazoru.customerDevice')
            .where({ customerDevice_id })
            .update(customerDevice)
            .returning('*');
        if (updateCustomerDevice.length === 0) {
            throw { status: 404, message: 'CustomerDevice not found' };
        }
        return updateCustomerDevice[0];
    } catch (err) {
        throw err;
    };
};

const deleteCustomerDevice = async (customerDevice_id: string) => {
    const knex = getConnection();
    try {
        const deleteCustomerDevice = await knex('yaazoru.customerDevice').where({ customerDevice_id }).del().returning('*');
        if (deleteCustomerDevice.length === 0) {
            throw { status: 404, message: 'CustomerDevice not found' };
        }
        return deleteCustomerDevice[0];
    } catch (err) {
        throw err;
    };
};

const findCustomerDevice = async (criteria: { customerDevice_id?: string; device_id?: string; }) => {
    const knex = getConnection();
    try {
        return await knex('yaazoru.customerDevice')
            .where(function () {
                if (criteria.device_id) {
                    this.orWhere({ device_id: criteria.device_id });
                }
            })
            .andWhere(function () {
                if (criteria.customerDevice_id) {
                    this.whereNot({ customerDevice_id: criteria.customerDevice_id });
                }
            })
            .first();
    } catch (err) {
        throw err;
    }
};

const doesCustomerDeviceExist = async (customerDevice_id: string): Promise<boolean> => {
    const knex = getConnection();
    try {
        const result = await knex('yaazoru.customerDevice')
            .select('customerDevice_id')
            .where({ customerDevice_id })
            .first();
        return !!result;
    } catch (err) {
        throw err;
    }
};

export {
    createCustomerDevice, getCustomersDevices, getCustomerDeviceById, updateCustomerDevice, deleteCustomerDevice, findCustomerDevice, doesCustomerDeviceExist
}
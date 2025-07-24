/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance, type SuccessResponse } from "../config/axios.instance";
import { type IConfigParams } from "./service.contract";

abstract class BaseService {
    async postRequest(url: string, data: any = null, config: IConfigParams = {}): Promise<SuccessResponse> {
        try {
            return await axiosInstance.post(url, data, config);
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    async getRequest(url: string, config: IConfigParams = {}): Promise<SuccessResponse> {
        try {
            return await axiosInstance.get(url, config);
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    async putRequest(url: string, data: any = null, config: IConfigParams = {}): Promise<SuccessResponse> {
        try {
            return await axiosInstance.put(url, data, config);
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    async patchRequest(url: string, data: any = null, config: IConfigParams = {}): Promise<SuccessResponse> {
        try {
            return await axiosInstance.patch(url, data, config);
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    async deleteRequest(url: string, config: IConfigParams = {}): Promise<SuccessResponse> {
        try {
            return await axiosInstance.delete(url, config);
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

}
export default BaseService
/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "../config/axios.instance";
import { type IConfigParams } from "./service.contract";

abstract class BaseService {
    async postRequest(url: string, data: any = null, config: IConfigParams = {}) {
        try {
            return await axiosInstance.post(url, data, config);
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
}
export default BaseService
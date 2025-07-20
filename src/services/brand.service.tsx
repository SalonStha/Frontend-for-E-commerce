import type { IBrandData } from "../pages/brand/Brandvalidator";
import BaseService from "./base.service";

class BrandService extends BaseService {
    async createBrand(data: IBrandData) {
        return await this.postRequest('brands', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}

const brandService = new BrandService();
export default brandService;

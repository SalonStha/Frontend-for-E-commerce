import type { ICategoryData } from "../pages/categories/Categoryvalidator";
import BaseService from "./base.service";

class CategoryService extends BaseService {
    async createCategory(data: ICategoryData) {
        return await this.postRequest('category', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}

const categoryService = new CategoryService();
export default categoryService;

import type { IProductData } from "../pages/products/ProductValidator";
import BaseService from "./base.service";

class ProductService extends BaseService {
    async createProduct(data: IProductData) {
        return await this.postRequest('product', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}

const productService = new ProductService();
export default productService;

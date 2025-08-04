import type { IProductData } from "../pages/products/ProductValidator";
import BaseService from "./base.service";

class OrderService extends BaseService {
    async createProduct(data: IProductData) {
        return await this.postRequest('product', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}

const orderService = new OrderService();
export default orderService;

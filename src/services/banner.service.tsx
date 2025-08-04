import type { IBannerData } from "../pages/banner/BannerValidator";
import BaseService from "./base.service";

class BannerService extends BaseService {
    async createBanner(data: IBannerData) {
        return await this.postRequest('banner', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}

const bannerService = new BannerService();
export default bannerService;

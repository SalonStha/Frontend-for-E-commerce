
import BaseService from "./base.service";

class ChatService extends BaseService {
    async sendMessage(data: {
        receiver: string;
        message: string;
        images?: {
            publicId: string;
            secureUrl: string;
            optimizedUrl: string;
            _id: string;
        };
    }) {
        return await this.postRequest('chat/sendMessage', data);
    }

    async getMessage(userId: string) {
        return await this.getRequest('chat/' + userId, {
            params: {
                limit: 100,
                page: 1
            }
        });
    }
}

const chatService = new ChatService();
export default chatService;

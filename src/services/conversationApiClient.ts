import ApiService from './apiService';

class ConversationApiClient extends ApiService {
    constructor() {
        super(`${import.meta.env.VITE_SERVICE_URL}`);
    }

    async getAll(params?: string) {
        return this.get(params ?? '');
    }
}

const conversationApiClient = new ConversationApiClient();

export default conversationApiClient;

import ApiService from './apiService';

class ClientsApiService extends ApiService {
    constructor() {
        super(`${import.meta.env.VITE_SERVICE_URL}`, 'client');
    }

    async getAll(params?: string) {
        return this.get(params ?? '');
    }
}

const clientsApiService = new ClientsApiService();

export default clientsApiService;

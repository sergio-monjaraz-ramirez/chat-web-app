import axios, { AxiosInstance } from 'axios';

export default abstract class ApiService {
    private client: AxiosInstance;
    private resourceName: string;
    constructor(baseUrl: string, resource: string) {
        this.client = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.resourceName = resource;
    }

    protected async get(url: string) {
        try {
            const response = await this.client.get(url);
            return response.data;
        } catch (error) {
            console.log('error' + error);
        }
    }
}

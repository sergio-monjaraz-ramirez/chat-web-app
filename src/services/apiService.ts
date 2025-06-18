import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export default abstract class ApiService {
    private client: AxiosInstance;
    constructor(baseUrl: string) {
        this.client = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setInterceptorResponse();
    }

    protected setInterceptorResponse() {
        this.client.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                if (error.request) {
                    switch (error.response?.status) {
                        case 400:
                            // Handle Bad Request
                            console.error('Bad Request:', error.response.data);
                            break;
                        case 401:
                            // Handle Unauthorized
                            console.error('Unauthorized:', error.response.data);
                            // Optionally, redirect to login or refresh token
                            break;
                        case 403:
                            // Handle Forbidden
                            console.error('Forbidden:', error.response.data);
                            break;
                        case 404:
                            // Handle Not Found
                            console.error('Not Found:', error.response.data);
                            break;
                        case 500:
                            // Handle Internal Server Error
                            console.error('Server Error:', error.response.data);
                            break;
                        default:
                            // Handle other errors
                            console.error('Error:', error.response?.data || error.message);
                    }
                } else {
                    // Network or other errors
                    console.error('Network Error:', error.message);
                }
                return Promise.reject(error);
            },
        );
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

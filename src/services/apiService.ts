import { useSnackBar } from '@/composables/useSnackBar';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const { showSnackBar } = useSnackBar();

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
                            showSnackBar({ message: 'Bad Request', type: 'error' });
                            console.error('Bad Request:', error.response.data);
                            break;
                        case 401:
                            // Handle Unauthorized
                            showSnackBar({ message: 'Recurso no autorizado', type: 'error' });
                            console.error('Unauthorized:', error.response.data);
                            // Optionally, redirect to login or refresh token
                            break;
                        case 403:
                            // Handle Forbidden
                            showSnackBar({ message: 'Recurso no autorizado', type: 'error' });
                            console.error('Forbidden:', error.response.data);
                            break;
                        case 404:
                            // Handle Not Found
                            showSnackBar({ message: 'Recurso no encontrado', type: 'error' });
                            console.error('Not Found:', error.response.data);
                            break;
                        case 500:
                            // Handle Internal Server Error
                            showSnackBar({ message: 'Error del Servidor', type: 'error' });
                            console.error('Server Error:', error.response.data);
                            break;
                        default:
                            // Handle other errors
                            showSnackBar({ message: 'Error en la red', type: 'error' });
                            console.error('Error:', error.response?.data || error.message);
                    }
                } else {
                    // Network or other errors
                    showSnackBar({ message: 'Error en la red', type: 'error' });
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

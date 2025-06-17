import { avatars } from '@/constants';
import clientsApiService from '@/services/clientsApiService';
import User from '@/types/Users';
import { ref } from 'vue';

export function useClients() {
    const clients = ref<User[]>([]);
    const loading = ref(false);
    const errorNew = ref<unknown | null>(null);
    const selectedClient = ref<User | null>();

    const fetchClients = async () => {
        loading.value = true;
        try {
            const response = await clientsApiService.getAll('clients.json');
            clients.value = response.map((client: User, index: number) => ({ ...client, avatar: avatars[index] }));
        } catch (error) {
            errorNew.value = error;
        }
    };

    const handleSelectClient = (client: User) => {
        selectedClient.value = client;
    };

    return {
        clients,
        loading,
        errorNew,
        selectedClient,
        fetchClients,
        handleSelectClient,
    };
}

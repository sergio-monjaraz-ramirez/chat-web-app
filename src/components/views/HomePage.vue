<template>
    <MainLayout class="@container">
        <SideBar :is-open="openSideBar" @onToogle="openSideBar = false" :users="clients" />
        <LeftSection class="@xs:hidden @md:flex" :users="clients" />
        <RightSection />
    </MainLayout>
</template>

<script setup lang="ts">
    import { onMounted, provide, reactive, ref } from 'vue';
    import MainLayout from '@/layouts/MainLayout.vue';
    import LeftSection from '@/components/LeftSection.vue';
    import RightSection from '@/components/RightSection.vue';
    import SideBar from '@/components/SideBar.vue';
    import User from '@/types/Users';
    import clientsApiService from '@/services/clientsApiService';
    import { avatars } from '@/constants';

    const openSideBar = ref(false);
    const selectedClient = ref<User>();
    const clients = ref<User[]>([]);

    onMounted(() => {
        fetchClients();
    });

    const fetchClients = async () => {
        try {
            const response = await clientsApiService.getAll('clients.json');
            clients.value = response.map((client: User, index: number) => ({ ...client, avatar: avatars[index] }));
        } catch (error) {
            console.log(error);
        }
    };

    const conversations = reactive([]);
    provide('toggleSideBar', openSideBar);
    provide('selectedClient', selectedClient);
</script>

<style scoped></style>

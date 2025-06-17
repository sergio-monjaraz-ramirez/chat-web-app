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
    import { useClients } from '@/composables/useClients';

    const openSideBar = ref(false);
    const { fetchClients, clients, selectedClient } = useClients();

    onMounted(async () => {
        await fetchClients();
    });

    const conversations = reactive([]);
    provide('toggleSideBar', openSideBar);
    provide('selectedClient', selectedClient);
</script>

<style scoped></style>

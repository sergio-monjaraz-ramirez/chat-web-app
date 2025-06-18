<template>
    <HomePage />
    <SnackBar />
</template>

<script setup lang="ts">
    import HomePage from '@/components/views/HomePage.vue';
    import SnackBar from '@/components/Common/SnackBar.vue';
    import { useSnackBar } from './composables/useSnackBar';
    import { onMounted } from 'vue';

    const { showSnackBar } = useSnackBar();

    onMounted(() => {
        showSnackBar({ message: 'Hola Bienvenido', type: 'info' });
    });
</script>

<style scoped></style>

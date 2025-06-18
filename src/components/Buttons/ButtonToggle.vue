<template>
    <button
        data-testid="toggle-sidebar-button"
        class="md:hidden sm:block mr-4 p-2 h-10 rounded hover:bg-gray-100 dark:bg-dark-secondary"
        @click="openSideBar = true"
        aria-label="Open menu"
    >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>
</template>
<script setup lang="ts">
    import { inject } from 'vue';

    const openSideBar = inject('toggleSideBar');
</script>

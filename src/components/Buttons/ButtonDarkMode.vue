<template>
    <button
        data-testid="dark-mode-button"
        class="ml-auto mr-4 p-2 h-10 rounded-3xl cursor-pointer hover:bg-secondary dark:bg-dark-secondary"
        @click="toggleDark"
        aria-label="Toggle dark mode"
    >
        <svg
            v-if="!isDark"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 6.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
        </svg>
        <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
            />
        </svg>
    </button>
</template>
<script setup lang="ts">
    import { useDarkMode } from '@/composables/useDarkMode';

    const { isDark, toggleDark } = useDarkMode();
</script>

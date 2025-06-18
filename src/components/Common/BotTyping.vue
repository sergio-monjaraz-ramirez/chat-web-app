<template>
    <div
        class="flex items-center gap-2 italic text-gray-600 dark:text-gray-200 mt-2 self-start"
        aria-live="off"
        aria-hidden="true"
    >
        <span>{{ selectedClient.name }} is typing</span>
        <span class="flex gap-1">
            <span class="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-50 rounded-full inline-block animate-blink"></span>
            <span
                class="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-50 rounded-full inline-block animate-blink delay-200"
            ></span>
            <span
                class="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-50 rounded-full inline-block animate-blink delay-400"
            ></span>
        </span>
    </div>
</template>
<script setup lang="ts">
    import { inject } from 'vue';

    const selectedClient: any = inject('selectedClient');
</script>

<template>
    <section class="flex h-18 py-6 border-b border-b-border-primary dark:border-b-dark-border-primary">
        <ButtonToggle />

        <header class="flex items-center gap-4 py-3 px-6 text-black dark:text-white" v-if="selectedClient">
            <div
                class="w-12 h-12 rounded-full bg-cover bg-center flex-shrink-0"
                :style="{ backgroundImage: 'url(' + selectedClient.avatar + ')' }"
                :aria-label="selectedClient.name + ' avatar'"
            ></div>
            <div>
                <span class="font-bold md:text-xl xs:text-md"> {{ selectedClient.name }}</span>
                <p class="text-primary dark:text-dark-primary">Online</p>
            </div>
        </header>
        <ButtonDarkMode />
    </section>
</template>
<script lang="ts" setup>
    import { inject } from 'vue';
    import User from '@/types/Users';
    import ButtonToggle from '../Buttons/ButtonToggle.vue';
    import ButtonDarkMode from '../Buttons/ButtonDarkMode.vue';

    const selectedClient: User | undefined = inject('selectedClient');
</script>

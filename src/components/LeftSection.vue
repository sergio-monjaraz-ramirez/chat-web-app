<template>
    <section class="w-full h-[94vh] px-4 border-r-1 border-r-border-primary dark:border-r-dark-border-primary">
        <ul class="list-none m-0 p-0 w-full" role="list">
            <li
                v-for="(user, index) in users"
                :key="index"
                @click="selectConversation(index)"
                role="listitem"
                tabindex="0"
                @keydown.enter="selectConversation(index)"
            >
                <UserCard :key="index" :selected="selectedConversationIndex === index" :user="user" />
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
    import { inject, ref } from 'vue';
    import UserCard from '@/components/Cards/UserCard.vue';
    import User from '@/types/Users';

    const props = defineProps<{
        conversations?: any[];
        users: User[];
    }>();

    const selectedConversationIndex = ref<number | null>(null);
    const selectedClient: any = inject('selectedClient');

    const selectConversation = (index: number) => {
        selectedConversationIndex.value = index;
        selectedClient.value = props.users[index];

        setTimeout(() => {
            // Focus the message input on chat open mobile
            const input = document.getElementById('text-type-area');
            if (input) (input as HTMLTextAreaElement).focus();
        }, 300);
    };
</script>

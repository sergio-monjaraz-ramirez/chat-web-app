<template>
    <section class="w-full h-[95vh] px-4 border-r-1 border-r-border-primary">
        <ul class="list-none m-0 p-0 w-full" role="list">
            <li
                v-for="(conv, index) in conversations"
                :key="conv.id"
                @click="selectConversation(index)"
                role="listitem"
                tabindex="0"
                @keydown.enter="selectConversation(index)"
            >
                <UserCard :key="index" :selected="selectedConversationIndex === index" :conversation="conv" />
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
    import { inject, ref } from 'vue';
    import UserCard from '@/components/Cards/UserCard.vue';

    const props = defineProps<{
        conversations: any[];
    }>();

    const selectedConversationIndex = ref<number | null>(null);
    const currentConversation: any = inject('selectedConversation');

    const selectConversation = (index: number) => {
        selectedConversationIndex.value = index;
        props.conversations[index].unreadCount = 0;
        currentConversation.value = props.conversations[index];
        setTimeout(() => {
            // Focus the message input on chat open mobile
            const input = document.getElementById('text-type-area');
            if (input) (input as HTMLTextAreaElement).focus();
        }, 300);
    };
</script>

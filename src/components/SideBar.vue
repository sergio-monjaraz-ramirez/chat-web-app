<template>
    <div
        :class="[
            'fixed inset-y-0 left-0 z-30 w-9/12 transform rounded-r-2xl bg-white transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : '-translate-x-full',
        ]"
    >
        <section class="h-screen mt-10 bg-white text-white flex flex-col">
            <ul class="list-none p-5 w-full" role="list">
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
        <button
            @click="$emit('onToogle')"
            class="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
            aria-label="Close sidebar"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
    <div v-if="isOpen" class="fixed inset-0 z-20 bg-black opacity-50 md:hidden" @click="$emit('onToogle')"></div>
</template>

<script lang="ts" setup>
    import { inject, ref } from 'vue';
    import UserCard from './Cards/UserCard.vue';

    const selectedConversationIndex = ref<number | null>(null);
    const currentConversation: any = inject('selectedConversation');

    defineEmits(['onToogle']);

    const props = defineProps<{
        isOpen: Boolean;
        conversations: any[];
    }>();

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

    // No script logic for now
</script>

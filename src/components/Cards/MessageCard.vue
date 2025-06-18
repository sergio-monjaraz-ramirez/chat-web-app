<template>
    <div
        :class="[
            'relative inline-block max-w-[30%] min-w-[8%] py-3 px-4 rounded-2xl mb-3 mr-5 leading-snug',
            getClassByUserType(message.typeUser),
        ]"
        :aria-label="message.typeUser === 'Client' ? 'You' : selectedClient.name"
    >
        <div class="mb-2">{{ message.type == 'text' ? message.text : 'Attached file' }}</div>
        <div class="text-xs absolute bottom-1 right-3" aria-hidden="true">
            {{ formatTimestamp(message.createdAt) }}
        </div>
    </div>
</template>
<script setup lang="ts">
    import Message from '@/types/Message';
    import { inject } from 'vue';
    import { formatTimestamp } from '@/utils/Conversations';

    defineProps<{
        message: Message;
    }>();
    const selectedClient: any = inject('selectedClient');

    const getClassByUserType = (userType: 'User' | 'Client' | 'UserSystem') => {
        if (userType === 'User') return 'bg-[#3795bd] dark:bg-[#323232] text-white self-start animate-slideInLeft';
        if (userType === 'Client') return 'bg-white dark:bg-dark-primary self-end dark:text-white animate-slideInRight';
        return 'bg-gray-400 dark:bg-gray-600 text-white self-center animate-slideInLeft';
    };
</script>

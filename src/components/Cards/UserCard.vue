<template>
    <div
        :class="[
            'flex items-center text-black dark:text-gray-100 py-3 px-4 cursor-pointer transition-colors duration-150 dark:bg-dark-border-primary dark:hover:bg-dark-secondary bg-gray-100 hover:bg-gray-200 my-2.5 rounded-xl',
            { '!bg-primary dark:!bg-dark-primary text-gray-100': selected },
        ]"
    >
        <div
            class="w-9 h-9 rounded-full bg-cover bg-center mr-3 flex-shrink-0"
            :style="{ backgroundImage: 'url(' + user.avatar + ')' }"
            :aria-label="user.name + ' avatar'"
        ></div>

        <div class="flex-1 min-w-0">
            <div class="font-semibold text-base whitespace-nowrap overflow-ellipsis overflow-hidden">
                {{ user.name }}
            </div>
            <!-- <div class="text-xs whitespace-nowrap overflow-ellipsis overflow-hidden mt-1">
                {{ convLastMessagePreview(conversation) }}
            </div> -->
        </div>
        <!-- <div class="text-xs text-gray-400 ml-2 flex-shrink-0" aria-label="Last message time">
            {{ convLastMessageTime(conversation) }}
        </div> -->
        <!-- <div
            v-if="conversation.unreadCount > 0"
            class="bg-primary dark:bg-dark-primary text-white text-xs px-2 py-0.5 rounded-full ml-1 flex-shrink-0 min-w-[24px] text-center"
            aria-label="Unread messages count"
        >
            {{ conversation.unreadCount }}
        </div> -->
    </div>
</template>
<script lang="ts" setup>
    import { formatTimestamp } from '@/utils/Conversations';
    import User from '@/types/Users';

    defineProps<{
        selected?: boolean;
        user: User;
    }>();

    const convLastMessagePreview = (conv: any) => {
        const lastMsg = conv.messages[conv.messages.length - 1];
        if (!lastMsg) return '';
        return lastMsg.text.length > 30 ? lastMsg.text.substring(0, 27) + '...' : lastMsg.text;
    };
    const convLastMessageTime = (conv: any) => {
        const lastMsg = conv.messages[conv.messages.length - 1];
        if (!lastMsg) return '';
        return formatTimestamp(lastMsg.timestamp);
    };
</script>

<template>
    <div class="w-full border-b border-b-border-primary dark:border-b-dark-border-primary">
        <HeaderSection />

        <section
            class="flex flex-col h-[84vh] col-span-2 row-span-2"
            role="main"
            tabindex="-1"
            aria-live="polite"
            aria-relevant="additions"
        >
            <section
                class="flex-1 px-6 py-4 bg-secondary dark:bg-[#292929]"
                ref="chatMessages"
                aria-live="polite"
                aria-atomic="false"
                aria-relevant="additions"
                tabindex="0"
                v-if="currentConversation"
            >
                <div class="px-3 py-3">
                    <div
                        class="overflow-y-auto scroll-smooth overflow-x-hidden flex flex-col gap-2 max-h-[69vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                    >
                        <div
                            v-for="msg in currentConversation.messages"
                            :key="msg.id"
                            :class="[
                                'relative inline-block max-w-[70%] p-4 rounded-2xl mb-3 leading-snug',
                                msg.from === 'user'
                                    ? 'bg-white dark:bg-dark-primary self-end dark:text-white animate-slideInRight'
                                    : 'bg-[#3795bd] dark:bg-[#323232] text-white self-start animate-slideInLeft',
                            ]"
                            :aria-label="msg.from === 'user' ? 'You' : currentConversation.user.name"
                        >
                            <div>{{ msg.text }}</div>
                            <div class="text-xs absolute bottom-1 right-3" aria-hidden="true">
                                {{ formatTimestamp(msg.timestamp) }}
                            </div>
                        </div>
                        <div
                            v-if="botTyping"
                            class="flex items-center gap-2 italic text-gray-600 dark:text-gray-200 mt-2 self-start"
                            aria-live="off"
                            aria-hidden="true"
                        >
                            <span>{{ currentConversation.user.name }} is typing</span>
                            <span class="flex gap-1">
                                <span
                                    class="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-50 rounded-full inline-block animate-blink"
                                ></span>
                                <span
                                    class="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-50 rounded-full inline-block animate-blink delay-200"
                                ></span>
                                <span
                                    class="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-50 rounded-full inline-block animate-blink delay-400"
                                ></span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <footer
                class="py-2 px-4 bg-white dark:bg-dark-bg flex items-center gap-2 flex-shrink-0"
                v-if="currentConversation"
                role="form"
                aria-label="Send a message"
            >
                <textarea
                    id="text-type-area"
                    v-model="newMessage"
                    @keydown.enter.prevent="sendMessage"
                    placeholder="Type a message"
                    rows="1"
                    :aria-multiline="true"
                    aria-label="Message input"
                    ref="messageInput"
                    class="resize-none border-none dark:text-white py-3 px-4 rounded-2xl text-base flex-1 outline-offset-2 font-sans max-h-[150px] leading-snug focus:outline-1 focus:outline-primary"
                ></textarea>
                <button
                    :disabled="!canSend"
                    @click="sendMessage"
                    aria-label="Send message"
                    class="bg-primary dark:bg-dark-primary text-white border-none rounded-full w-11 h-11 flex items-center justify-center transition-colors duration-300"
                >
                    <span class="material-icons text-2xl">send</span>
                </button>
            </footer>
            <div v-else>
                <NoMessage />
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
    import { computed, inject, nextTick, ref, watch } from 'vue';
    import { uuidv4, formatTimestamp } from '@/utils/Conversations';
    import HeaderSection from '@/components/HeaderSection.vue';
    import NoMessage from '@/components/NoMessage.vue';

    const botTyping = ref(false);
    const newMessage = ref('');
    const chatMessages = ref<HTMLElement | null>(null);
    const currentConversation: any = inject('selectedConversation');

    // Detect if can send message
    const canSend = computed(() => newMessage.value.trim().length > 0 && !botTyping.value);

    const sendMessage = () => {
        if (!canSend.value || !currentConversation.value) return;
        const txt = newMessage.value.trim();
        newMessage.value = '';
        // Add user message to conversation
        currentConversation.value.messages.push({
            id: uuidv4(),
            from: 'user',
            text: txt,
            timestamp: new Date(),
        });
        // Show typing indicator
        botTyping.value = true;

        // Scroll immediately
        scrollChatToBottom();

        // Simulate typing delay, then fetch reply
        setTimeout(async () => {
            // const reply = await fetchOpenAIReply(txt, currentConversation.value);

            currentConversation.value.messages.push({
                id: uuidv4(),
                from: 'bot',
                text: 'Lorem',
                timestamp: new Date(),
            });
            botTyping.value = false;
            scrollChatToBottom();
        }, 1200);
    };

    const scrollChatToBottom = () => {
        nextTick(() => {
            if (chatMessages.value) {
                chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
                console.log(chatMessages.value.offsetHeight);
            }
        });
    };
    watch(
        () => currentConversation.value && currentConversation.value.messages.length,
        () => {
            scrollChatToBottom();
        },
    );
</script>

<style scoped>
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(40px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-40px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes blink {
        0%,
        80%,
        100% {
            opacity: 0;
        }
        40% {
            opacity: 1;
        }
    }
    .animate-slideInRight {
        animation: slideInRight 0.3s ease forwards;
    }
    .animate-slideInLeft {
        animation: slideInLeft 0.3s ease forwards;
    }
    .animate-blink {
        animation: blink 1.4s infinite both;
    }
    .delay-200 {
        animation-delay: 0.2s;
    }
    .delay-400 {
        animation-delay: 0.4s;
    }
</style>

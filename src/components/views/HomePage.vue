<template>
    <MainLayout class="@container">
        <SideBar :is-open="openSideBar" @onToogle="openSideBar = false" :conversations="conversations" />
        <LeftSection class="@xs:hidden @md:flex" :conversations="conversations" />
        <RightSection />
    </MainLayout>
</template>

<script setup lang="ts">
    import { provide, reactive, ref } from 'vue';
    import MainLayout from '@/layouts/MainLayout.vue';
    import LeftSection from '@/components/LeftSection.vue';
    import RightSection from '@/components/RightSection.vue';
    import SideBar from '@/components/SideBar.vue';
    import type User from '@/types/Users';
    import { uuidv4 } from '@/utils/Conversations';

    const selectConversation = ref();
    const openSideBar = ref(false);
    const users: Array<User> = [
        {
            _id: '629a8125b2d313190810212f',
            name: 'Pedro Naranjo',
            createdAt: '1654292773900',
            updatedAt: '1657150137370',
            avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c3a1e1e8-cf43-4e5d-9a71-a2cf9ac9e197.png',
        },
        {
            _id: '629e39e8b2d31319081e0650',
            name: 'Diego O',
            createdAt: '1654617133986',
            updatedAt: '1659028266305',
            avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0c04a57e-703b-46aa-b4cf-28bf5a19243b.png',
        },
    ];

    const conversations = reactive([
        {
            id: 'c1',
            user: users[0],
            messages: [
                {
                    id: uuidv4(),
                    from: 'bot',
                    text: 'Hey! How can I help you today?',
                    timestamp: new Date(Date.now() - 1000 * 3600 * 3),
                },
                {
                    id: uuidv4(),
                    from: 'user',
                    text: 'Hi Alice! Can you tell me about your hiking trip?',
                    timestamp: new Date(Date.now() - 1000 * 3600 * 2.5),
                },
                {
                    id: uuidv4(),
                    from: 'bot',
                    text: 'Sure! It was amazing, lots of trails and beautiful vistas.',
                    timestamp: new Date(Date.now() - 1000 * 3600 * 2),
                },
                {
                    id: uuidv4(),
                    from: 'bot',
                    text: 'Hey! How can I help you today?',
                    timestamp: new Date(Date.now() - 1000 * 3600 * 3),
                },
                {
                    id: uuidv4(),
                    from: 'user',
                    text: 'Hi Alice! Can you tell me about your hiking trip?',
                    timestamp: new Date(Date.now() - 1000 * 3600 * 2.5),
                },
                {
                    id: uuidv4(),
                    from: 'bot',
                    text: 'Sure! It was amazing, lots of trails and beautiful vistas.',
                    timestamp: new Date(Date.now() - 1000 * 3600 * 2),
                },
                {
                    id: uuidv4(),
                    from: 'bot',
                    text: 'Hey! How can I help you today?',
                    timestamp: new Date(Date.now() - 1000 * 3600 * 3),
                },
                {
                    id: uuidv4(),
                    from: 'user',
                    text: 'Hi Alice! Can you tell me about your hiking trip?',
                    timestamp: new Date(Date.now() - 1000 * 3600 * 2.5),
                },
                {
                    id: uuidv4(),
                    from: 'bot',
                    text: 'Sure! It was amazing, lots of trails and beautiful vistas.',
                    timestamp: new Date(Date.now() - 1000 * 3600 * 2),
                },
            ],
            unreadCount: 0,
        },
        {
            id: 'c2',
            user: users[1],
            messages: [
                {
                    id: uuidv4(),
                    from: 'bot',
                    text: 'Hey, want to play the new game tonight?',
                    timestamp: new Date(Date.now() - 1000 * 3600 * 5),
                },
                {
                    id: uuidv4(),
                    from: 'user',
                    text: 'Absolutely! Count me in.',
                    timestamp: new Date(Date.now() - 1000 * 3600 * 4.5),
                },
            ],
            unreadCount: 1,
        },
    ]);
    provide('selectedConversation', selectConversation);
    provide('toggleSideBar', openSideBar);
</script>

<style scoped></style>

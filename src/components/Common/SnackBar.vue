<template>
    <transition name="snackbar-fade">
        <div v-if="isVisible" class="snackbar" :class="type">
            <span>{{ message }}</span>
            <button class="close-btn" @click="close">&times;</button>
        </div>
    </transition>
</template>

<script setup>
    import { useSnackBar } from '@/composables/useSnackBar';

    const props = defineProps({
        message: { type: String, required: true },
        type: { type: String, default: 'info' }, // info, success, error, warning
        duration: { type: Number, default: 3000 },
    });

    const { isVisible, type, message } = useSnackBar();

    const close = () => {
        isVisible.value = false;
    };
</script>

<style scoped>
    .snackbar {
        position: fixed;
        left: 50%;
        bottom: 32px;
        transform: translateX(-50%);
        min-width: 240px;
        max-width: 90vw;
        padding: 16px 24px;
        border-radius: 4px;
        color: #fff;
        background: #323232;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        z-index: 9999;
        font-size: 16px;
    }
    .snackbar.success {
        background: #43a047;
    }
    .snackbar.error {
        background: #e53935;
    }
    .snackbar.warning {
        background: #ffa000;
    }
    .snackbar.info {
        background: #2196f3;
    }
    .close-btn {
        background: transparent;
        border: none;
        color: #fff;
        font-size: 20px;
        margin-left: 16px;
        cursor: pointer;
    }
    .snackbar-fade-enter-active,
    .snackbar-fade-leave-active {
        transition: opacity 0.3s;
    }
    .snackbar-fade-enter-from,
    .snackbar-fade-leave-to {
        opacity: 0;
    }
</style>

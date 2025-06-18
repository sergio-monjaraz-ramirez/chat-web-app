import { ref } from 'vue';

type SnackBarOptions = {
    message: string;
    type: 'info' | 'success' | 'error' | 'warning';
    timeout?: number;
};

const isVisible = ref(false);
const message = ref('');
const timeout = ref(3000);
const type = ref<'info' | 'success' | 'error' | 'warning'>('info');
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

function showSnackBar(options: SnackBarOptions) {
    message.value = options.message;
    type.value = options.type;
    timeout.value = options.timeout || 3000;
    isVisible.value = true;

    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        isVisible.value = false;
    }, timeout.value);
}

function hideSnackBar() {
    isVisible.value = false;
    if (hideTimeout) clearTimeout(hideTimeout);
}

export function useSnackBar() {
    return {
        isVisible,
        type,
        message,
        timeout,
        showSnackBar,
        hideSnackBar,
    };
}

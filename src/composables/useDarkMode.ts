import { ref, onMounted } from 'vue';

const isDark = ref(false);

export function useDarkMode() {
    const toggleDark = () => {
        isDark.value = !isDark.value;
        updateHtmlClass();
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    };

    const updateHtmlClass = () => {
        document.documentElement.classList.toggle('dark', isDark.value);
    };

    const initialize = () => {
        const saved = localStorage.getItem('theme');
        if (saved) {
            isDark.value = saved === 'dark';
        }

        // else {
        //     // fallback to system preference
        //     isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // }
        updateHtmlClass();
    };

    onMounted(() => {
        initialize();
    });

    return {
        isDark,
        toggleDark,
    };
}

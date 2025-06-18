/* eslint-disable @typescript-eslint/no-explicit-any */
import HeaderSection from '@/components/Sections/HeaderSection.vue';
import { fireEvent, render } from '@testing-library/vue';
import { nextTick, ref } from 'vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock composable
const mockToggleDark = vi.fn();
vi.mock('@/composables/useDarkMode', () => ({
    useDarkMode: () => ({
        isDark: false,
        toggleDark: mockToggleDark,
    }),
}));

const mockToggleSideBar = vi.fn();
const mockSelectedClient = {
    _id: 'client1',
    name: 'Test User',
    avatar: 'https://example.com/avatar.png',
};

function createWrapper(selectedClientValue: any = {}) {
    return render(HeaderSection, {
        global: {
            provide: {
                toggleSideBar: mockToggleSideBar,
                selectedClient: ref(selectedClientValue),
            },
        },
    });
}

describe('HeaderSection.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders sidebar toggle button', () => {
        const wrapper = createWrapper(mockSelectedClient);
        expect(wrapper.getByTestId('toggle-sidebar-button')).toBeTruthy();
    });

    it('renders dark mode button', () => {
        const wrapper = createWrapper(mockSelectedClient);
        expect(wrapper.getByTestId('dark-mode-button')).toBeTruthy();
    });

    it('renders header with client info if selectedClient is provided', () => {
        const wrapper = createWrapper(mockSelectedClient);
        expect(wrapper.html()).toContain('Test User');
        expect(wrapper.container.querySelector('header')).toBeTruthy();
        const innerDiv = wrapper.container.querySelector('div[aria-label="Test User avatar"]') as HTMLElement;
        expect(innerDiv).toBeTruthy();
    });

    it('does not render header if selectedClient is undefined', () => {
        const wrapper = createWrapper(null);
        expect(wrapper.container.querySelector('header')).toBeFalsy();
    });

    it('calls toggleDark when dark mode button is clicked', async () => {
        const wrapper = createWrapper(mockSelectedClient);
        const toggleDarkButton = wrapper.getByTestId('dark-mode-button') as HTMLButtonElement;
        await fireEvent.click(toggleDarkButton);
        await nextTick();
        expect(mockToggleDark).toHaveBeenCalled();
    });

    it('shows sun icon when isDark is false', () => {
        const wrapper = createWrapper(mockSelectedClient);
        const toggleDarkButton = wrapper.getByTestId('dark-mode-button') as HTMLButtonElement;
        expect(toggleDarkButton.querySelector('svg')?.outerHTML).toContain('M12 3v1');
    });

    it('shows moon icon when isDark is true', async () => {
        vi.doMock('@/composables/useDarkMode', () => ({
            useDarkMode: () => ({
                isDark: true,
                toggleDark: mockToggleDark,
            }),
        }));
        vi.resetModules();

        const HeaderSection = (await import('@/components/Sections/HeaderSection.vue')).default;
        const { getByTestId } = render(HeaderSection, {
            global: {
                provide: {
                    toggleSideBar: mockToggleSideBar,
                    selectedClient: ref(mockSelectedClient),
                },
            },
        });
        const toggleDarkButton = getByTestId('dark-mode-button') as HTMLButtonElement;
        expect(toggleDarkButton.querySelector('svg')?.outerHTML).toContain('M21 12.79');
    });
});

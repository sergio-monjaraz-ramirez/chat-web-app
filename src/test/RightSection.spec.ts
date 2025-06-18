/* eslint-disable @typescript-eslint/no-explicit-any */
import { flushPromises } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import RightSection from '@/components/Sections/RightSection.vue';
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';

// Mock dependencies
vi.mock('@/services/conversationApiClient', () => ({
    default: {
        getAll: vi.fn().mockResolvedValue([
            {
                _id: '1',
                type: 'Message',
                client: 'client1',
                message: {
                    _id: 'm1',
                    type: 'text',
                    typeUser: 'User',
                    text: 'Hello',
                    user: '',
                    createdAt: '2024-01-01',
                    updatedAt: '2024-01-01',
                    deliveredAt: '2024-01-01',
                    readAt: '',
                },
                createdAt: '2024-01-01',
            },
        ]),
    },
}));

function createWrapper(selectedClientValue: any = null) {
    return render(RightSection, {
        global: {
            provide: {
                selectedClient: ref(selectedClientValue),
            },
            stubs: {
                NoMessage: {
                    template: '<div>NoMessage</div>',
                },
                HeaderSection: {
                    template: '<div>HeaderSection</div>',
                },
            },
        },
    });
}

describe('RightSection.vue', () => {
    it('renders NoMessage when no client is selected', () => {
        const { getByTestId, queryByRole } = render(RightSection, {
            global: {
                provide: {
                    selectedClient: ref(null),
                },
                stubs: {
                    HeaderSection: {
                        template: '<div>HeaderSection</div>',
                    },
                },
            },
        });
        expect(getByTestId('no-message')).toBeInTheDocument();
        expect(queryByRole('textbox')).toBeNull();
    });

    it('renders chat UI when client is selected', async () => {
        const client = { _id: 'client1', name: 'ClientName' };
        const wrapper = createWrapper(client);
        await flushPromises();
        expect(wrapper.getByRole('textbox')).toBeTruthy();
        expect(wrapper.getByRole('button', { name: 'Send message' })).toBeTruthy();
        expect(wrapper.html()).toContain('HeaderSection');
    });

    it('updates newMessage when typing', async () => {
        const client = { _id: 'client1', name: 'ClientName' };
        const wrapper = createWrapper(client);
        await flushPromises();
        const textarea = wrapper.getByRole('textbox') as HTMLTextAreaElement;
        await textarea.dispatchEvent(new Event('input'));
        textarea.value = 'Test message';
        await textarea.dispatchEvent(new Event('input'));
        expect(textarea.value).toBe('Test message');
    });

    it('send button is disabled when input is empty', async () => {
        const client = { _id: 'client1', name: 'ClientName' };
        const wrapper = createWrapper(client);
        await flushPromises();
        const button = wrapper.getByRole('button', { name: 'Send message' }) as HTMLButtonElement;
        expect(button.disabled).toBe(true);
    });

    it('send button is enabled when input is not empty', async () => {
        const client = { _id: 'client1', name: 'ClientName' };
        const wrapper = createWrapper(client);
        let button = wrapper.getByRole('button', { name: 'Send message' }) as HTMLButtonElement;
        expect(button.disabled).toBe(true);
        const textarea = wrapper.getByRole('textbox') as HTMLTextAreaElement;
        textarea.value = 'Hello';
        await textarea.dispatchEvent(new Event('input'));
        await nextTick();
        button = wrapper.getByRole('button', { name: 'Send message' }) as HTMLButtonElement;
        expect(button.disabled).toBe(false);
    });

    it('sending a message adds it to conversation and shows bot typing', async () => {
        vi.useFakeTimers();
        const client = { _id: 'client1', name: 'ClientName' };
        const wrapper = createWrapper(client);
        const textarea = wrapper.getByRole('textbox') as HTMLTextAreaElement;
        textarea.value = 'Hi there';
        await textarea.dispatchEvent(new Event('input'));
        await nextTick();
        const button = wrapper.getByRole('button', { name: 'Send message' }) as HTMLButtonElement;
        await button.click();

        expect(wrapper.html()).toContain('is typing');
        vi.runAllTimers();
        await flushPromises();
        await nextTick();
        expect(wrapper.html()).not.toContain('is typing');
        vi.useRealTimers();
        expect(wrapper.html()).toContain('Hi there');
    });
});

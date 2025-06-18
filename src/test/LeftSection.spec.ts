import { render } from '@testing-library/vue';
import LeftSection from '@/components/Sections/LeftSection.vue';
import { describe, it, expect } from 'vitest';
import Users from '@/types/Users';
import { ref } from 'vue';

const testSelectors = {
    leftSection: 'left-section',
    userCard: 'user-card',
    skeletonCard: 'skeleton-card',
};

const users: Users[] = [
    {
        _id: '629a8125b2d313190810212f',
        name: 'Pedro Naranjo',
        createdAt: '1654292773900',
        updatedAt: '1657150137370',
    },
    {
        _id: '629e39e8b2d31319081e0650',
        name: 'Diego O',
        createdAt: '1654617133986',
        updatedAt: '1659028266305',
    },
];

describe('LeftSection Component', () => {
    it('render leftSection component', () => {
        const { getByTestId } = render(LeftSection, {
            global: {
                provide: {
                    selectedClient: ref(null),
                },
            },
            props: { users: [] },
        });

        expect(getByTestId(testSelectors.leftSection)).toBeInTheDocument();
    });

    it('render the skeleton card when users prop is empty', () => {
        const { getByTestId, getAllByTestId } = render(LeftSection, {
            global: {
                provide: {
                    selectedClient: ref(null),
                },
            },
            props: { users: [] },
        });

        expect(getByTestId(testSelectors.skeletonCard)).toBeInTheDocument();
        expect(getAllByTestId(testSelectors.skeletonCard).length).toBe(1);
    });

    it('render a list of users', () => {
        const { getAllByTestId } = render(LeftSection, {
            global: {
                provide: {
                    selectedClient: ref(null),
                },
            },
            props: { users: users },
        });
        const usersRendered = getAllByTestId(testSelectors.userCard);
        expect(usersRendered.length).toBe(users.length);
        expect(usersRendered[0]).toHaveTextContent(users[0].name);
    });
});

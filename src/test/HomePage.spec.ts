import { render, screen } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import HomePage from '@/components/views/HomePage.vue';

window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === '(prefers-color-scheme: dark)',
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
}));

describe('HomePage', () => {
    it('renders the HomePage component', () => {
        render(HomePage);
        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('displays the welcome message', () => {
        render(HomePage);
        expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
});

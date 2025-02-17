import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../NotFound/NotFoundPage';

describe('NotFoundPage Component', () => {
    test('renders 404 page correctly', () => {
        render(
            <BrowserRouter>
                <NotFoundPage />
            </BrowserRouter>
        );

        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText('Page Not Found')).toBeInTheDocument();
        expect(screen.getByText('Sorry, the page you are looking for could not be found.')).toBeInTheDocument();
        expect(screen.getByText('Return Home')).toBeInTheDocument();
    });
});

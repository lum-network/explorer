import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
    it('Check if the app is correctly rendered', async () => {
        render(<App />);

        // Checks if SKR and DFract card are rendered to ensure home page is rendered
        const dfractCard = screen.getByText('DFract');
        const skrCard = screen.getByText('Skeepers Rewards');

        expect(dfractCard).toBeInTheDocument();
        expect(skrCard).toBeInTheDocument();
    });
});

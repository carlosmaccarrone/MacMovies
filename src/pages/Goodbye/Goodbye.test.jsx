import { render, screen } from '@testing-library/react';
import Goodbye from '@/pages/Goodbye/Goodbye';

describe('Goodbye Component', () => {
  test('renders the goodbye message', () => {
    render(<Goodbye />);
    
    // check that the text is in the document
    const message = screen.getByText(/Greetings from Carlos Maccarrone/i);
    expect(message).toBeInTheDocument();
  });
});
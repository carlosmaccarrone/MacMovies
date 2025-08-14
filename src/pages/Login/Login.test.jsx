import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';

// mock the subcomponents so as not to depend on their implementation
await jest.unstable_mockModule('@/pages/Login/LoginSidebar', () => ({
  default: () => <div data-testid="login-sidebar">Sidebar</div>,
}));

await jest.unstable_mockModule('@/pages/Login/LoginForm', () => ({
  default: () => <div data-testid="login-form">Form</div>,
}));

/*// mock CSS modules (just so they don't break on import)
await jest.unstable_mockModule('@/pages/Login/Login.module.css', () => ({
  default: {
    loginContainer: 'loginContainer',
    sidebarWrapper: 'sidebarWrapper',
    loginFormWrapper: 'loginFormWrapper',
  },
}));*/

// import the component with the mocks already applied
const { default: Login } = await import('@/pages/Login/Login.jsx');

describe('Login', () => {
  test('renders without crashing and contains the subcomponents', async () => {
    render(<Login />);
    expect(await screen.getByTestId('login-sidebar')).toBeInTheDocument();
    expect(await screen.getByTestId('login-form')).toBeInTheDocument();
/*    // verify the existence of the main containers if you mock CSS modules of lacking identity-obj-proxy lib
    const container = document.querySelector('.loginContainer');
    expect(container).toBeInTheDocument();

    const sidebarWrapper = document.querySelector('.sidebarWrapper');
    expect(sidebarWrapper).toBeInTheDocument();

    const formWrapper = document.querySelector('.loginFormWrapper');
    expect(formWrapper).toBeInTheDocument();

    // Verificamos que los subcomponentes aparezcan
    expect(screen.getByTestId('login-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();*/
  });

  test('DOM structure maintains the order sidebar >>> form', () => {
    render(<Login />);
    const container = document.querySelector('.loginContainer');

    const firstChild = container.firstChild;
    const lastChild = container.lastChild;

    expect(firstChild).toHaveClass('sidebarWrapper');
    expect(lastChild).toHaveClass('loginFormWrapper');
  });
});
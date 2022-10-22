import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('App', async () => {
  const app = render(<MemoryRouter initialEntries={['/internal/user-only']}>
    <App />
  </MemoryRouter>);
  const appDiv = document.getElementsByClassName('app');
  expect(appDiv.length).toBe(1);
  const welcome = await app.findAllByText('articles by Utticus');
  expect(welcome.length).toBe(1);
});

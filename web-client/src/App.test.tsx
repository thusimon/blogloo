import { render } from '@testing-library/react';
import App from './App';

test('App', () => {
  render(<App />);
  const appDiv = document.getElementsByClassName('App')
  expect(appDiv.length).toBe(1);
});

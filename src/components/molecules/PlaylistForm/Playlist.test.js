import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlaylistForm from './index';

test('form should receive title & description input', () => {
  render(<PlaylistForm />);
  const inputTitle = screen.getByPlaceholderText(/title/i);
  const inputDesc = screen.getByPlaceholderText(/description/i);

  userEvent.type(inputTitle, "this is a title");
  userEvent.type(inputDesc, "this is a description");

  expect(inputTitle).toHaveValue("this is a title");
  expect(inputDesc).toHaveValue("this is a description");
});
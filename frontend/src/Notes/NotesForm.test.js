import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NoteForm from './NotesForm';
import userEvent from '@testing-library/user-event';
import { ToastContainer } from 'react-toastify';

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const onAddNote = jest.fn();
  const user = userEvent.setup();

  render(<NoteForm onAddNote={onAddNote} user={jest.mock()} />);

  const input = screen.getByPlaceholderText('Write here note content');
  const sendButton = screen.getByText('SAVE');

  await user.type(input, 'testing a form...');
  await user.click(sendButton);

  expect(onAddNote).toHaveBeenCalled();
  expect(onAddNote.mock.calls).toHaveLength(1);
  expect(onAddNote.mock.calls[0][0].content).toBe('testing a form...');
});

test('<NoteForm /> does not update parent state and calls onSubmit when user is null and toast', async () => {
  const onAddNote = jest.fn();
  const user = userEvent.setup();

  render(
    <div>
      <ToastContainer />
      <NoteForm onAddNote={onAddNote} user={null} />
    </div>
  );

  const input = screen.getByPlaceholderText('Write here note content');
  const sendButton = screen.getByText('SAVE');

  await user.type(input, 'testing a form...');
  await user.click(sendButton);

  expect(onAddNote.mock.calls).toHaveLength(0);

  expect(await screen.findByText('Must be logged in')).toBeInTheDocument();
});
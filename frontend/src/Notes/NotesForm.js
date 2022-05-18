import { useState } from 'react';
import { toast } from 'react-toastify';

const NotesForm = ({ onAddNote, user }) => {
  const [noteContent, setNoteContent] = useState('');
  const [noteImportant, setNoteImportant] = useState(false);

  const addNote = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Must be logged in');
      return;
    }

    const newNote = {
      content: noteContent,
      date: new Date(Date.now()).toISOString(),
      important: noteImportant
    };

    onAddNote(newNote);
  };

  return (
    <div>
      <h3>Create Note</h3>
      <form onSubmit={addNote}>
        <div>
          Note:
          <input
            type="text"
            value={noteContent}
            onChange={(e) => { setNoteContent(e.target.value); }}
            placeholder='Write here note content' />
        </div>
        <div>
          Important:
          <input type="checkbox" checked={noteImportant} onChange={(e) => { setNoteImportant(e.target.checked); }} />
        </div>
        <button type="submit">SAVE</button>
      </form>
    </div>
  );
};

export default NotesForm;
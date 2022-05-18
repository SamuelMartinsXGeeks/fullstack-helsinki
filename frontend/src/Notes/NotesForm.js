import { useState, useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
import { toast } from 'react-toastify';

const NotesForm = ({ onAddNote }) => {
  const [noteContent, setNoteContent] = useState('');
  const [noteImportant, setNoteImportant] = useState(false);
  const [user] = useContext(UserContext);

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
          <input type="text" value={noteContent} onChange={(e) => { setNoteContent(e.target.value); }} />
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
import React from 'react';
import Note from './Note';
import { useState, useEffect, useContext, useRef } from 'react';
import noteService from '../Services/notes';
import '../styles/notes.css';
import { UserContext } from '../Contexts/UserContext';
import { toast } from 'react-toastify';
import NotesForm from './NotesForm';
import Togglable from '../Util/Togglable';

const Notes = () => {
  const [showAll, setShowAll] = useState(true);
  const [notes, setNotes] = useState([]);
  const [user] = useContext(UserContext);
  const noteFormRef = useRef();

  useEffect(() => {
    if (user) {
      noteService.setToken(user.token);

      noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes);
        }).catch(error => {
          toast.error('Error fetching notes!');
          console.log(error);
        });
    } else {
      setNotes([]);
    }
  }, [user]);

  const addNote = (newNote) => {
    noteFormRef.current.toggleVisibility();
    noteService
      .create(newNote)
      .then(returnedNote => setNotes(notes.concat(returnedNote)))
      .catch(error => {
        toast.error('Error adding note!');
        console.log(error);
      });
  };

  const toggleNoteImportant = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      }).catch(error => {
        toast.error(`That note '${note.content}' was already deleted from server`);
        console.log(error);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const deleteNote = (id) => {
    noteService.remove(id).then(response => {
      if (response.status === 204) {
        setNotes(notes.filter(n => n.id !== id));
      }
    }).catch(error => {
      toast.error('Error deleting note!');
      console.log(error);
    });
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  return (
    <div>
      <div>
        <h2>Notes</h2>
        <ul>
          {notesToShow.map(note =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleNoteImportant(note.id)}
              onClickDelete={() => deleteNote(note.id)}
            />
          )}
        </ul>
        <label>Show All:</label>
        <input type="checkbox" checked={showAll} onChange={(e) => { setShowAll(e.target.checked); }} />
      </div>
      <Togglable buttonLabel='Create Note' ref={noteFormRef}>
        <NotesForm onAddNote={addNote} user={user} />
      </Togglable>
    </div>
  );
};

export default Notes;
import React from "react";
import Note from "./Note";
import { useState, useEffect } from "react";
import noteService from "../Services/notes";

const Notes = () => {

  const defaultNote = {
    id: null,
    content: '',
    date: new Date(Date.now()).toISOString(),
    important: false
  };

  const [newNote, setNewNote] = useState(defaultNote);
  const [showAll, setShowAll] = useState(true);
  const [notes, setNotes] = useState([]);

  //Since the second parameter is [] the effect is only ran on the first render.
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault();
    noteService
      .create(newNote)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote(defaultNote)
      })
  }

  const onNewNoteContentChange = (event) => {
    let changedNote = newNote;
    changedNote = {
      id: notes.length + 1,
      content: event.target.value,
      date: new Date(Date.now()).toISOString(),
      important: newNote.important
    }
    setNewNote(newNote => ({ ...newNote, ...changedNote }));
  }

  const onNewNoteImportantChange = (event) => {
    let changedNote = newNote;
    changedNote = {
      id: notes.length + 1,
      content: newNote.content,
      date: new Date(Date.now()).toISOString(),
      important: !event.target.checked
    }
    setNewNote(newNote => ({ ...newNote, ...changedNote }));
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      }).catch(error => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter(n => n.id !== id));
      });
  }

  const deleteNote = (id) => {
    noteService.remove(id).then(response => {
      if (response.status === 200) {
        setNotes(notes.filter(n => n.id !== id));
      }
    })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  return (
    <div>
      <h4>-- Component: Notes</h4>
      <div>
        <h2>Notes</h2>
        <ul>
          {notesToShow.map(note =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
              onClickDelete={() => deleteNote(note.id)}
            />
          )}
        </ul>
        <label>Show All:</label>
        <input type="checkbox" value={showAll} onClick={(e) => { setShowAll(e.target.checked) }} />
      </div>
      <h3>Create Note</h3>
      <form onSubmit={addNote}>
        <div>
          Note:
          <input type="text" value={newNote.content} onChange={onNewNoteContentChange} />
        </div>
        <div>
          Important:
          <input type="checkbox" value={newNote.important} onClick={onNewNoteImportantChange} />
        </div>
        <button type="submit">SAVE</button>
      </form>
    </div>
  );
}

export default Notes;
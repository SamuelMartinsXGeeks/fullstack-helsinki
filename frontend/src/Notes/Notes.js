import React from "react";
import Note from "./Note";
import { useState, useEffect } from "react";
import noteService from "../Services/notes";
import loginService from '../Services/login'

const Notes = () => {

  const defaultNote = {
    id: null,
    content: '',
    date: new Date(Date.now()).toISOString(),
    important: false,
    user: ''
  };

  const [newNote, setNewNote] = useState(defaultNote);
  const [showAll, setShowAll] = useState(true);
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      //alert("Login Successfull")
      noteService.setToken(user.token);

      //Store user data.
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

      const userNotes = await noteService.getAll()
      setNotes(userNotes);

    } catch (exception) {
      //alert("Login Error.")
      console.log(exception);
      //setErrorMessage('Wrong credentials')
      setTimeout(() => {
        //setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)

      noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes);
        })
    }
  }, [])

  const addNote = (event) => {
    event.preventDefault();

    if (!user) {
      alert("Must be logged in");
      return;
    }

    console.log(user);

    newNote.user = user.id;

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
      if (response.status === 204) {
        setNotes(notes.filter(n => n.id !== id));
      }
    })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  return (
    <div>
      <div>
        <h2>Notes</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>

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
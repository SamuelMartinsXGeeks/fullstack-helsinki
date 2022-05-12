//const http = require('http')

/* const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
}) */

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: false
  },
  {
    id: 4,
    content: "Cats are awesome",
    date: "2022-03-30T19:20:14.298Z",
    important: true
  }
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const id = +request.params.id;
  const note = notes.find(note => note.id === id);
  response.json(note);
});

app.put('/api/notes/:id', (request, response) => {
  const id = +request.params.id;

  let existingNote = notes.find(note => note.id === id);

  if (!existingNote) {
    return response.status(400).json({
      error: 'Note not found'
    })
  }

  if (!request.body) {
    return response.status(400).json({
      error: 'Must provide anything to update on note'
    })
  }

  const body = request.body;

  if (body.content && typeof body.content === 'string') {
    existingNote.content = body.content;
  }

  if (typeof body.important === 'boolean') {
    existingNote.important = body.important;
  }

  if (body.date && typeof body.date === 'string' && !isNaN(Date.parse(body.date))) {
    existingNote.date = body.date;
  }

  notes = notes.map(note => note.id === id ? existingNote : note);

  response.json(existingNote);
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
});

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    id: generateId(),
    content: body.content,
    date: new Date(Date.now()),
    important: body.important || false,
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
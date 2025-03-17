const express = require('express');
const app = express();

app.use(express.json());

// Initialize books array with the initial book
let books = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    details: [
      {
        id: "1",
        author: "Harper Lee",
        genre: "Fiction",
        publicationYear: 1960
      }
    ]
  }
];

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

// Routes
app.get('/whoami', (req, res) => {
  res.json({ studentNumber: '2660980' });
});

app.get('/books', (req, res) => {
  if (books.length === 0) {
    return res.status(404).json({ error: 'No books found' });
  }
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(book => book.id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(book);
}   );

app.post('/books', (req, res) => {
if(!req.body.id) {
    return res.status(400).json({ error: 'Missing Book Id' });
    }
if(!req.body.title){
    return res.status(400).json({ error: 'Missing Book Title' });
}
if(!req.body.details) {
    return res.status(400).json({ error: 'Missing Book Details' });
}
if(!req.body.details[0].id) {
    return res.status(400).json({ error: 'Missing Book Details Id' });
}
if(!req.body.details[0].author) {
    return res.status(400).json({ error: 'Missing Book Details Author' });
}
if(!req.body.details[0].genre) {
    return res.status(400).json({ error: 'Missing Book Details Genre' });
}
books.push(req.body);
res.status(201).json(req.body);
}
)
app.put('/books/:id', (req, res) => {
  const book = books.find(book => book.id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book Not found' });
  }
  if(!req.body.id) {
    return res.status(400).json({ error: 'Missing Book Id' });
    }
    if(!req.body.title){    
        return res.status(400).json({ error: 'Missing Book Title' });
    }
    if(!req.body.details) {
        return res.status(400).json({ error: 'Missing Book Details' });
    }
    if(!req.body.details[0].id) {
        return res.status(400).json({ error: 'Missing Book Details Id' });
    }
    if(!req.body.details[0].author) {
        return res.status(400).json({ error: 'Missing Book Details Author' });
    }
    if(!req.body.details[0].genre) {
        return res.status(400).json({ error: 'Missing Book Details Genre'
        });
    }
  const index = books.indexOf(book);
  books[index] = req.body;
  res.json(req.body);
}
)

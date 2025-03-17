const express = require('express');
const app = express();

app.use(express.json());


let books = [];


app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});


app.get('/whoami', (req, res) => {
  res.json({ studentNumber: '2660980' });
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(book => book.id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(book);
});

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
});

app.put('/books/:id', (req, res) => {
  const book = books.find(book => book.id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book Not found' });
  }
  if(!req.body.id) {
    return res.status(400).json({ error: 'Missing Required Book Id' });
    }
    if(!req.body.title){    
        return res.status(400).json({ error: 'Missing Required Book Title' });
    }
    if(!req.body.details) {
        return res.status(400).json({ error: 'Missing Required Book Details' });
    }
    if(!req.body.details[0].id) {
        return res.status(400).json({ error: 'Missing Required Book Details Id' });
    }
    if(!req.body.details[0].author) {
        return res.status(400).json({ error: 'Missing Required Book Details Author' });
    }
    if(!req.body.details[0].genre) {
        return res.status(400).json({ error: 'Missing Required Book Details Genre'
        });
    }
  const index = books.indexOf(book);
  books[index] = req.body;
  res.json(req.body);
});

app.delete('/books/:id', (req, res) => {
  const book = books.find(book => book.id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book Not found' });
  }
  books = books.filter(book => book.id !== req.params.id);
  res.json({ message: 'Book deleted' });
});

app.post('/books/:id/details', (req, res) => {
  const book = books.find(book => book.id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book Not found' });
  }
  book.details.push(req.body);
  res.status(201).json(req.body);
});

app.delete('/books/:id/details/:detailId', (req, res) => {
  const book = books.find(book => book.id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book Not found' });
  }
  const detail = book.details.find(detail => detail.id === req.params.detailId);
  if (!detail) {
    return res.status(404).json({ error: 'Details Not found' });
  }
  book.details = book.details.filter(detail => detail.id !== req.params.detailId);
  res.json({ message: 'Details deleted' });
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Something went wrong!' });
    });
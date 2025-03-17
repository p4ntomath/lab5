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

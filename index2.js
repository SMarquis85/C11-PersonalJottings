const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path'); // Add this line to import the 'path' module
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(express.json());

// Serve static files from the 'Develop' folder
app.use(express.static(path.join(__dirname, 'Develop')));

// Initialize db.json with an empty array if it does not exist
const dbFilePath = 'db.json';
if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, '[]', 'utf8', (err) => {
    if (err) {
      console.error(err);
    }
  });
}

// API routes
app.get('/api/notes', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read data from the database.' });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.post('/api/notes', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read data from the database.' });
    }
    const notes = JSON.parse(data);

    const newNote = {
      id: uuidv4(), // Generate a unique ID for the new note
      title: req.body.title,
      text: req.body.text,
    };

    notes.push(newNote);

    fs.writeFile('db.json', JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to write data to the database.' });
      }
      res.json(newNote);
    });
  });
});

// HTML routes
app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

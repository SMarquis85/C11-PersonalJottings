const router = require('express').Router();
const { notes } = require('../../db/db'); // Make sure to provide the correct path to the db file.
const { createNewNote, deleteNote } = require('../../lib/noteFunctions'); // Require the noteFunctions module.

router.get('/notes', (req, res) => {
  let saved = notes;
  res.json(saved);
});

router.post('/notes', (req, res) => {
  req.body.id = notes.length.toString();
  let note = createNewNote(req.body, notes);
  res.json(note);
});

router.delete('/notes/:id', (req, res) => {
  deleteNote(notes, req.params.id);
  res.json(notes);
});

module.exports = router;


const router = require("express").Router();
const {
    notes
} = require('../../db/db.json');
const {
    createNewNote,
    deleteNote
} = require('../../lib/noteFunctions');


router.get('/notes', (req, res) => {
    // within the route --> fs.readFile()
    console.log("Hit /NOTES route");
    let saved = notes;
    console.log("Dataset: ", saved);
    console.log("TYpe: ", typeof saved);
    res.json(JSON.parse(saved));
})

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    let note = createNewNote(req.body, notes);
    res.json(note);
})

router.delete('/notes/:id', (req, res) => {
    deleteNote(notes, req.params.id);
    res.json(notes);
})


module.exports = router;
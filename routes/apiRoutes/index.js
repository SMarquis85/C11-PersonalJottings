const router = require('express').Router();
const notesRoutes = require('./notesRoutes')

router.use('/notes', notesRoutes);

router.get('/notes', (req, res) => {
    console.log("Hit /NOTES route");
    let saved = notes;
    console.log("Dataset: ", saved);
    console.log("TYpe: ", typeof saved);
    res.json(saved);
})


module.exports = router;

// This file controls what happens on the various routes/requests for /api/thoughts

const router = require('express').Router();

// Import statements for the controllers
const { getAllThoughts, getThoughtById, createThought, updateThoughtById, deleteThoughtById, addReactionToThought, deleteReactionFromThought } = require('../../controllers/thought.controller');

router.get("/", async (req, res) => {
  try {
    const payload = await getAllThoughts()
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const payload = await getThoughtById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const payload = await createThought(req.body)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const payload = await updateThoughtById(req.params.id, req.body)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deleteThoughtById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const payload = await addReactionToThought(req.params.thoughtId, req.body)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

// I will be honest, this route gave me a lot of difficulty as I misread the provided documentation and didn't realize I was allowed to add the :reactionId value to the route at first
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const payload = await deleteReactionFromThought(req.params.thoughtId, req.params.reactionId)
    res.status(200).json({ result: "success"})
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

module.exports = router;
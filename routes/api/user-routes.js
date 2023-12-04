// This file houses the requests for api/users

const router = require('express').Router();

// User route controllers here
const { getAllUsers, getUserById, createUser, updateUserById, deleteUserById, addFriendToUser, deleteFriendFromUser } = require('../../controllers/user.controller');

router.get("/", async (req, res) => {
  try {
    const payload = await getAllUsers()
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const payload = await getUserById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const payload = await createUser(req.body)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const payload = await updateUserById(req.params.id, req.body)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deleteUserById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const payload = await addFriendToUser(req.params.userId, req.params.friendId)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const payload = await deleteFriendFromUser(req.params.userId, req.params.friendId)
    res.status(200).json({ result: "success"})
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

module.exports = router;
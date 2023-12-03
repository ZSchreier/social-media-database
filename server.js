const express = require('express');
const db = require('./config/connection');
const { Item, Category } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get all the items
app.get("/api/items", async (req, res) => {
  try {
    const payload = await Item.find()
    res.json({ status: "success", payload })
  } catch (err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

// Get one item
app.get("/api/items/:id", async (req, res) => {
  try {
    const payload = await Item.findOne({ _id: req.params.id }).populate({path: "category"})
    payload.inventoryReport()
    res.json({ status: "success", payload })
  } catch (err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

// Create a item
app.post("/api/items", async (req, res) => {
  try {
    const payload = await Item.create(req.body)
    res.json({ status: "success", payload })
  } catch (err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

// Create a category
app.post("/api/categories", async (req, res) => {
  try {
    const payload = await Category.create(req.body)
    res.json({ status: "success", payload })
  } catch (err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

// Get all the categories
app.get("/api/categories", async (req, res) => {
  try {
    const payload = await Category.find()
    res.json({ status: "success", payload })
  } catch (err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

// update an item (unique)
app.put('/api/items/:id', async (req, res) => {
  try {
    // which key, new value (filter to key, update like this, {new: true})
    // might want to use :name instead, since _id is really funky with mongo
    const payload = await Item.findOneAndUpdate(
      {_id: req.params.id},
      req.body,
      {runValidators: true, new: true})
    res.json({ status: "success", payload })
  } catch (err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

// delete an item
app.delete("/api/items/:id", async (req, res) => {
  try {
    const payload = await Item.findByIdAndDelete(req.params.id)
    res.json({ status: "success"})
  } catch (err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
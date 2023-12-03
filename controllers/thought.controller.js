// thought controls here

const { Thought } = require('../models');
const Model = Thought; 

async function getAllItems() {
  try {
    return await Model.find();
  } catch (err) {
    throw new Error(err)
  }
}

async function getItemById(id) {
  try {
    return await Model.findById(id);
  } catch (err) {
    throw new Error(err)
  }
}

async function createItem(data) {
  try {
    return await Model.create(data);
  } catch (err) {
    throw new Error(err)
  }
}

async function updateItemById(id, data) {
  try {
    return await Model.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteItemById(id) {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err)
  }
}

// post to add a new reaction to a thought
async function addReactionToThought(thoughtId, reqBody){
  try{
    return await Model.findOneAndUpdate(
      {_id: thoughtId},
      {reactions: [...reactions, reqBody]},
      {new: true}
    )
  }catch(err){
    throw new Error(err)
  }
}

// delete to remove a reaction by ID from a thought
async function deleteReactionFromThought(thoughtId, reqBody){
  try{
    const thought = Model.findById(thoughtId)
    const reactionToDelete = []
    for(x=0; x<thought.reactions.length; x++){
      if(reqBody === thought.reactions[x].reactionId){
        reactionToDelete.push(x)
      }
    }
    return await Model.findOneAndUpdate(
      {_id: userId},
      {reactions: reactions.splice(reactions.indexOf(reactionToDelete[0]), 1)},
      {new: true}
    )
  }catch(err){
    throw new Error(err)
  }
}

module.exports = {
  getAllThoughts: getAllItems,
  getThoughtById: getItemById,
  createThought: createItem,
  updateThoughtById: updateItemById,
  deleteThoughtById: deleteItemById,
  addReactionToThought,
  deleteReactionFromThought
}
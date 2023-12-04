// thought controls here

const { Thought, User } = require('../models');
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
    const payload = await Model.create(data);
    const userCreated = await User.findById(data.userId)
    const currentThoughts = userCreated.thoughts
    await User.findOneAndUpdate(
      {_id: data.userId},
      {thoughts: [...currentThoughts, payload._id]},
      {new: true}
      )
    return payload;
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
    const currentThought = await Model.findById(thoughtId)
    const currentReactions = currentThought.reactions
    return await Model.findOneAndUpdate(
      {_id: thoughtId},
      {reactions: [...currentReactions, reqBody]},
      {new: true}
    )
  }catch(err){
    throw new Error(err)
  }
}

// delete to remove a reaction by ID from a thought
async function deleteReactionFromThought(thoughtId, reactId){
  try{
    const currentThought = await Model.findById(thoughtId)
    const currentReactions = currentThought.reactions
    const removal = []
    for(x=0; x<currentReactions.length; x++){
      if(currentReactions[x].reactionId == reactId){
        removal.push(currentReactions[x])
      }
    }
    return await Model.findOneAndUpdate(
      {_id: thoughtId},
      {$pull: {reactions: removal[0]}},
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
// This file handles the functions used when a user pings user routes

const { User } = require('../models');
const Model = User; 

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

async function addFriendToUser(userId, friendId){
  try{
    const currentUser = await Model.findById(userId)
    const currentFriends = currentUser.friends
    return await Model.findOneAndUpdate(
      {_id: userId},
      {friends: [...currentFriends, friendId]},
      {new: true}
    )
  }catch(err){
    throw new Error(err)
  }
}

async function deleteFriendFromUser(userId, friendId){
  try{

    return await Model.findOneAndUpdate(
      {_id: userId},
      {$pull: {friends: friendId}},
      {new: true}
    )
  }catch(err){
    throw new Error(err)
  }
}

module.exports = {
  getAllUsers: getAllItems,
  getUserById: getItemById,
  createUser: createItem,
  updateUserById: updateItemById,
  deleteUserById: deleteItemById,
  addFriendToUser,
  deleteFriendFromUser
}
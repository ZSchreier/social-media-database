// user model here

const {model, Schema} = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'username required'],
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'email required'],
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'invalid email address']
    },
    thoughts: {
      type: [Schema.Types.ObjectId],
      ref: 'Thought'
    },
    friends: {
      type: [Schema.Types.ObjectId],
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length
})

const User = model('User', userSchema);

module.exports = User;
// thought model here

// reaction will be a subdocument here

const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId
  },
  reactionBody: {
    type: String,
    required: [true, 'reaction body needed'],
    maxLength: [280, 'max 280 characters please']
  },
  username: {
    type: String,
    required: [true, 'username required for thought']
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: formatReactionCreatedAt
  }
}
)

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      unique: true,
      required: [true, 'thoughttext required'],
      maxLength: [280, 'too many characters']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formatThoughtCreatedAt
    },
    username: {
      type: String,
      required: [true, 'username required for thought']
    },
    reactions: {
      type: [reactionSchema]
    }
  },
  {
    timestamps: true
  }
);

function formatThoughtCreatedAt(createdAt){
  const formatTime = createdAt.toUTCString()
  return formatTime
}

function formatReactionCreatedAt(createdAt){
  const formatTime = createdAt.toUTCString()
  return formatTime
}

thoughtSchema.virtual('friendCount').get(function() {
  return this.friends.length
})

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;
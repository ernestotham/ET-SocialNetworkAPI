const { Schema, model } = require('mongoose');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 50,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userName: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
    ],
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reaction'
    }
    ],
    
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});



const Tought = model('Thought', thoughtSchema);

module.exports = Tought;

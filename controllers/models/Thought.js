const { Schema, model } = require('mongoose');


// Schema to create Thoughts model
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
        ref: 'userSchema'
    }
    ],
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reactionsSchema'
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



const Tought = model('thought', thoughtSchema);

module.exports = Tought;

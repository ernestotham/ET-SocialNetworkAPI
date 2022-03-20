const { Schema, model } = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,

    },

    userName:
    {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: dateFormat
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);






const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: dateFormat
     
    },
    userName:
    {
      type: String,
      required: true,
    },

    reactions: [reactionSchema],

  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


function dateFormat(createdAt) {
  return moment(createdAt).format('MMM Do, YYYY [at] hh:mm a')

}

const Tought = model('Thought', thoughtSchema);

module.exports = Tought;

const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    userName: {
      type: String,
      required: true,
      unique:true,
      trim: true,
            
    },
    email: {
      type: String,
      required: true,
      unique:true,
      trim: true,
      match: `/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/`,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }

    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    }
    ],
    
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


const User = model('User', userSchema);

module.exports = User;

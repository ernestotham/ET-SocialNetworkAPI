const {Thought, User} = require('../models');

module.exports = {


    getThoughts(req, res) {
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
      },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    
    createThoughtOld(req, res) {
        Thought.create(req.body)
          .then((thought) => res.json(thought))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },


      createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $addToSet: { thoughts: thought._id } },
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'Thought created, but found no user with that ID' })
              : res.json(req.body)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },


    
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No user with that ID' })
              : console.log("pending code here")
            //   : thought.deleteMany({ _id: { $in: thought.friends } })
          )
          .then(() => res.json({ message: 'user and friends deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

     addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
        
      )
        .then((thought) =>
          !thought
            ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
            : res.json(`reaction has been added to thought Id: ${req.params.thoughtId}`)
        )
        .catch((err) => res.status(500).json(err));
    },


     removeReaction(req, res) {
      Thought.findOneAndUpdate(
         {_id: req.params.thoughtId}, 
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
            //: res.json(`reaction has been removed from thought Id: ${req.params.thoughtId}`)
        )
        .catch((err) => res.status(500).json(err));
    },
}



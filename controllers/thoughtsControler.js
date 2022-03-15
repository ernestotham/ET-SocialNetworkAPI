const {thought} = require('../models');

module.exports = {


    getThoughts(req, res) {
        thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
      },

    getSingleThought(req, res) {
        thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thoughtv) =>
            !thoughtv
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thoughtv)
          )
          .catch((err) => res.status(500).json(err));
      },
    
    createThought(req, res) {
        thought.create(req.body)
          .then((thoughtv) => res.json(thoughtv))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
    
    updateThought(req, res) {
        thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thoughtv) =>
            !thoughtv
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thoughtv)
          )
          .catch((err) => res.status(500).json(err));
      },
    
    deleteUser(req, res) {
        thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thoughtv) =>
            !thoughtv
              ? res.status(404).json({ message: 'No user with that ID' })
              : console.log("pending code here")
            //   : thoughtv.deleteMany({ _id: { $in: thought.friends } })
          )
          .then(() => res.json({ message: 'user and friends deleted!' }))
          .catch((err) => res.status(500).json(err));
      },



}



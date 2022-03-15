const {user} = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
      user.find()
        .then(async (users) => {
          const studentObj = {
            users,
            headCount: await headCount(),
          };
          return res.json(studentObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Get a single user
    getSingleUser(req, res) {
      user.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (userv) =>
          !userv
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({
                userv,
                
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // create a new user
    createUser(req, res) {
      user.create(req.body)
        .then((userv) => res.json(userv))
        .catch((err) => res.status(500).json(err));
    },
    // Delete a user 
    deleteStudent(req, res) {
      user.findOneAndRemove({ _id: req.params.userId })
        .then((userv) =>
          !userv
            ? res.status(404).json({ message: 'No such student exists' })
            : user.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
              )
        )
        .then((course) =>
          !course
            ? res.status(404).json({
                message: 'User deleted',
              })
            : res.json({ message: 'User successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // Add friend to a user
    addFriend(req, res) {
      console.log('You are adding a friend');
      console.log(req.body);
      user.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      )
        .then((userv) =>
          !userv
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(student)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove friend from a user
    removeFriend(req, res) {
      user.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      )
        .then((userv) =>
          !userv
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(student)
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  
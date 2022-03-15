const router = require('express').Router();

const {
getUsers,
getSingleUser,
createUser,
updateUser,
deleteUser,

} = require('../../controllers/usersController.js');

// /api/users
router.router('/').get().post();


// /api/users/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;
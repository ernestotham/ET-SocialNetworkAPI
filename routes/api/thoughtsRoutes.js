const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,

} = require('../../controllers/thoughtsControler.js');



// /api/thoughts
router.router('/').get(getThoughts).post(createThought);


// /api/users/:userId
router
    .route('/:userId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)




// /api/thoughts/:thoughtId/reactions
router
    .route('/thoughts/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction)

module.exports = router;
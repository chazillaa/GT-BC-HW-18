const router = require('express').Router()

const {
    getThoughts,
    getThoughtsById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require("../../controllers/thought-controller")

// api/thoughts to GET all and POST
router.route('/').get(getThoughts).post(createThought)

// api/thoughts/:id to GET thought PUT and DELETE
router.route('/:id').get(getThoughtsById).put(updateThought).delete(deleteThought)

// api/thoughts/:thoughtId/reactions to POST
router.route('/:thoughtId/reactions').post(createReaction)

// api/thouughts/:thoughtId/reactions/:reactionId to DELETE
router.route('/:toughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router
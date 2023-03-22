const router = require('express').Router()

const {
    getUsers,
    getById,
    createUser,
    updateById,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

// api/users to GET all and POST
router.route('/').get(getUsers).post(createUser)

// api/users/:id to GET user PUT and DELETE
router.route('/:id').get(getById).put(updateById).delete(deleteUser)

// api/users/:id/friends/:friendid to POST and DELETE
router.route('/:id/friends/:friendId').delete(deleteFriend).post(addFriend);

module.exports = router
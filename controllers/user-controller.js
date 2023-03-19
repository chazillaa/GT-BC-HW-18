const { Users } = require('../models')

module.exports = {
    // get all users
    getUsers(req, res){
        Users.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },
    // get user by Id
    getById(req, res){
        Users.findOne({ _id: req.params.id })
        .then((user) => {
            if(!user) {
                return res.sendStatus(404).json({ message: 'No User is associated with this Id.'})
            }
            res.json(user)
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    },
    // create user
    createUser(req, res){
        Users.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => console.log(err))
    }, 
    // update user by Id
    updateById(req, res){
        Users.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { 
                runValidators: true, 
                new: true
            }
            )
        .then((user) =>{
            if(!user) {
                return res.status(404).json({ message: 'No User is associated with this Id.'})
            }
             res.json(user)
         })
         .catch((err) => {
            console.log(err);
             res.sendStatus(400);
            })
    },
    //delete user
    deleteUser(req, res){
        Users.findOneAndDelete({ _id: req.params.id })
            .then((user) => {
                if(!user) {
                    return res.status(404).json({ message: 'No user is associated with this Id.'})
                }
            })
            .then(() => res.json({ message: 'User has been deleted.'}))
    },
    // add friend
    addFriend(req, res){
        Users.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { friends: req.params.friendId } },
            { 
                runValidators: true, 
                new: true
            }
        )
        .then((user) => {
            if(!user) {
                return res.status(404).json({ message: 'No user is associated with this Id.'})
            }
            res.json(user)
        })
        .catch((err) => res.status(500).json(err))
    },
    // delete friend
    deleteFriend(req, res){
        Users.findOneAndDelete(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true}
        )
        .then((user) =>{
            if(!user) {
                return res.status(404).json({ message: 'No User is associated with this Id.'})
            }
            res.json(user)
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    }
}
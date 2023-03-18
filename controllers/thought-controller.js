const { Thoughts, Users } = require('../models')

module.exports = {

    // get all thoughts
    getThoughts(req, res) {
        Thoughts.find({})
        .populate({ path: 'reactions', select: '-__v' })
        .select(`-__v`)
        .then((thoughts) => res.json(thoughts))
        .catch((err) => req.status(500).json(err))
    },

    // get thoughts by id
    getThoughtsById(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
        .populate({ path: 'reactions', select: '-__v' })
        .select(`-__v`)
        .then((thought) => {
            if(!thought) {
                res.status(404).json({ message: 'No thought is associated with this id.'})
                return
            }
            res.json(thought)
        })
    },

    // create though
    createThought(req, res) {
        Thoughts.create(req.body)
            .then(({ _id }) => {
                return Users.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then((user) => {
                if(!user) {
                    res.status(404).json({ message: 'No user is associated with this id.'})
                    return
                }
                res.json(user)
            })
            .catch((err) => req.status(500).json(err))
    },

    // update thought
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { 
                runValidators: true, 
                New: true
            }
        )
        .then((thought) => {
            if(!thought) {
                res.status(404).json({ message: 'No thought is associated with this id.'})
                return
            }
            res.json(thought)
        })
        .catch((err) => req.status(500).json(err))
    },

    // delete thought
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => {
            if(!thought) {
                res.status(404).json({ message: 'No thought is associated with this id.'})
                return
            }
            Users.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { pull: { thoughts: req.params.thoughtId }},
                { new: true }
            )
            .then((user) => {
                if(!user) {
                    res.status(404).json({ message: 'No thought is associated with this id.'})
                    return
                }
                res.json(user)
            }) 
            .catch((err) => req.status(500).json(err))
        })
    },

    // create reaction
    createReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: {reactions: req.body}},
            {
                runValidators: true,
                New: true
            }
        )
        .then((thought) =>{
            if(!thought) {
                res.status(404).json({ message: 'No thought is associated with this id.'})
                return
            }
            res.json(thought)
        })
        .catch((err) => req.status(500).json(err))
    },

    // delete reaction
    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.reactionId },
            { $pull: {reactions: req.body} },
            {
                runValidators: true,
                New: true
            }
        )
        .then((thought) =>{
            if(!thought) {
                res.status(404).json({ message: 'No thought is associated with this id.'})
                return
            }
            res.json(thought)
        })
        .catch((err) => req.status(500).json(err))
    }
}
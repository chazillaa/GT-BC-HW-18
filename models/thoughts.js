const { Schema, model, Types } = require('mongoose')
const moment = require('moment')

const ReactionsSchema = new Schema (
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 200
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            minLength: 1,
            maxLength: 200
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
            username: {
                type: String,
                required: true
            },
            reactions: [ReactionsSchema]
    },
    {
        toJSON:{
            virtuals: true,
            getters: true
        },
        id: false
    }
)

ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Thoughts = model('Thoughts', ThoughtsSchema)

module.exports = Thoughts
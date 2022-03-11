const mongoose = require('mongoose')
const Schema = mongoose.Schema
const podcastSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        enum: ['Pop', 'CountySide'],
        required: true,
    },
    plays: {
        type: Number,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    downloads: {
        type: Number,
        required: true,
    },
    by: {
        type: Array,
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Podcast', podcastSchema)
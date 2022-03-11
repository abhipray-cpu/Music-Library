const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const starSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    downloads: {
        type: Number,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    plays: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    songs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Song',
        required: true,
    }, { collection: 'songs' }],

})

module.exports = mongoose.model('Star', starSchema)
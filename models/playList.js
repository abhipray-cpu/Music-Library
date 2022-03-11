const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playlistSchema = new Schema({
    songs: {
        type: Array,
        type: String,
        required: true
    },

    podcast: {
        type: Array,
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true

    }
})

module.exports = mongoose.model('Playlist', playlistSchema)
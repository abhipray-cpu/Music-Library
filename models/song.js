const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const songSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    duration: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        enum: ['Music + Talk',
            'Ambient',
            'TV & Movies',
            'Song Writers',
            'Anime',
            'Country',
            'Travel',
            'Punk',
            'Funk',
            'Blues',
            'Metal',
            'Latin',
            'Classical',
            'Soul',
            'Caribbean',
            'Gaming',
            'Stop Asian Hate',
            'Jazz',
            'Date Night',
            'Summer',
            'Focus',
            'Rock',
            'TasteMakers',
            'R&B',
            'At Home',
            'Kid & Family',
            'Sleep',
            'Folk & Acoustic',
            'Workout',
            'Higher Ground',
            'Wellness',
            'Mood',
            'Chill',
            'Student',
            'Dance/Electronic',
            'Instrumental',
            'Party',
            'Hip-Hop',
            'Netflix',
            'K-Pop',
            'Bolywood',
            'Happy Holiday',
            'Romance',
            'Indian Classical',
            'Devotional',
            'Marathi',
            'Fresh Finds',
            'Radar',
            'Telugu',
            'Pahadi',
            'Spanish',
            'Punjabi',
            'Haryanvi',
            'Rajasthani',
            'Bhojpuri',
            'Podcasts',
            'English',
            'North Eastern',
            'New Releases',
            'Concerts',
        ],

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
    singer: {
        type: String,
        ref: 'Star',
        required: true,
    },
    songUrl: {
        type: String,
        // required: true,
        // unique: true,
    },
    coverPic: {
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = mongoose.model('Song', songSchema)
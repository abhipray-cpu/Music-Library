const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    premium: {
        type: Boolean,
        required: true,
    },
    playCount: {
        type: Number,

    },
    //this track will be manages by a seprte service which will be working based on some ML model
    //and will update the tracks whenever a certain threshold of plays or time duration is reached
    //based on these tracks we will be displaying songs personalized fot the user.
    track1: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track2: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track3: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track4: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track5: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track6: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track7: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track8: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track9: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track10: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track11: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track12: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track13: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track14: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track15: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    track16: {
        title: {
            type: String
        },
        songs: {
            type: Array,
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    },
    liked: {
        type: Array,
        type: mongoose.Types.ObjectId,
        ref: 'Song'
    },
    resetToken: String,
    resetTokenExpiration: Date
})

module.exports = mongoose.model('User', userSchema)
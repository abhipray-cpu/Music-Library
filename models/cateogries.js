const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    class: {
        type: String,
            required: true
    }
})

module.exports = mongoose.model('Category', categorySchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const plansSchema = new Schema({
    plan_name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true
    },
    feature1: {
        type: String,
        required: true
    },
    feature2: {
        type: String,
        required: true
    },
    feature3: {
        type: String,
        required: true
    },
    feature4: {
        type: String,
        required: true
    },
    feature5: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Plan', plansSchema)
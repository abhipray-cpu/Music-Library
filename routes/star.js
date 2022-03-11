const express = require('express');
const Star = require('../models/stars')
const isAuth = require('./isAuth.js')
const { check, body } = require('express-validator')
const star = require('../controllers/star')
const router = express.Router();

router.get('/addStar', isAuth, star.addStar);
router.post('/registerUser', [
    body('name').custom((value, { req }) => {
        return Star.find({ name: value })
            .then(star => {
                if (star.length > 0) {
                    return Promise.reject('This singer already exists!')
                }
            })
    }),

    // body('password').custom((value, { req }) => {
    //     if (value !== req.body.confirm) {
    //         throw new Error('The passwords you entered does not match')
    //     } else
    //         return true
    // })
    // .isLength({ min: 10 }).withMessage('Please enter a password atleast 10 characters long')
    // .trim()
], isAuth, star.registerStar);
router.get('/bio/:name', star.getBio)
module.exports = router
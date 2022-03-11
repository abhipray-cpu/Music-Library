const express = require('express');
const User = require('../models/user')
const { check, body } = require('express-validator')

const user = require('../controllers/user')
const isAuth = require('./isAuth')
const router = express.Router();
router.get('/login', user.login);
router.get('/signup', user.signup);
router.post('/addUser', [
    body('email').custom((value, { req }) => {
        return User.find({ email: value })
            .then(user => {
                if (user.length > 0) {
                    return Promise.reject('This email already exists')
                }
            })
    }).normalizeEmail(),
    body('password').isLength({ min: 10 }).withMessage('The password entered should be atleast 10 characters long')
    .custom((value, { req }) => {

        if (value !== req.body.confirm) {
            throw new Error('The passwords you entered does not match')
        } else
            return true; //need to return else case as well not know why since others were working fine
    }).trim()


], user.addUser);
router.post('/validateUser', user.validateUser);
router.get('/logout', isAuth, user.logout);
router.get('/change_password', isAuth, user.ChangingPassword)
router.post('/changePassword', isAuth, user.changePassword)
router.get('/ConfirmChange/:userId/:token', user.confirmPasswordChange)

router.post('/confirmChange', [
        check('password', 'Please enter a valid password which is atleast 10 characters long') //the second key is the default message we want for all the validators check
        .isLength({ min: 10 })
        .trim() //this is a sanitization method for password
        ,
        check('password')
        .custom((value, { req }) => {
            if (value != req.body.Confirm) {
                throw new Error('The passwords you entered do not match');
            } else {
                return true;
            }
        })
    ],
    user.confirmChange)

module.exports = router
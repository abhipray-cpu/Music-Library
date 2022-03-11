const express = require('express');
const user = require('../controllers/user')
const Song = require('../models/song')
const general = require('../controllers/general')
const router = express.Router();
const { check, body } = require('express-validator')
const isAuth = require('./isAuth')
router.get('/', user.login)
router.get('/home', isAuth, general.home)
router.get('/premium', isAuth, general.premium)
router.get('/stars', isAuth, general.stars)

router.get('/search', isAuth, general.search);
router.get('/miniPlayer', isAuth, general.mini_player);
router.post('/premium_activate', isAuth, general.activate_premium)
router.get('/collection/:category/:gradient', general.findSongs);
router.get('/addSong', general.AddSong)
router.post('/registerSong', [
    body('Title').custom((value, { req }) => {
        return Song.find({ title: value })
            .then(song => {
                if (song.length > 0) {
                    return Promise.reject('This song already exists!')
                }
            })
    }),
    // body('Url').custom((value, { req }) => {
    //     return Song.find({ songUrl: value })
    //         .then(song => {
    //             if (song.length > 0) {
    //                 return Promise.reject('This song url already exists!')
    //             }
    //         })
    // }),


], general.registerSong)
router.post('/searchSong', isAuth, general.searchSong)
router.get('/homeSong/:songId', isAuth, general.homePlaySong)
module.exports = router;
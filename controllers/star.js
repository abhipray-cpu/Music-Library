const Star = require('../models/stars')
const { validationResult } = require('express-validator')
const { json } = require('body-parser')
exports.addStar = (req, res, next) => {

    res.render('register_star.ejs', {
        pageTitle: 'registerStar',
        error: ''

    })
}
exports.registerStar = (req, res, next) => {
    const imageUrl = req.file; //now we access the file field in the incoming request
    console.log('*********************************************************************************');
    console.log('This is the image file data we have which is a buffer basically');
    console.log(imageUrl) //don't know for sure but you need to use some other name then the one you are using for file
    console.log('*********************************************************************************');
    if (imageUrl) {
        req.session.image = imageUrl.path;
        const Errors = validationResult(req).errors
        if (Errors.length > 0) {
            return res.status(422).render('register_star.ejs', {
                pageTitle: 'registerStar',
                error: Errors[0]

            })
        }
        console.log(Errors)
        const star = new Star({
            name: req.body.name,
            password: 1234567890,
            image: req.session.image,
            downloads: 0,
            likes: 0,
            plays: 0,
            songs: []
        })
        star.save()
            .then(result => {
                console.log("Star registered successfully");
                res.redirect('/stars?page=1&row=prev')
            })
            .catch(err => {
                console.log(err);
            })
    } else {
        return res.status(422).render('register_star.ejs', {
            pageTitle: 'registerStar',
            error: ''

        })
    }
}

exports.getBio = (req, res, next) => {
    Star.find({ name: req.params.name })
        .populate('songs')
        .sort('likes')
        .then(result => {
            result = result[0];
            if (result.songs.length < 5) {
                topSongs = result.songs.slice(0, result.songs.length);

            } else {
                topSongs = result.songs.slice(0, 5)
            }

            let image = result.image;
            image = image.replace("\\", "/");
            res.render('starPage.ejs', {
                title: result.name,
                likes: result.likes,
                plays: result.plays,
                songs: result.songs,
                image: image,
                topSongs: topSongs
            });
        })
        .catch(err => {
            console.log(err)
            res.render('500.ejs');
        })

}
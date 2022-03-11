const Star = require('../models/stars')
const Plans = require('../models/plans')
const User = require('../models/user')
const mongoose = require('mongoose');
const Song = require('../models/song');
const Categories = require('../models/cateogries.js')
const { validationResult } = require('express-validator');
const song = require('../models/song');
exports.home = (req, res, next) => {
    if (req.session.isLoggedIn === true) {
        Song.find({})
            .then(songs => {
                let songs1 = songs.slice(0, 6);
                let songs2 = songs.slice(6, 12);
                let songs3 = songs.slice(12, 18);
                let songs4 = songs.slice(18, 24);
                let songs5 = songs.slice(24, 30);
                let songs6 = songs.slice(30, 36);
                let songs7 = songs.slice(36, 42);
                let songs8 = songs.slice(42, 48);
                let songs9 = songs.slice(48, 54);
                let songs10 = songs.slice(54, 60);
                let songs11 = songs.slice(60, 66);
                let songs12 = songs.slice(66, 72);
                let songs13 = songs.slice(72, 78);
                let songs14 = songs.slice(78, 84);
                let songs15 = songs.slice(84, 90);
                let songs16 = songs.slice(90, 6);
                res.render('home.ejs', {
                    pageTitle: 'Home',
                    prods: [],
                    songs1: songs1,
                    songs2: songs2,
                    songs3: songs3,
                    songs4: songs4,
                    songs5: songs5,
                    songs6: songs6,
                    songs7: songs7,
                    songs8: songs8,
                    songs9: songs9,
                    songs10: songs10,
                    songs11: songs11,
                    songs12: songs12,
                    songs13: songs13,
                    songs14: songs14,
                    songs15: songs15,
                    songs16: songs16,
                    display: 'none',
                    songUrl: '',
                    image: "maa ki chut",
                    title: 'gana',
                    singer: 'Mickey Singh'
                })

            })

    }
}
exports.premium = (req, res, next) => {
    if (req.session.isLoggedIn === true) {
        Plans.find()
            .then(plans => {

                res.render('premium.ejs', {
                    pageTitle: 'Premium',
                    plans: plans
                })
            })
            .catch(err => { console.log(err) })
    }
}
var pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ]
exports.stars = (req, res, next) => {
    //while pagination increase these values
    const pageNumber = Number(req.query.page)
    const nextPage = pageNumber + 1
    const row = req.query.row

    if ((pageNumber - 1) % 10 == 0 && pageNumber != 1 && row == 'next') {
        console.log('this is the increment condition')
        newPage = []
        pages.forEach(page => {
            newPage.push(page + 10)
        })
        pages = newPage
    }
    if ((pageNumber) % 10 == 0 && pageNumber != 1 && row == 'prev') {
        console.log('this is the decrement condition')
        newPage = []
        pages.forEach(page => {
            newPage.push(page - 10)
        })
        pages = newPage
    }
    Star.find()
        .skip((pageNumber - 1) * 36)
        .count()
        .then(starCount => {
            console.log(`This is teh has next value that will be used ${Math.ceil(starCount / 36)}`)
            console.log(pages);
            Star.find()
                .skip((pageNumber - 1) * 36)
                .limit(36)
                .then(star => {

                    res.render('stars.ejs', {
                        pageTitle: 'Stars',
                        star1: star.slice(0, 4),
                        star2: star.slice(4, 8),
                        star3: star.slice(8, 12),
                        star4: star.slice(12, 16),
                        star5: star.slice(16, 20),
                        star6: star.slice(20, 24),
                        star7: star.slice(24, 28),
                        star8: star.slice(28, 32),
                        star9: star.slice(32, 36),
                        currPage: pageNumber,
                        hasPrevious: pageNumber,
                        hasNext: Math.ceil(starCount / 36),
                        pages: pages,
                        next: nextPage,
                    })
                })
                .catch(err => { console.error(err) })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.search = (req, res, next) => {
    if (req.session.isLoggedIn === true) {
        Categories.find()
            .then(categories => {
                console.log(categories[0]);
                const row1 = categories.slice(0, 6)
                const row2 = categories.slice(6, 12)
                const row3 = categories.slice(12, 18)
                const row4 = categories.slice(18, 24)
                const row5 = categories.slice(24, 30)
                const row6 = categories.slice(30, 36)
                const row7 = categories.slice(36, 42)
                const row8 = categories.slice(42, 48)
                const row9 = categories.slice(48, 54)
                const row10 = categories.slice(54, 60)

                res.render('search.ejs', {
                    pageTitle: 'Search',
                    row1: row1,
                    row2: row2,
                    row3: row3,
                    row4: row4,
                    row5: row5,
                    row6: row6,
                    row7: row7,
                    row8: row8,
                    row9: row9,
                    row10: row10
                })
            })

    }
}

exports.mini_player = (req, res, next) => {
    res.render('mini_player.ejs', {
        pageTitle: 'miniPlayer'
    })
}

exports.activate_premium = (req, res, next) => {
    if (req.session.isLoggedIn === true) {
        User.update({ premium: true }, {
                where: {
                    name: req.body.user,
                    password: req.body.passwd
                }
            }).then(user => {
                console.log("premium membership updated!!");
                res.redirect('/');
            })
            .catch(err => { console.log(err) })
    }
};

exports.findSongs = (req, res, next) => {
    //console.log(`Need to fetch songs of this category ${req.params.category}`)
    Song.find({ genre: req.params.category })
        .then(songs => {
            console.log(songs);
            res.render('collection.ejs', {
                gradient: req.params.gradient,
                title: req.params.category,
                songs: songs
            });
        })
        .catch((err) => {
            console.log(err);
            res.render('500.ejs')
        })

}

exports.AddSong = (req, res, next) => {
    res.render('songForm.ejs', {
        pageTitle: 'Add Song',
        error: ''
    });
}

exports.registerSong = (req, res, next) => {
        const imageUrl = req.file;
        console.log(imageUrl);
        if (imageUrl) {
            req.session.image = imageUrl.path;
            const Errors = validationResult(req).errors
            if (Errors.length > 0) {
                return res.status(422).render('songForm.ejs', {
                    pageTitle: 'regiser Song',
                    error: Errors[0]

                })
            }
            console.log(Errors)
            const song = new Song({
                title: req.body.Title,
                duration: req.body.Duration,
                genre: req.body.genre,
                plays: 0,
                likes: 0,
                downloads: 0,
                singer: req.body.Singer,
                songUrl: 'teri maa ka bhosda',
                coverPic: req.session.image,

            })
            song.save()
                .then(result => {
                    console.log("Song registered successfully");
                    linkSong(req.body.Singer, result._id, res)


                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            return res.status(422).render('songForm.ejs', {
                pageTitle: 'register Song',
                error: ''

            })
        }

    }
    //this function will add the song to the stars playlist
function linkSong(star, song, res) {
    Star.findOneAndUpdate({ name: star }, { $push: { songs: song } }, { new: true })

    .then(result => {
            console.log(result)
            res.redirect('/home')
        })
        .catch(err => {
            console.log(err);
            res.redirect('/home')

        })

}

exports.searchSong = async(req, res, next) => {
    val = req.body.value;
    try {
        const song = await Song.find({ title: val })
        if (song.length > 0) {
            let image = song[0].coverPic
            image = image.replace("\\", "/");
            res.render('songPage.ejs', {
                title: song[0].title,
                likes: song[0].likes,
                plays: song[0].plays,
                songs: song,
                image: image
            });
        } else {
            try {
                const star = await Star.find({ name: val })
                    .populate('songs')
                if (star.length > 0) {
                    let image = star[0].image;
                    image = image.replace("\\", "/");
                    res.render('starPage.ejs', {
                        title: star[0].name,
                        likes: star[0].likes,
                        plays: star[0].plays,
                        songs: star[0].songs,
                        image: image,
                    });
                }

            } catch (err) {
                console.log(err);
                res.redirect('/search');
            }

        }
    } catch (err) {
        console.log(err);
        res.redirect('/search');
    }

}

exports.homePlaySong = async(req, res, next) => {
    try {
        let id = mongoose.Types.ObjectId(req.params.songId);
        let song = await Song.find({ _id: id })
        song = song[0];
        await increaseSongPlays(id);
        await increaseStarPlays(song.singer)
        let songs = await Song.find({});
        let songs1 = songs.slice(0, 6);
        let songs2 = songs.slice(6, 12);
        let songs3 = songs.slice(12, 18);
        let songs4 = songs.slice(18, 24);
        let songs5 = songs.slice(24, 30);
        let songs6 = songs.slice(30, 36);
        let songs7 = songs.slice(36, 42);
        let songs8 = songs.slice(42, 48);
        let songs9 = songs.slice(48, 54);
        let songs10 = songs.slice(54, 60);
        let songs11 = songs.slice(60, 66);
        let songs12 = songs.slice(66, 72);
        let songs13 = songs.slice(72, 78);
        let songs14 = songs.slice(78, 84);
        let songs15 = songs.slice(84, 90);
        let songs16 = songs.slice(90, 6);
        res.render('home.ejs', {
            pageTitle: 'Home',
            prods: [],
            songs1: songs1,
            songs2: songs2,
            songs3: songs3,
            songs4: songs4,
            songs5: songs5,
            songs6: songs6,
            songs7: songs7,
            songs8: songs8,
            songs9: songs9,
            songs10: songs10,
            songs11: songs11,
            songs12: songs12,
            songs13: songs13,
            songs14: songs14,
            songs15: songs15,
            songs16: songs16,
            display: '',
            songUrl: 'https://pwdown.com/113605/Feels Like - Mickey Singh.mp3',
            image: song.coverPic,
            title: song.title,
            singer: song.singer
        })
    } catch (err) {
        console.log(err);
        res.render('500.ejs')
    }
}

exports.songPlay = async(req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.songId);
    const singer = req.params.singer;
    try {
        let song = await Song.findOneAndUpdate({ _id: id }, { $inc: { plays: 1 } }, { new: true });
        let singer = await Star.findOneAndUpdate({ name: singer }, { $inc: { plays: 1 } }, { new: true });

        await song.save();
        await singer.save();
    } catch (err) {
        console.log(err)
        return
    }
}

//this function will increase the song plays
async function increaseSongPlays(songId) {
    try {
        let song = await Song.findOneAndUpdate({ _id: songId }, { $inc: { plays: 1 } }, { new: true })
        await song.save();
        console.log("Song plays incremented")
    } catch (err) {
        console.log(err);
        return
    }
}
//this funnction will increase the star count
async function increaseStarPlays(singer) {
    try {

        //creater index at name field for faster response
        let star = await Star.findOneAndUpdate({ name: singer }, { $inc: { plays: 1 } }, { new: true })
        await star.save()
        console.log('star play incremented')
    } catch (err) {
        console.log(err);
        return
    }
}
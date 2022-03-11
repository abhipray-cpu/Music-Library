const crypto = require('crypto');
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodeMailer')

const { validationResult } = require('express-validator')
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abhipraydumka33@gmail.com',
        pass: 'kamalanita1@'
    },
    tls: {
        rejectUnauthorized: false
    },
    from: 'abhipraydumka33@gmail.com'
})
exports.login = (req, res, next) => {
    if (req.session.isLoggedIn === true) {
        res.redirect('/home');
    } else {

        res.render('login.ejs', {
            pageTitle: 'Login',
            error1: req.flash('user'), //no user found error in this error display a box with signup option added
            error2: req.flash('passwordWrong'), //wrong password error,
            user: ''

        })
    }
}
exports.signup = (req, res, next) => {

    res.render('signup.ejs', {
        pageTitle: 'Signup',
        error: '', //password mismatch error
        name: '',
        birthday: '',
        gender: '',
        email: '',
    })
}

exports.addUser = (req, res, next) => {
    const password = req.body.password;
    const confirm = req.body.confirm
    const Errors = validationResult(req).errors;

    if (Errors[0]) {
        return res.status(422).render('signup.ejs', {
            pageTitle: 'Signup',
            error: Errors[0],
            name: req.body.name,
            birthday: req.body.birthday,
            gender: req.body.gender,
            email: req.body.email,
        })
    }
    if (password === confirm) {
        return bcrypt.hash(password, 13)
            .then(hashedPassword => {
                User.create({
                        name: req.body.name,
                        dob: req.body.birthday,
                        gender: req.body.gender,
                        email: req.body.email,
                        password: hashedPassword,
                        premium: false
                    })
                    .then(user => {
                        console.log("User added successfully !!!");
                        res.render('login.ejs', {
                            pageTitle: 'Login',
                            error1: req.flash('user'), //no user found error in this error display a box with signup option added
                            error2: req.flash('passwordWrong'), //wrong password error,
                            user: req.body.name

                        })
                        const mailOptions = {
                            to: req.body.email,
                            from: 'abhipraydumka33@gmail.com',
                            subject: 'Signup confirmation!!!',
                            html: `<h1>Hey user these are your credentials</h1>
                        <ul>
                        <li><h3>User name: ${req.body.name}</h3></li>
                        <li><h3>Email : ${req.body.email}</h3></li>
                        <li><h3>Password: ${req.body.password}</h3></li>
                        
                        </ul>`
                        }
                        return transporter.sendMail(mailOptions)
                            .then(result => {
                                console.log(result)
                            })
                            .catch(err => { console.log(err) })
                    })
            })
            .catch(err => { console.log(err) })
    } else {
        req.flash('passwordMismatch', 'The password you entered does not match')
        res.render('signup.ejs', {
            pageTitle: 'Signup',
            error: Errors[0],
            name: req.body.name,
            birthday: req.body.birthday,
            gender: req.body.gender,
            email: req.body.email,
        })
    }

}
exports.validateUser = (req, res, next) => {
    // we can use where clause as well with mongoose
    User.find({ name: req.body.name })
        .then(user => {
            if (user.length > 0) {
                return bcrypt.compare(req.body.password, user[0].password)
                    .then(matched => {
                        if (matched === true) {
                            req.session.isLoggedIn = true;
                            req.session.userId = user[0]._id
                            res.redirect('/home');
                        } else {
                            req.flash('passwordWrong', 'The password you entered was incorrect')
                            res.render('login.ejs', {
                                pageTitle: 'Login',
                                error1: req.flash('user'), //no user found error in this error display a box with signup option added
                                error2: req.flash('passwordWrong'), //wrong password error,
                                user: req.body.name

                            })
                        }
                    })
            } else {
                req.flash('user', 'no user found')
                res.render('login.ejs', {
                    pageTitle: 'Login',
                    error1: req.flash('user'), //no user found error in this error display a box with signup option added
                    error2: req.flash('passwordWrong'), //wrong password error,
                    user: ''

                })
            }
        })
        .catch(err => { console.log(err) })
}

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/')
    });
}

exports.ChangingPassword = (req, res, next) => {
    //attaching the current user to the req
    res.render('passwordChange1.ejs', {
        user: req.session.userId,
        message: '',
        error: req.flash('passwordChange')
    })

}

exports.changePassword = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.status(422).res.render('passwordChange1.ejs', {
                user: req.session.userId,
                message: '',
                error: 'Something went wrong on our side'
            })
        }
        req.session.token = buffer.toString('hex');
    })
    error =
        User.findById(req.session.userId)
        .then(user => {
            if (user) {
                return user
            } else {
                req.flash('passwordChange', 'No such user was found');
                res.render('passwordChange1.ejs', {
                    user: req.session.userId,
                    message: '',
                    error: req.flash('passwordChange')
                })
            }
        })
        .then(user => {
            req.session.email = user.email;
            user.resetToken = req.session.token;
            user.resetTokenExpiration = Date.now() + 60000;
            return user.save();
        })
        .then(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(matched => {
                    if (matched === true) {
                        let mailOptions = {
                                to: req.session.email,
                                from: 'abhipraydumka33@gmail.com',
                                subject: "Password Change",
                                text: "Use the link to change the password if not sent by you \n Then sorry my friend you are fucked",
                                html: `<h1>Use this link to change the password</h1>
                                <a href='http://localhost:4000/ConfirmChange/${req.session.userId}/${req.session.token}'>Change password</a>`
                            }
                            //since this sending of email might take some time therefore processing it asynchronously
                        return transporter.sendMail(mailOptions)
                            .then(result => {
                                console.log('mail sent successfully');
                                //render the same page with a message
                                res.render('passwordChange1.ejs', {
                                    user: req.session.userId,
                                    message: 'A mail has been sent to your email id with password reset link',
                                    error: ''
                                })
                            })
                            .catch(err => {
                                console.log('sending mail failed');
                                console.log(err);
                                res.render('passwordChange1.ejs', {
                                    user: req.session.userId,
                                    message: 'Sending mail failed please try again',
                                    error: ''
                                })
                            })

                    } else {
                        req.flash('passwordChange', 'Wrong Password');
                        res.render('passwordChange1.ejs', {
                            user: req.session.userId,
                            message: '',
                            error: req.flash('passwordChange')
                        })
                    }
                })
        })
        .catch(err => { console.log(err) })
}

exports.confirmPasswordChange = (req, res, next) => {
    User.findById(req.params.userId)
        //if you want to include a time restraint you can do like this
        //User.find({resetToken:token,resetTokenExpiration:{$gt:Date.now()}})
        .then(user => {
            if (user.resetToken == req.params.token) {
                let currDate = new Date();
                if (user.resetTokenExpiration.getTime() <= currDate.getTime()) {
                    res.render('passwordChange2.ejs', {
                        userId: user._id,
                        error: ''
                    })
                } else {
                    res.render('passwordChange1.ejs', {
                        user: req.session.userId,
                        message: '',
                        error: req.flash('Timeout error')
                    })
                }
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.confirmChange = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('passwordChange2.ejs', {
            userId: req.body.userId,
            error: errors.errors[0].msg

        })
    } else {
        User.findById(req.body.userId)
            .then(user => {
                bcrypt.compare(req.body.password, user.password)
                    .then(matched => {
                        if (matched === true) {
                            return res.status(422).render('passwordChange2.ejs', {
                                userId: req.body.userId,
                                error: 'This is same as your old password'

                            })
                        } else {
                            return bcrypt.hash(req.body.password, 13)
                                .then(password => {
                                    req.session.currPassword = password;
                                    User.findById(req.body.userId)
                                        .then(user => {
                                            user.password = req.session.currPassword;
                                            req.session.currPassword = ''
                                            return user.save();
                                        })
                                        .then(result => {
                                            console.log(result);
                                            console.log('The password was changed successfully!!');
                                            res.render('login.ejs', {
                                                pageTitle: 'Login',
                                                error1: '', //no user found error in this error display a box with signup option added
                                                error2: '', //wrong password error,
                                                user: ''

                                            })

                                        })
                                        .catch(err => {
                                            console.log(err);
                                            return res.status(422).render('passwordChange2.ejs', {
                                                userId: req.body.userId,
                                                error: 'Faield to update password'

                                            })
                                        })
                                })
                        }
                    })
            })
            .catch(err => {
                console.log(err);
                return res.status(422).render('passwordChange2.ejs', {
                    userId: req.body.userId,
                    error: 'Try again'

                })
            })
    }
}
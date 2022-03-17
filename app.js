const express = require('express')
const path = require('path')
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const csrf = require('csurf')
const multer = require('multer')

const app = express();
const session = require('express-session') //we use this package to add sessions service to our app
const mongoSession = require('connect-mongodb-session')(session) // we use this package to store our sessions data in a mongo db database
const Store = new mongoSession({ //this is bacially the storage we use to store our sessions
        uri: MONGO_URI,
        collection: 'session' // we are creating a sessions collection in our hosted database
    })
    //add time out in the sessions 1 week expiry should be good
app.use(session({ // we are passing a sessions middleware
    secret: process.env.SESSION_SECRET, // always make sure this key is a good and strong string
    resave: false, //this makes sure that our session is not reloaded unncessarily
    saveUninitialized: false, //this too
    store: Store //this is the sessions store we are using to store our sessions information
}))

//app.use(csrfProtection)
const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images'); //null is bascally the error and images is the name of teh folder where we want to store the files
        },
        filename: (req, file, cb) => {
            //this replace is requried only for windows since windows storage path does not allow :
            cb(null, Math.round(Math.floor(new Date() / 1000)) + '-' + file.originalname) //file name is the hex encooding and original name is the original name of the file
        }
    })
    //this will filter only the requried files and will discard all other types of files

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } //will return the call back with a true value
    else {
        cb(null, false); //else will return false
    }
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')))
const csrfProtection = csrf()
app.use(csrfProtection)
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
})
app.use(flash())
app.set('view engine', 'ejs');
app.set('views', 'views');
const router_shop = require('./routes/route');
const user_route = require('./routes/user');
const star_route = require('./routes/star')

app.use(router_shop);
app.use(user_route)
app.use(star_route);
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
    //first we set the status to 404 and than we render 404 page
});

//this is the middleware that will be controlling all the server side errors
app.use((error, req, res, next) => {
    console.log(error);
    res.render('500.ejs')
})

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, )
    .then(user => {
        console.log('Connected Successfully!!');
        app.listen(4000);
    })
    .catch(err => { console.log(err) })
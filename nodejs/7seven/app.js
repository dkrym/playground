const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes.js');

const app = express();

// to mongoDB
const dbURI = 'mongodb+srv://nodetest:heslo.12345@nodedb.r51ls.mongodb.net/note-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db, listening on p3000");
        app.listen(3000);
    }) // start listening only once connected to DB
    .catch((err) => { console.log(err); });

// view engine
app.set('view engine', 'ejs');



// console log when request made
// app.use((req, res, next) => {
//     console.log(req.method, req.hostname, req.path);
//     next();
// })

// middleware and static files
app.use(express.static('public')); // static files put in folder public and I can link them
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // console logger


// router
app.get('/', (req, res) => {
    //res.send('<p>Home page</p>');
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    //res.send('<p>About page</p>');
    res.render('about', { title: 'About' });
});

// imported routes
app.use('/blogs', blogRoutes);

// 404 page
// gets here only if it doesn't match any previous routes
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' });
});
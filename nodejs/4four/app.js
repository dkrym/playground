const express = require('express');
const morgan = require('morgan');

const app = express();

// view engine
app.set('view engine', 'ejs');

// listen for reqests
app.listen(3000);

// console log when request made
// app.use((req, res, next) => {
//     console.log(req.method, req.hostname, req.path);
//     next();
// })

// middleware and static files
app.use(express.static('public')); // static files put in folder public and I can link them
app.use(morgan('dev')); // console logger

// router
app.get('/', (req, res) => {
    //res.send('<p>Home page</p>');
    const blogs = [
        { title: "title 1", snippet: "test test test test" },
        { title: "title 2", snippet: "test2 test test test" },
        { title: "title 3", snippet: "test3 test test test" }
    ];
    res.render('index', { title: 'Home', blogs });
});
app.get('/about', (req, res) => {
    //res.send('<p>About page</p>');
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
})

// 404 page
// gets here only if it doesn't match any previous routes
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' });
})
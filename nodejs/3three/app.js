const express = require('express');

const app = express();

// listen for reqests
app.listen(3000);

// router
app.get('/', (req, res) => {
    //res.send('<p>Home page</p>');
    res.sendFile('./views/index.html', { root: __dirname });
});
app.get('/about', (req, res) => {
    //res.send('<p>About page</p>');
    res.sendFile('./views/about.html', { root: __dirname });
});

// redirects
app.get('/about-me', (req, res) => {
    console.log('redirected /about-me to /about');
    res.redirect('/about');
})

// 404 page
// gets here only if it doesn't match any previous routes
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})
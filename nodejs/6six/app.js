const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { appendFile } = require('fs');

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

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('5f2a397643b9bf37bccf3f96') // blog #2
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// router
app.get('/', (req, res) => {
    //res.send('<p>Home page</p>');
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    //res.send('<p>About page</p>');
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: 'desc' })
        .then((result) => {
            res.render('index', { title: 'All blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);;
        });

});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { title: "Blog Details", blog: result });
        })
        .catch((err) => {
            console.log(err);
        })

});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err);
        });
});



// 404 page
// gets here only if it doesn't match any previous routes
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' });
});
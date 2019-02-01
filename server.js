const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const events = require('./routes/api/events');
const matches = require('./routes/api/matches')



const app = express();

// Body Parser Middleware

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then( () => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize()); //session 3 lecture 13

// Passport Config

require('./config/passport')(passport);



//Use Routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/events', events);
app.use('/api/matches', matches);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}!`));
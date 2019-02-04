//user events

//Authentication: username, email, password, etc.
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Events Model
const Events = require('../../models/Events');

// Match Model
const Match = require('../../models/Match');

// Profile Model
const Profile = require('../../models/Profile')

// User Model 
const User = require('../../models/User');

// Validation 
const validatePostInput = require("../../validation/post")

//Now instead of using "app.get" we can use "router.get()"

//this route goes to localhost:5000/api/users/test. We don't have to include that whole string because it is taken care of in the server.js variables.

// @route   GET api/posts/test
// @desc    Tests post route 
//access    Public
router.get('/test', (req, res) => res.json({ msg: 'Events Works' }));


// @route   POST api/events/
// @desc    Create new event  
//access    Private

router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    // const { errors, isValid } = validatePostInput(req.body);

    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }
    const newEvent = new Events({
        user: req.user.id,
        date: req.body.date,
        type: req.body.type,
        locationorfield: req.body.locationorfield,
        format: req.body.format,
        division: req.body.division,
        league: req.body.league,

    });

    newEvent.save().then(post => res.json(post));
});

// @route   GET api/events/
// @desc    Get all events 
//access    Private

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Events.find()
        .sort({ date: -1 })
        .then(events => res.json(events))
        .catch(err => res.status(404).json({ noeventsfound: "No events found." }));
})



// @route   GET api/events/:id
// @desc    Get events by id
// access   Private 

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Events.findById(req.params.id)
        .then(events => res.json(events))
        .catch(err => res.status(404).json({ noeventfound: "No event found with that ID." }));
})

// @route   DELETE api/events/:id
// @desc    DELETE event by id
// access   Private

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Events.findById(req.params.id)
                .then(event => {
                    // Check for post owner
                    if (event.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: "User not authorized" })
                    }

                    //Delete
                    event.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ eventnotfound: 'No event found' }));
        })
})




module.exports = router;
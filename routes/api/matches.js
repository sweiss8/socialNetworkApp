//user matches

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
const validatePointInput = require("../../validation/points")

//Now instead of using "app.get" we can use "router.get()"

//this route goes to localhost:5000/api/users/test. We don't have to include that whole string because it is taken care of in the server.js variables.

// @route   GET api/matches/test
// @desc    Tests post route 
//access    Public
router.get('/test', (req, res) => res.json({ msg: 'Matches Works' }));

// Theoretically creates a match and adds it to an event


// @route   POST api/matches/:event_id
// @desc    Creates a new match and associates it with the event from req.params
//access    Public


router.post('/:event_id', passport.authenticate('jwt', {session: false}), (req, res) =>{

    Match.create(req.body)
    
    .then(function(dbmatch) {
        return Events.findOneAndUpdate({_id: req.params.event_id}, { $push: { matches: dbmatch._id }}, {new: true}).populate('matches');
         
    })
    .then(event => {
        return res.json(event)
    })
    .catch(err => res.status(404).json({ eventnotfound: "No event found."}))

});


// @route   POST api/matches/point/:id
// @desc    Add point to match
// access   Private

router.post('/point/:id', passport.authenticate('jwt', {session: false}), (req, res) =>{
    const { errors, isValid } = validatePointInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    // console.log(req.params.id)

    

    Match.findById(req.params.id)
    .then(match => {

    //elim total
    const pointTOTE = parseInt(req.body.e1) + parseInt(req.body.e2) + parseInt(req.body.e3) + parseInt(req.body.e4) + parseInt(req.body.e5);


    //hit total
    const pointTOTH = parseInt(req.body.h1) + parseInt(req.body.h2) + parseInt(req.body.h3) + parseInt(req.body.h4) + parseInt(req.body.h5);

    //net final
    var netFinal = pointTOTE - pointTOTH;


        const newPoint = {
            result: req.body.result,
            netrtg: netFinal,
            tote: pointTOTE,
            e1: req.body.e1,
            e2: req.body.e2,
            e3: req.body.e3,
            e4: req.body.e4,
            e5: req.body.e5,
            eob: req.body.eob,
            eib: req.body.eib,
            eom: req.body.eom,
            ebkr: req.body.ebkr,
            toth: pointTOTH,
            h1: req.body.h1,
            h2: req.body.h2,
            h3: req.body.h3,
            h4: req.body.h4,
            h5: req.body.h5,
            hob: req.body.hob,
            hib: req.body.hib,
            hom: req.body.hom,
            hbkr: req.body.hbkr
        }


        // Add to points array
        match.points.push(newPoint);

        //Save
        match.save().then(match => {
            const matchtote = 

            Match.aggregate({_id: points.tote}, { $push: { matches: dbmatch._id }}, {new: true}).populate('matches');

        }
           

            

        )
            // res.json(match))
    })
    .catch(err => res.status(404).json({ matchnotfound: "No match found."}))
})

// @route   GET api/matches/
// @desc    Get all matches 
// access   Private

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Match.find()
        .sort({ date: -1 })
        .then(matches => res.json(matches))
        .catch(err => res.status(404).json({ nomatchesfound: "No matches found." }));
})

// @route   GET api/matches/:id
// @desc    Get match by ID  
// access    Private

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Match.findById(req.params.id)
        .then(match => res.json(match))
        .catch(err => res.status(404).json({ nomatchfound: "No match found with that ID." }));
})


// @route   DELETE api/matches/:id
// @desc    DELETE match by id
// access   Private

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Match.findById(req.params.id)
                .then(match => {
                    // Check for post owner
                    if (match.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: "User not authorized" })
                    }

                    //Delete
                    match.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ matchnotfound: 'No Match found' }));
        })
})












module.exports = router;
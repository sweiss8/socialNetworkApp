//Profile info: experience, etc.

//Authentication: username, email, password, etc.
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')



// Load Profile Model

const Profile = require('../../models/Profile');

//Load User Profile

const User = require('../../models/User');


//Now instead of using "app.get" we can use "router.get()"

//this route goes to localhost:5000/api/users/test. We don't have to include that whole string because it is taken care of in the server.js variables.


// @route   GET api/profile/test
// @desc    Tests profiles route 
//access    Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works'}));

// @route   GET api/profile
// @desc    Get current users profile 
// access    Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .populate('user', ['firstName', 'lastName', 'avatar'])
        .populate('events')
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors)
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// access   Public (may want to change later to private by adding passport authenticate below)

router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
    .populate('user', ['firstName', 'lastName', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'There is no profile for this user.';
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json({profile: 'There is no profile for this user'}))
});

// @route   GET api/profile/all
// @desc    Get all profiles
// access   Public (may want to change later to private by adding passport authenticate below)

router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
    .populate('user', ['firstName', 'lastName', 'avatar'])
    .then(profiles => {
        if(!profiles) {
            errors.noprofile = 'There are no profiles.';
            return res.status(404).json(errors);
        }
        res.json(profiles);
    })
    .catch(err => res.status(404).json({profiles: 'No profiles found'}))
});


// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// access   Public (may want to change later to private by adding passport authenticate below)

router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
    .populate('user', ['firstName', 'lastName', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'There is no profile for this user.';
            res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err))
})






// @route   POST api/profile
// @desc    Create or edit user profile
// access   Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    // Get Fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.team) profileFields.team = req.body.team;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.division) profileFields.division = req.body.division;


    //Social Media
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(profile) {
                Profile.findOneAndUpdate({ user: req.user.id}, {$set: profileFields}, {new: true})
                .then(profile => res.json(profile));
            } else {
                // Create

                // Check if handle exists
                Profile.findOne({ handle: profileFields.handle }).then(profile => {
                    if(profile) {
                        errors.handle = 'Sorry, that handle already exists';
                        res.status(400).json(errors);
                    }

                    // Save Profile
                    new Profile(profileFields).save().then(profile => res.json(profile));
                })
            }
        })

});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// access   Private

router.post("/experience", passport.authenticate('jwt', {session: false }), (req, res) => {

    // const { errors, isValid } = validateExperienceInput(req.body);

    // // Check Validation
    // if(!isValid) {
    //     // Return any errors with 400 status
    //     return res.status(400).json(errors);
    // }
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newExp = {
            team: req.body.team,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current
        }

        // Unshift to experience array
        profile.experience.unshift(newExp);

        profile.save().then(profile => res.json(profile))
    })
});

// @route   POST api/profile/education
// @desc    Add education to profile
// access   Private

router.post("/education", passport.authenticate('jwt', {session: false }), (req, res) => {

    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }

        // Unshift to experience array
        profile.education.unshift(newEdu);

        profile.save().then(profile => res.json(profile))
    })
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from  profile
// access   Private

router.delete("/experience/:exp_id", passport.authenticate('jwt', {session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
        // Take item and map to an array of ids
        .map(item => item.id)
        // Match whatever is passed in through the route so we have the correct exp. to delete.
        .indexOf(req.params.exp_id)
        // Splice it out of the array
        profile.experience.splice(removeIndex, 1);

        // Save the new array
        profile.save().then(profile => res.json(profile));
        
    })
    .catch(err => res.status(404).json(err))
})

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education item from  profile
// access   Private

router.delete("/education/:edu_id", passport.authenticate('jwt', {session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        // Get remove index
        const removeIndex = profile.education
        // Take item and map to an array of ids
        .map(item => item.id)
        // Match whatever is passed in through the route so we have the correct exp. to delete.
        .indexOf(req.params.edu_id)
        // Splice it out of the array
        profile.education.splice(removeIndex, 1);

        // Save the new array
        profile.save().then(profile => res.json(profile));
        
    })
    .catch(err => res.status(404).json(err))
})

// @route   DELETE api/profile/
// @desc    Delete user and profile
// access   Private

router.delete("/", passport.authenticate('jwt', {session: false }), (req, res) => {

    Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
        User.findOneAndRemove ({_id: req.user.id})
            .then(() => res.json({success: true})
            )
    })
});

module.exports = router;
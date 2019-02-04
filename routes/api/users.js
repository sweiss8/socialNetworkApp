//Authentication: username, email, password, etc.
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


// Load User Model
const User = require('../../models/User')

//Now instead of using "app.get" we can use "router.get()"

//this route goes to localhost:5000/api/users/test. We don't have to include that whole string because it is taken care of in the server.js variables.

// @route   GET api/users/test
// @desc    Tests users route 
//access    Public
router.get('/test', (req, res) => res.json({ msg: 'User Works'}));

// @route   POST api/users/register
// @desc    Register User
//access    Public

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    //check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }) 
        .then(user => { // Do these "user" variables need to be capitalized?
            if(user) {
                return res.status(400).json({email: 'Email already exists.'})
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // size
                    r: 'pg', // rating
                    d: 'mm' // Default image
                }) 
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password

                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                        .save() //mongoose
                        .then(user => res.json(user))
                        .catch(err => console.log(err));

                    })
                })
            }
        })
})

// @route   GET api/users/login
// @desc    Login user / returning JWT Token
//access    Public

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    //Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email

    User.findOne({email})
        .then(user => {
            // Check for user
            if(!user){
                errors.email = "User email not found.";
                return res.status(404).json(errors);
            }

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        //User Found
                        const payload = {id: user.id, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar}
                        
                        //Sign Token
                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            {expiresIn: 36000 }, 
                            (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                    } else {
                        errors.password = "Password Incorrect";
                        return res.status(400).json(errors);
                    }
                });

        });
});

// @route   GET api/users/current
// @desc    Returns current User 
//access    Private

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        email: req.user.email
      });
    }
  );


module.exports = router;
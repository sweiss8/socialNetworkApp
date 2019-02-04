//user posts and comments

//Authentication: username, email, password, etc.
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Post Model
const Post = require('../../models/Post')

// Profile Model
const Profile = require('../../models/Profile')

// Validation 
const validatePostInput = require("../../validation/post")

//Now instead of using "app.get" we can use "router.get()"

//this route goes to localhost:5000/api/users/test. We don't have to include that whole string because it is taken care of in the server.js variables.

// @route   GET api/posts/test
// @desc    Tests post route 
//access    Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api/posts/
// @desc    Get posts 
// access    Public (change to private later)

router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: "No posts found." }));
})

// @route   GET api/posts/:id
// @desc    Get posts by id
// access    Public (change to private later)

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: "No post found with that ID." }));
})

// @route   DELETE api/posts/:id
// @desc    DELETE posts by id
// access   Private

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: "User not authorized" })
                    }

                    //Delete
                    post.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        })
})

// @route   POST api/posts/
// @desc    Create post  
//access    Private

router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        firstName: req.body.firstName,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});


// @route   POST api/posts/like/:id
// @desc    Like posts by id
// access   Private

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check to see if user has already liked the post.
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyliked: "User already liked this post" });
                    }

                    // Add user ID to likes array
                    post.likes.unshift({ user: req.user.id });

                    // Saves to database

                    post.save().then(post => res.json(post));


                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        })
})


// @route   POST api/posts/unlike/:id
// @desc    Unlike posts by id
// access   Private

router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check to see if user has already liked the post.
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notliked: "You have not yet liked this post" });
                    }

                    // Get remove index
                    const removeIndex = post.likes.map(item => item.user.toString())
                    .indexOf(req.user.id);

                    //Splice out of the array
                    post.likes.splice(removeIndex, 1);

                    //Save to database
                    post.save().then(post => res.json(post));


                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        })
})

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// access   Private

router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) =>{
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
    .then(post => {
        const newComment = {
            text: req.body.text,
            firstName: req.body.firstName,
            avatar: req.body.avatar,
            user: req.user.id
        }

        // Add to comments array
        post.comments.unshift(newComment);

        //Save

        post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found."}))
})

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment from post
// access   Private

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
            return res.status(404).json({ commentnotexists: "Comment does not exist"});
        }
         
        // Get Remove Index
        const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);

        //Splice comment out of array
        post.comments.splice(removeIndex, 1);

        // Save to DB
        post.save().then(post => res.json(post));
        
    })
    
    .catch(err => res.status(404).json({ postnotfound: "No post found."}))

    })



module.exports = router;
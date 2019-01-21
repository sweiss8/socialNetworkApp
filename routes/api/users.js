//Authentication: username, email, password, etc.
const express = require('express');
const router = express.Router();

//Now instead of using "app.get" we can use "router.get()"

//this route goes to localhost:3000/api/users/test. We don't have to include that whole string because it is taken care of in the server.js variables.

// @route   GET api/users/test
// @desc    Tests users route 
//access    Public
router.get('/test', (req, res) => res.json({ msg: 'User Works'}));

module.exports = router;
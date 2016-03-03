var express = require('express');
var User = require('../models/users');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var authroute = express.Router();

module.exports = function (app) {
//register
authroute.post('/register', function(req, res){
  console.log('req', req.headers);
  //create new user
  var new_user = new User ({
    email: req.body.email,
    name: req.body.username, 
    password: req.body.password,
    admin: false 
  });
  // save the sample user
  new_user.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// route to authenticate a user (POST http://localhost:8080/api/login)
authroute.post('/login', function(req, res) {

  User.findOne({ 'email': req.body.email, 'password': req.body.password }, 'email password', function (err, person) {
    if (err) return handleError(err);
    if  (!person) {
      res.json({success: false, message: 'Authentication failed. User not found.'});
    }
    else {
      // if user is found and password is right
      // create a token
      var token = jwt.sign(person, app.get('superSecret'), {
        expiresInMinutes: 1440 // expires in 24 hours
      });

        // return the information including token as JSON
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    }
  });
});
return authroute
}
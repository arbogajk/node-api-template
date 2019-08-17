var express = require('express');
var router = express.Router();
var User = require('../users/userModel');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../../../configs/config');
var VerifyToken = require('./verifyToken');
var registerUser = require('./registerUser');
var logger = require('../../../utils/logger');

router.post('/register', function(req, res,next) {
     registerUser(req,res,next);
 });
router.post('/login', function(req, res,next) {
    User.findOne({ username: req.body.username },'+password', function (err, user) {
      if (err){
          return next(err);
      }
      if (!user){
        const err = {status: 404, message: "no user found."}
        return next(err);
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      var expiresIn = 86400;
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: expiresIn // expires in 24 hours
      });
 
      res.status(200).send({ auth: true, token: token, user:user, expiresIn: expiresIn });
    });
  });
  router.get('/logout', VerifyToken, function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });
  router.get('/currentIdentity', VerifyToken, function(req, res, next){
    return res.json({auth: true, id: req.id})
  });
  module.exports = router;
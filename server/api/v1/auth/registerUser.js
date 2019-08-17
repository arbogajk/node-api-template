var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../users/userModel');
var config = require('../../../../configs/config');

module.exports = function(req, res, next) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        firstname : req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email : req.body.email,
        password : hashedPassword,
        dietTypes: req.body.dietTypes
        }
    ,
    function (err, user) {
    if (!err) {
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        var sanitizedUser = user;
        delete sanitizedUser.password;
        user = sanitizedUser;
        return res.status(201).json({ auth: true, token: token, user: user });
    }else{
        return next(err);
    }
    });
}

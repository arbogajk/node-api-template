var jwt = require('jsonwebtoken');
var config = require('../../../../configs/config');
function verifyToken(req, res, next) {
  if(req.headers.authorization) 
  {
    var token = req.headers.authorization.replace('Bearer ', '');
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      // if everything good, save to request for use in other routes
      req.id = decoded.id;
      next();
    });
  }
  else{
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
}
module.exports = verifyToken;
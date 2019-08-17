
module.exports = function(req, res, next){
    if(req.id.toString() === req.user._id.toString()){
        next();
    }
    else{
       res.status(403).send("Unauthorized action");
    }  
}


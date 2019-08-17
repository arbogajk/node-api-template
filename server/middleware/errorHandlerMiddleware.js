const fs = require('fs');
const config = require('../../configs/config');
require('../utils/stringExtensions');

const errorLogger = (err, req, res, next) => {
    if(config.logging === true ) {
        const dateNow = new Date();
        console.log("inside error middleware now")
       // const logMessage = '\n' + dateNow + '\t' + err.message + '\n';
        const logMessage = "\n{date}\tmessage: {errorMessage}\n".format({date: dateNow, errorMessage: err.message});
        console.log(err.message);
        
        fs.appendFile(config.logPath + 'nodeserverlog.txt', logMessage,function(err){
            if(err) {
                console.log("error writing log " + err)
            }
            return next();
        });

        if(err.status)
        {
            res.status(err.status).send(err.message);
        }
        else {
            res.status(500).send(err.message);
        }
    }
           
    return next();
}

module.exports = errorLogger;
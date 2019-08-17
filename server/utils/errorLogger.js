const fs = require('fs');
const config = require('../../configs/config');

const errorLogger = function(err, req, res, next) {
    console.log(err)
        if(config.logging===true)
        {
            const dateNow = new Date();

            const logMessage = '\n' + dateNow + '\t' + err.message + '\n';
        
            console.log(err.message);
            
            fs.appendFile(config.logPath + 'nodeserverlog.txt', logMessage,function(err){
            if(err) {
                console.log("error writing log " + err)
            }
                return next();
            });
        }
        if(err.status)
        {
            res.status(err.status).send(err.message);
        }
        else{
            res.status(500).send(err.message);
        }
    return next();
}

module.exports = errorLogger;
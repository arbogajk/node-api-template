const fs = require('fs');
const config = require('../../configs/config');

module.exports.logger = function(req, res, next, message){
    if(config.logging===true)
    {
        const dateNow = new Date();
        var logMessage = '\n' + dateNow + '\t' + message + '\n';
        logMessage += 'Request: ' + req.baseUrl + '\t' + req.body
        console.log(message);
        fs.appendFile(config.logPath + 'nodeserverdebuglog.txt', logMessage,function(err){
           if(err){
               console.log("error writing log " + err)
           }
           
        });
    }
}

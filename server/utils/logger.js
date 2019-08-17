require('colors');
const _ = require('lodash');
const config = require('../../configs/config');

const noop = function(){};

const consoleLog = config.logging ? console.log.bind(console) : noop;

const logger = {
    log: function(){
        const args = _.toArray(arguments)
            .map(function(arg){
                if(typeof arg === 'object'){
                    var string = JSON.stringify(arg, 2);
                    return string.magenta;
                }else{
                    arg+='';
                    return arg.magenta;
                }
            });
            consoleLog.apply(console, args);
    }
}
module.exports = logger;
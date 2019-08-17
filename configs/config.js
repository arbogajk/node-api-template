//example config - this section is like the base config
const _ = require('lodash');
var path = require('path');
var envPath= path.resolve("./" + process.env.NODE_ENV + ".env");

require('dotenv').config({path: envPath});

const config = {
   dev: 'development',
   local: 'local',
   prod: 'production',
   port: process.env.PORT || 3000,
   secret: process.env.API_SECRET
};
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;
///can load up different env configs here
//development.js
//production.js
//testing.js
var envConfig;
try {
    envConfig = require('./' + config.env);
    envConfig = envConfig || {};
}catch(e){
    envConfig = {};
}

module.exports = _.merge(config, envConfig);
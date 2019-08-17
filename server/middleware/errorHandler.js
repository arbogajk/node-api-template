const errorHandler = require('../utils/errorLogger');
module.exports = function(app){
    app.use(errorHandler());
}

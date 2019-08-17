const mongoose = require('mongoose');
const config = require('../../../../configs/config');

mongoose.connect(config.db.host, config.db.options)
    .then()
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });
    
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
        productName: {type: String, required: true},
        period: {type: Number, required: true},
        expirationDate: {type: Date, required: true},
        startDate: {type: Date, required: true}
});

module.exports = mongoose.model('subscription', SubscriptionSchema);
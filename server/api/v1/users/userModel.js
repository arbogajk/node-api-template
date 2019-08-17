
const mongoose = require('mongoose');
const config = require('../../../../configs/config');

mongoose.connect(config.db.host, config.db.options)
    .then()
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });
    
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {type:String, required: true,unique: true},
    password: {type: String, required: true, select: false},
    firstname: {type:String, required: true},
    lastname: {type: String},
    subscriptions: [{type: Schema.Types.ObjectId, ref:'subscription'}],
});

UserSchema.options.toJSON = UserSchema.options.toJSON || {};
//removes sensitive fields before sending object back
UserSchema.options.toJSON.transform = (doc, ret, options) => {
    delete ret.password;
    return ret;
}

module.exports = mongoose.model('user', UserSchema);

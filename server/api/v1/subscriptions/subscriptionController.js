const Subscription = require('./subscriptionModel');
var _ = require('lodash');

exports.params = function(req, res, next, id){
    Subscription.findById(id)
        .then(function(subscription){
            if(!subscription){
                next(new Error('No subscription with that id'));
            }else{
                req.subscription = subscription;
                next();
            }
        }, function(err){
            next(err);
        });
};

exports.get = function(req, res, next) {
    Subscription.find({})
        .then(function(subscriptions){
            res.json(subscriptions);
        })
};
exports.getOne = function(req, res, next){
    const subscription = req.subscription;
    res.json(subscription);
};
exports.put = function(req, res, next){
    const subscription = req.subscription;
    const update = req.body;

    _.merge(subscription, update);
    subscription.save(function(err, saved){
        if(err){
            next(err);
        }else{
            res.json(saved);
        }
    });
};
exports.post = function(req, res, next){
    const newsubscription = req.body;
    subscription.create(newsubscription)
        .then(function(subscription){
            res.json(subscription);
        }, function(err){
            next(err);
        });
};

exports.delete = function(req, res, next){
    req.subscription.remove(function(err, removed){
        if(err){
            next(err);
        }else{
            res.json(removed);
        }
    });
};
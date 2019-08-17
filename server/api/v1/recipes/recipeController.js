const DB = require('meallab.db');
const Recipe = DB.models.recipeModel;
const paginatedUtility = require('../../../utils/paginationUtility');
const rabbitMqService = require('rabbitmq.service');
const config = require('../../../../configs/config');
const _ = require('lodash');
exports.params = function(req, res, next, id){
    Recipe.findById(id)
        .then((recipe) =>
        {
            if(!recipe) {
                next(new Error('No recipe with that id'));
            } 
            else {
                req.recipe = recipe;
                next();
            }
        },
        (err) => {
            next(err);
        });
};

exports.get = function(req, res, next){
    var page = req.query.page;
    var itemsPerPage = req.query.itemsperpage;
    Recipe.find({})
        .then(function(recipes){
            if(page){
                res.json(paginatedUtility.paginateResults(recipes, page, itemsPerPage ));
            }
            else {
                res.json(recipes);
            }
            
        });
};
exports.getOne = function(req, res, next){
    const recipe = req.recipe;
    res.json(recipe);
};
exports.put = function(req, res, next){
    const recipe = req.recipe;
    const update = req.body;

    _.merge(recipe, update);
    recipe.save(function(err, saved){
        if(err){
            next(err);
        }else{
            res.json(saved);
        }
    })
};
exports.post = function(req, res, next){
    const newRecipe = req.body;

    Recipe.create(newRecipe)
        .then(function(recipe){
            res.json(recipe);
        }, function(err){
            next(err);
        });
};

exports.postRecipeImage = function(req, res, next) {
    var filename = req.recipe._id + '_' + req.file.originalname.replace(' ', '_');

    req.recipe.images.push({title: filename, url: '/known'})
    req.recipe.save();
    res.send("created image").status(201)
};

exports.postMediaProcessing = function(req, res, next) {
    //Need to do something with type (recipe, nutrition info)
    console.log(req.body.resourcetype)
    var filename = req.filename;
    var resourceType =  req.body.resourcetype;
    rabbitMqService.commands.sendMessage(filename,resourceType);
    res.send("uploaded media, processing ...").status(201);
};

exports.delete = function(req, res, next){
    req.recipe.remove(function(err, removed){
        if(err){
            next(err);
        }else{
            res.json(removed);
        }
    });
};

exports.deleteMultimedia = function(req, res, next) {
    var recipe= req.recipe;
    var mmid = req.params.imageid;
  
    var image = recipe.images.find( r => r._id.toString() === mmid.toString());
  
    if(image) {
        var newImages = recipe.images.filter((r) => r._id.toString() !== mmid.toString());
        recipe.images = newImages;
        recipe.save((err, saved) => {
            if(err) {
                err.message = 'something happened';
                next(err)
            }else {
                res.json(saved);
            }
        });
    }  
};
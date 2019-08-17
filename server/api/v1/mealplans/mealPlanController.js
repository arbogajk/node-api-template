const DB = require('meallab.db');
const MealPlan = DB.models.mealPlanModel;
const _ = require('lodash');
const groceryListProcessor = require('../../../bll/groceryListProcessor');
const mealPlanGenerator = require('../../../bll/mealPlanGenerator');

exports.params = function(req, res, next, id){
        MealPlan.findById(id)
            .populate('meals.recipe')
            .then(function(mealplan)
            {
                if(!mealplan){
                    next(new Error('No meal plan with that id'));
                }else{
                    req.mealplan = mealplan;
                    next();
                }
            },
            function(err){
                err.message = 'failed to get Meal Plan';
                next(err);
        });
};
exports.get = function(req, res, next){
    MealPlan.find({})
        .populate('meals.recipe')
        .exec()
        .then(function(mealplans){
            res.json(mealplans);
        }, function(err){
            err.message = 'failed to get all meal plans';
            next(err);
        });
};
exports.getOne = function(req, res, next){
    const mealPlan = req.mealplan;
    res.json(mealPlan);
};
exports.put = function(req, res, next){
    const mealplan = req.mealplan;
    const update = req.body;

    _.merge(mealplan, update);
    mealplan.save(function(err, saved){
        if(err){
            err.message = 'failed to save mealplan';
            next(err);
        }else{
            res.json(saved);
        }
    })
};
exports.post = function(req, res, next){
    const newMealPlan = req.body;
    if(!newMealPlan.createdBy || newMealPlan.createdBy === ''){
        newMealPlan.createdBy = req.id;
    }
    MealPlan.create(newMealPlan)
        .then(function(mealPlan){
            res.json(mealPlan);
        }, function(err){
            err.message = 'failed to create meal plan';
            next(err);
        });
};
exports.delete = function(req, res, next){
    req.mealplan.remove(function(err, removed){
        if(err){
            next(err);
        }else{
            res.json(removed);
        }
    });
};
exports.generateMealPlan = function(req, res, next) {
    mealPlanGenerator
    .generateMealPlan(req, res, next)
        .then((result) => {    
                 res.json(result);
             });
};
exports.getGroceries = function(req, res, next) {
    let startDate = req.query.startdate;
    let endDate = req.query.enddate;
    let meals = req.mealplan.meals;
    let groceryList = [];
    if(meals)
    {
        meals.forEach( meal => {
            if(meal && meal.recipe.ingredients) {
                meal.recipe.ingredients.forEach(ing => 
                {
                    groceryList.push(ing);
                });
            }
        });
        var processList = groceryListProcessor.processGroceryList(groceryList);

        res.json(processList);
    }
};
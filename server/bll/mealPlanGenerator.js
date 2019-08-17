const DB = require('meallab.db');
const MealPlan = DB.models.mealPlanModel;
const Recipe = DB.models.recipeModel;
const User = DB.models.userModel;

const _ = require('lodash');
const mealTimes = ['Breakfest', 'Lunch', 'Dinner'];
module.exports.generateMealPlan = async (req, res, next) => {
    let startDate = req.body.startdate;
    let endDate = req.body.enddate;
    let createdBy =  req.id;
    let baseMealPlan = new MealPlan({
        title: `Generated Meal Plan for ${startDate} - ${endDate}`,
        notes: '',
        startDate: startDate,
        endDate: endDate,
        createdBy: createdBy,
        dietTypes: [],
        meals:[],
        mealPlans:[]
    });
    await MealPlan.create(baseMealPlan);
    var usersDiets = await getUsersDietTypes(req.id);
    var recipes = await getRecipes(usersDiets);
    await generateDailyMealPlans(baseMealPlan,recipes);
    return baseMealPlan;
};

const generateDailyMealPlans = async (weekPlan, recipes) => {
    let currentDate = weekPlan.startDate;
    
    while(currentDate <= weekPlan.endDate) {
        const shuffled = recipes.sort(() => 0.5 - Math.random());
        let meals = [];
       // console.log(shuffled[0].mealTimes)
        var breakfastRecipe = shuffled
                                .filter(
                                    (item) => {
                                    return item.mealTimes
                                        .find((f) => {
                                           
                                            console.log(f)
                                            return f.name === 'Breakfast'
                                        })
                                    });
        var lunchRecipe = shuffled.filter((item) => item.mealTimes.includes('Lunch'));
        var dinnerRecipe = shuffled.filter((item) => item.mealTimes.includes('Dinner'));
      // console.log(lunchRecipe)
        var breakfastMeal = 
        {
            recipe: breakfastRecipe._id,
            mealTime: 'Breakfast',
            notes:""
        };
        var lunchMeal = 
        {
            recipe: lunchRecipe._id,
            mealTime: 'Lunch',
            notes:""
        };
        var dinnerMeal = 
        {
            recipe: dinnerRecipe._id,
            mealTime: 'Dinner',
            notes:""
        };
        meals.push(breakfastMeal);
        meals.push(lunchMeal);
        meals.push(dinnerMeal);
        console.log(breakfastMeal)
        // // Get sub-array of first n elements after shuffled
        // let selected = shuffled.slice(0, 3);
      

        var mealPlan = new MealPlan({
            title: `Meal Plan for ${currentDate}`,
            startDate: currentDate,
            endDate: new Date(currentDate.getDate() + 1),
            meals: meals,
            createdBy: weekPlan.createdBy
        });
        MealPlan.create(mealPlan)
        weekPlan.mealPlans.push(mealPlan);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    weekPlan.save();
}
const getRecipes = (userDietTypes) => {
    if(userDietTypes.length > 0){
        return Recipe.find({dietTypes:userDietTypes}).exec();
    }
    else {
        return Recipe.find({}).exec();
    }
};

const getUsersDietTypes = (id) => {
   return User.findById(id).select('dietTypes').exec();
}
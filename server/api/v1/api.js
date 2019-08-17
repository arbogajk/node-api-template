const router = require('express').Router();
const userRouter = require('./users/userRoutes');
const recipeRouter = require('./recipes/recipeRoutes');
const mealPlanRouter = require('./mealplans/mealPlanRoutes')
const verifyToken = require('./auth/verifyToken');
router.use('/users',verifyToken, userRouter);
router.use('/recipes', verifyToken, recipeRouter );
router.use('/mealplans', verifyToken, mealPlanRouter);
router.use('/auth', require('./auth/authController'));
module.exports = router;
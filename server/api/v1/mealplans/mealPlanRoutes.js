/**
 * @swagger
 *
 * /mealplans:
 *   post:
 *     description: Create a new meal plan
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: create a new meal plan
 */


const router = require('express').Router();
const logger = require('../../../utils/logger');
const controller = require('./mealPlanController');
logger.log()
router.param('id', controller.params);
router.param('startdate', controller.params);

router.route('/')
    .get(controller.get)
    .post(controller.post);
router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete);
router.route('/:id/grocerylist')
    .get(controller.getGroceries);

router.route('/generate')
    .post(controller.generateMealPlan);

module.exports = router;
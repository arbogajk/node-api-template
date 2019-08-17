const router = require('express').Router();
const controller = require('./recipeController');
const mediaUtility = require('../../../utils/fileUploadUtility');

router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(controller.post);
router.route('/fromfile')
    .post(mediaUtility.upload.single('sourcefile'), controller.postMediaProcessing);
router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete);
router.route('/:id/multimedia')
    .post(mediaUtility.upload.single('recipeimage'),controller.postRecipeImage)
router.route('/:id/multimedia/:imageid')
    .delete(controller.deleteMultimedia);
module.exports = router;
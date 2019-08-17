const router = require('express').Router();
const userRouter = require('./users/userRoutes');
const verifyToken = require('./auth/verifyToken');
router.use('/users',verifyToken, userRouter);
router.use('/auth', require('./auth/authController'));
module.exports = router;
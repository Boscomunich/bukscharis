import express from '../index';
const router = express.Router();
const { registerUser, createUserProfile, logIn } = require('../controllers/Users')

router.route('/register').post(registerUser)
router.route('/profile').post(createUserProfile)
router.route('/login').post(logIn)

module.exports = router
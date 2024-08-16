import express from '../index';
const router = express.Router();
const { registerAdmin, logInAdmin } = require('../controllers/admin/AdminUsers')

router.route('/register').post(registerAdmin)
router.route('/login').post(logInAdmin)

module.exports = router
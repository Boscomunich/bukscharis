import express from '../index';
const router = express.Router();

const { createOrder } = require('../controllers/Orders')

router.route('/').post(createOrder)

module.exports = router
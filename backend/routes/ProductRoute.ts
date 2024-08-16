import express from '../index';
const router = express.Router();
const { uploadProduct, updateProductDetails, getAllProduct,  upload } = require('../controllers/admin/Product')
const { likePost, unlikePost } = require('../controllers/Likes')

router.route('/').get(getAllProduct).post(upload.array('picture', 12), uploadProduct)
router.route('/update').put(updateProductDetails)
router.route('/like').post(likePost).put(unlikePost)

module.exports = router
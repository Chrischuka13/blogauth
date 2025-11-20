const { getBlog, createBlog, getSingleBlog, updateBlog, deleteBlog } = require('../controllers/blogController')

const router = require('express').Router()



router.route('/').get(getBlog).post(createBlog)
router.route('/:blogId').get(getSingleBlog).patch(updateBlog).delete(deleteBlog)

module.exports = router
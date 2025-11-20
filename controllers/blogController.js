const Blog = require('../models/blog')

const createBlog = async (req, res) => {
    // res.send('created')
    // console.log(req.user);
    const {userId} = req.user
    req.body.createdby = userId

    try {
        const blog = await Blog.create(req.body)
        res.status(201).json({success: true, blog})
    } catch (error) {
        res.json({error})
    }
    
}

const getBlog = async (req, res) => {
    // res.send('get all blogs')
    const {userId} = req.user
    try {
        const blog = await Blog.find({createdby: userId}) 
        res.status(200).json({success: true, blog})
    } catch (error) {
        res.json({error})
    }
}

const getSingleBlog = async (req, res) => {
    // res.send('single blog')
    const {userId} = req.user
    const {blogId} = req.params

    try {
        const blog = await Blog.findOne({createdby: userId, _id: blogId})
        res.status(200).json({success: true, blog})
    } catch (error) {
        res.json({error})
    }
}

const updateBlog = async (req, res) => {
    // res.send('update blog')
    const {userId} = req.body
    const {blogId} = req.params

    try {
        const blog = await Blog.findByIdAndUpdate({createdby: userId, _id: blogId},
        req.body, {new: true}, {runValidator: true})
        res.status(200).json({success: true, blog})
    } catch (error) {
        res.json({error})
    }
}

const deleteBlog = async (req, res) => {
    // res.send('delete blog')
    const {userId} = req.user
    const {blogId} = req.params

    try {
        const blog = await Blog.findByIdAndDelete({createdby: userId, _id: blogId })
        res.status(200).json({success: true, msg: 'blog successfully deleted'})
    } catch (error) {
        ers.json({error})
    }
}

module.exports = {createBlog, getBlog, getSingleBlog, updateBlog, deleteBlog}
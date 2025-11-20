const Student = require('../models/student')

const createStudentPortal = async (req, res) => {
    const {userId} = req.user
    req.body.createdby = userId
    try {
        const portal = await Student.create(req.body)
        res.status(201).json({success: true, portal})
    } catch (error) {
        res.json({error})
    }
}

const viewStudentsPortal = async (req, res) => {
    const {userId} = req.user
    try {
        const portal = await Student.find({createdby: userId})
        res.status(201).json({success: true, portal})
    } catch (error) {
        res.json({error})
    }
}

const viewSingleStudentPortal = async (req, res) => {
    const {userId} = req.user
    const {studentId} = req.params
    try {
        const portal = await Student.findOne({createdby: userId, _id: studentId})
        res.status(200).json({success: true, portal})
    } catch (error) {
        res.json({error})
    }
}

const updateStudentPortal = async (req, res) => {
    const {userId} = req.user
    const {studentId} = req.params
    try {
        const portal = await Student.findByIdAndUpdate({createdby: userId, _id:studentId}, req.body,
        {new: true}, {validator: true})
        res.status(200).json({success: true, portal})
    } catch (error) {
        res.json({error})
    }
}

const deleteStudentPortal = async (req, res) => {
    const {userId} = req.user
    const {studentId} = req.params
    try {
        const portal = await Student.findByIdAndDelete({createdby: userId, _id: studentId})
        res.status(200).json({success: true, msg: 'student successfully deleted'})
    } catch (error) {
        res.json({error})
    }
}

module.exports = {createStudentPortal, viewStudentsPortal, viewSingleStudentPortal, updateStudentPortal, deleteStudentPortal}
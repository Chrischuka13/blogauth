const { createStudentPortal, viewStudentsPortal, viewSingleStudentPortal, updateStudentPortal, deleteStudentPortal } = require('../controllers/studentController')

const router = require('express').Router()


router.route('/').post(createStudentPortal).get(viewStudentsPortal)
router.route('/:studentId').get(viewSingleStudentPortal).patch(updateStudentPortal).delete(deleteStudentPortal)

module.exports = router
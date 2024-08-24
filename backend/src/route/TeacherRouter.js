// const express = require('express');
// const router = express.Router();
// const TeacherController = require('../controller/TeacherController');

// router.get('/', TeacherController.GetAllData);
// router.post('/', TeacherController.Create);
// router.get('/:id', TeacherController.GetSingleID);
// router.put('/:id', TeacherController.Update);
// router.delete('/:id', TeacherController.DeleteTeacher);
// // router.get('/',TeacherController.Paginate);

// module.exports = router;


const express = require('express');
const { DeleteTeacher,Update,GetSingleID,GetAllData,Create } = require('../controller/TeacherController');

const router = express.Router();
router.get('/', GetAllData);
router.post('/', Create);
router.get('/:id', GetSingleID);
router.put('/:id', Update);
router.delete('/:id', DeleteTeacher);
module.exports = router;

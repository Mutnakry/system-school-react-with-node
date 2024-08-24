const express = require('express');
const {Create,GetAllData,GetDataSingle,DeleteData,UpdateData } = require('../controller/ClassroomController');

const router = express.Router();

router.post('/', Create);
router.get('/',GetAllData);
router.get('/:id',GetDataSingle);
router.delete('/:id', DeleteData);
router.put('/:id', UpdateData);

module.exports = router;


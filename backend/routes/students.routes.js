const express = require('express')
const router = express.Router()
const students = require('../controllers/student.controller');

router.get('/students', students.getAll);
router.post('/students', students.create);
router.get('/students/:studentId', students.getOne);
router.put('/students/:studentId', students.update);
router.delete('/students/:studentId', students.delete);

module.exports = router;

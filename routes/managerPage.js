const express = require('express');
const controller = require('../controllers/managerPage');
const router = express.Router();
const passport = require('passport');

//localhost:1337/api/managerPage
router.post('/', passport.authenticate('jwt', { session: false }), controller.getmyTasks);

//localhost:1337/api/managerPage/:personId
router.get('/:personid', passport.authenticate('jwt', { session: false }), controller.getmyTasksForPerson);


module.exports = router;
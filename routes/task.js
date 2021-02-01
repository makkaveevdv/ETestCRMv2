const express = require('express');
const controller = require('../controllers/task');
const passport = require('passport');
const router = express.Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getTask);
router.post('/create', passport.authenticate('jwt', { session: false }), controller.create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

module.exports = router;
const Task = require('../models/Task.js');
const errorHandler = require('../utils/errorHandler.js');

module.exports.getTasksforme = async function (req, res) {
    try {   
        const tasks = await Task.findForPerson(+req.user.id, +req.body.limit, +req.body.offset, +req.body.datefilter);
        res.status(200).json(tasks);
    } catch (e) {
        errorHandler(res, e);
    };
};
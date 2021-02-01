const Task = require('../models/Task.js');
const errorHandler = require('../utils/errorHandler.js');


module.exports.getmyTasks = async function (req, res) {
    try {
        const myTasks = await Task.findForManager(req.user.id, +req.query.limit, +req.query.offset, +req.query.datefilter);
        res.status(200).json(myTasks);
    } catch (e) {
        errorHandler(res, e);
    };
};

module.exports.getmyTasksForPerson = async function (req, res) {
    try {
        const myTasks = await Task.findForManagerForPerson(req.user.id, req.params.personid, +req.query.limit, +req.query.offset, +req.query.datefilter);
        res.status(200).json(myTasks);
    } catch (e) {
        errorHandler(res, e);
    };
};
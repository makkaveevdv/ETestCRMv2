const Task = require('../models/Task.js');
const errorHandler = require('../utils/errorHandler.js');

module.exports.getTask = async function (req, res) {
    try {
        const task = await Task.getTaskById(req.params.id);
        
        res.status(200).json(task);
    } catch (e) {
        errorHandler(res, e);
    };
};

module.exports.create = async function (req, res) {
    try {
        const newTask = new Task(req.body.name, req.body.description, new Date(req.body.enddate), new Date, new Date, req.body.priority, req.body.status, +req.user.id, +req.body.resppersonid);
        let control = await newTask.save();
        res.status(201).json({
            message: 'Task was created.'
        });

    } catch (e) {
        errorHandler(res, e);
    };
};

module.exports.remove = async function (req, res) {
    try {
        await Task.removeTask(req.params.id);
        res.status(200).json({
            message: 'Task was deleted.'
        });
    } catch (e) {
        errorHandler(res, e);
    };
};

module.exports.update = async function (req, res) {
    try {
        var dateNow = new Date();
        const beforeTask = await Task.getTaskById(req.params.id);
        const afterTask = new Task(
            req.body.name == null || '' ? beforeTask.name : req.body.name,
            req.body.description == null || '' ? beforeTask.description : req.body.description,
            req.body.enddate == undefined || '' ? beforeTask.enddate : req.body.enddate,
            beforeTask.createdate,
            dateNow,
            req.body.priority == null || '' ? beforeTask.priority : req.body.priority,
            req.body.status == null || '' ? beforeTask.status : req.body.status,
            beforeTask.creatorid,
            req.body.resppersonid == null || '' ? beforeTask.resppersonid : req.body.resppersonid
        );
        await afterTask.updateTask(req.params.id);
        res.status(200).json({
            message: 'Task was update.'
        });
    } catch (e) {
        errorHandler(res, e);
    };
};
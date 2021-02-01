const db = require('../db');
var values = [];

module.exports = class Task {
    constructor(name, description, endDate, createDate, updateDate, priority, status, creatorId, resppersonId) {
        this.name = name;
        this.description = description;
        this.endDate = endDate;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.priority = priority;
        this.status = status;
        this.creatorId = creatorId;
        this.resppersonId = resppersonId;

        values = [];
        values.push(name, description, endDate, createDate, updateDate, priority, status, creatorId, resppersonId);
    };
    async save() {
        const newTask = await db.query('INSERT INTO task (name, description, endDate, createDate, updateDate, priority, status, creatorId, resppersonId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            values);
        values = [];
        if (newTask.rowCount > 0) return true;

    };

    static async removeTask(taskId) {
        values = [];
        values.push(taskId);
        await db.query('DELETE FROM task WHERE id = $1', values);
        values = [];
    };
        
    async updateTask(taskId) {
        values.push(taskId);
        await db.query('UPDATE task SET name = $1, description = $2, endDate = $3, createDate = $4, updateDate = $5, priority = $6, status = $7, creatorId = $8, resppersonId = $9 WHERE id = $10',
            values);
        values = []; 
    };

    static async getTaskById(taskId) {
        values = [];
        values.push(taskId);
        const task = await db.query('SELECT *, enddate::text FROM task WHERE id = $1', values);
        values = [];
        if (task.rowCount > 0) return task.rows[0]; else return false; 
        
    };

    static async findForPerson(personId, limit, offset, datefilter) {

        values = [];
        const dateFlt = new Date();
        if (!limit) limit = null;
        if (!offset) offset = null;
        switch (datefilter) {
            case 1: dateFlt.setHours(dateFlt.getHours() + 24); break;
            case 7: dateFlt.setDate(dateFlt.getDate() + 7); break;
            case 0: dateFlt.setFullYear(dateFlt.getFullYear() + 2000); break;
            default: dateFlt.setFullYear(dateFlt.getFullYear() + 2000);
        }
        values.push(personId, limit, offset, dateFlt);

        const taskObjects = (await db.query('SELECT t.*, t.enddate::text, (t.enddate - now())::varchar AS controlenddate, p.id AS rp_id, p.fname AS rp_fn, p.mname AS rp_mn, p.lname AS rp_ln FROM task t JOIN person p ON t.resppersonid = p.id WHERE t.resppersonId = $1 AND t.endDate <= $4 ORDER BY updateDate LIMIT $2 OFFSET $3', values));

        if (taskObjects.rowCount > 0) {
            values = [];
            return taskObjects.rows;
        } else {
            values = [];
            return false;
        }
    };

    static async findForManager(managerId, limit, offset, datefilter) {
        values = [];
        const dateFlt = new Date();
        if (!limit) limit = null;
        if (!offset) offset = null;
        switch (datefilter) {
            case 1: dateFlt.setHours(dateFlt.getHours()+24); break;
            case 7: dateFlt.setDate(dateFlt.getDate() + 7); break;
            case 0: dateFlt.setFullYear(dateFlt.getFullYear() + 2000); break;
            default: dateFlt.setFullYear(dateFlt.getFullYear() + 2000);
        }
        values.push(managerId, limit, offset, dateFlt);

        const taskObjects = (await db.query('SELECT t.*, t.enddate::text, (t.enddate - now())::varchar AS controlenddate, p.id AS rp_id, p.fname AS rp_fn, p.mname AS rp_mn, p.lname AS rp_ln FROM task t JOIN person p ON t.resppersonid = p.id WHERE t.creatorId = $1 AND t.endDate <= $4 ORDER BY updateDate LIMIT $2 OFFSET $3', values));
        if (taskObjects.rowCount > 0) {
            values = [];
            return taskObjects.rows;
        } else {
            values = [];
            return false;
        }
    };

    static async findForManagerForPerson(managerId, personId, limit, offset, datefilter) {

        values = [];
        const dateFlt = new Date();
        if (!limit) limit = null;
        if (!offset) offset = null;
        switch (datefilter) {
            case 1: dateFlt.setHours(dateFlt.getHours() + 24); break;
            case 7: dateFlt.setDate(dateFlt.getDate() + 7); break;
            case 0: dateFlt.setFullYear(dateFlt.getFullYear() + 2000); break;
            default: dateFlt.setFullYear(dateFlt.getFullYear() + 2000);
        }
        values.push(managerId, limit, offset, dateFlt, personId);

        const taskObjects = (await db.query('SELECT t.*, t.enddate::text, (t.enddate - now())::varchar AS controlenddate, p.id AS rp_id, p.fname AS rp_fn, p.mname AS rp_mn, p.lname AS rp_ln FROM task t JOIN person p ON t.resppersonid = p.id WHERE t.creatorId = $1 AND t.resppersonId = $5 AND t.endDate <= $4 ORDER BY updateDate LIMIT $2 OFFSET $3', values));
        if (taskObjects.rowCount > 0) {
            values = [];
            return taskObjects.rows;
        } else {
            values = [];
            return false;
        }
    };
};
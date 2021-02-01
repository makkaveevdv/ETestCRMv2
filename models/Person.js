const db = require('../db');
var values = [];
var control = [];

module.exports = class Person {
    constructor(email, fname, mname, lname, password, managerId) {
        this.email = email;
        this.fname = fname;
        this.mname = mname;
        this.lname = lname;
        this.password = password;
        this.managerId = managerId;
        values.push(email, fname, mname, lname, password, managerId);
    };
    async save() {
        const newPerson = await db.query('INSERT INTO person (email, fname, mname, lname, password, managerId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', values);
        if (newPerson.rowCount > 0) {
            values = [];
            return true;
        } else {
            values = [];
            return false;
        };
    };

    static async personExistsByEmail(emailValue) {
        control = [];
        control.push(emailValue);
        const personObject = (await db.query('SELECT p.*, m.fname AS man_f, m.mname AS man_m, m.lname AS man_l FROM person p LEFT OUTER JOIN person m ON p.managerid = m.id WHERE p.email = $1', control));
        if (personObject.rowCount > 0) {
            control = [];
            return personObject.rows[0];
        } else {
            control = [];
            return false;
        }        
    };

    static async personExistsById(idValue) {
        control = [];
        control.push(idValue);
        const personObject = (await db.query('SELECT p.*, m.fname AS man_f, m.mname AS man_m, m.lname AS man_l FROM person p LEFT OUTER JOIN person m ON p.managerid = m.id WHERE p.id = $1', control));
        if (personObject.rowCount > 0) {
            control = [];
            return personObject.rows[0];
        } else {
            control = [];
            return false;
        }
    };

    static async getRespPersons(idValue) {
        control = [];
        control.push(idValue);
        
        const respPersonsList = await db.query('SELECT * FROM person WHERE managerid = $1', control);
        

        if (respPersonsList.rowCount > 0) {
            control = [];
            return respPersonsList.rows;
        } else {
            control = [];
            return false;
        }
    };

    static async getAllPersons() {
        
        const allPersons = await db.query('SELECT id, email, fname, mname, lname, managerid FROM person');

        if (allPersons.rowCount > 0) {
            control = [];
            return allPersons.rows;
        } else {
            control = [];
            return false;
        }
    };
};
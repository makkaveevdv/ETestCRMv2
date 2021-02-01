
CREATE TABLE person(
	id SERIAL PRIMARY KEY NOT NULL,
	email VARCHAR(30) NOT NULL,
	fname VARCHAR(30) NOT NULL,
	mname VARCHAR(30),
	lname VARCHAR(30) NOT NULL,
	password VARCHAR(255) NOT NULL,
	managerId INTEGER DEFAULT NULL,
	FOREIGN KEY (managerId) REFERENCES person(id) ON DELETE SET NULL
);

CREATE TABLE task (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255),
	endDate date,
	createDate date,
	updateDate date,
	priority VARCHAR CHECK ( priority = 'Высокий' OR priority = 'Средний' OR priority = 'Низкий'),
	status VARCHAR CHECK ( status = 'К выполнению' OR status = 'Выполняется' OR status = 'Выполнена' OR status = 'Отменена'),
	creatorId INTEGER,
	resppersonId INTEGER,
	FOREIGN KEY (creatorId) REFERENCES person(id) ON DELETE SET NULL,
	FOREIGN KEY (resppersonId) REFERENCES person(id) ON DELETE SET NULL
);
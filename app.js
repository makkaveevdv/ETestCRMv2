const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const myPageRoutes = require('./routes/myPage');
const managerPageRoutes = require('./routes/managerPage');
const path = require('path');

const app = express();

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/myPage', myPageRoutes);
app.use('/api/managerPage', managerPageRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};



module.exports = app;
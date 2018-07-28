require('dotenv').config()
require('./models')
// require('ejs')
// const bodyParser = require('body-parser')
const express = require('express');
const app = express();
// const sequelize = require('./db')
// sequelize.sync();

// app.use(bodyParser.json());
app.use(require('body-parser').json());
app.set('view engine', 'ejs');

require('./routes')(app);

app.listen(3000, () => {
    console.log('process is started on port 3000')
})

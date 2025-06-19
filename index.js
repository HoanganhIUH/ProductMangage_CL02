const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require('./pool');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

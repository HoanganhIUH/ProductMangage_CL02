const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { pool } = require('./pool');
const productRoutes = require('./routes/product_route');

dotenv.config();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", productRoutes)



app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

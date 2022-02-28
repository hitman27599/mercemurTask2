const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('./db/db');
const productRoutes = require('./routes/api/ProductAPI');

const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

// routes
app.use('/api/products',productRoutes);

app.listen(port,(req,res)=>{console.log(`server running on port ${port}`)})
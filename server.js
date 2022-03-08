const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require("multer");
const path = require("path");


const db = require('./db/db');
const productRoutes = require('./routes/api/ProductAPI');
const brandRoutes = require('./routes/api/BrandAPI');
const stockRoutes = require('./routes/api/stockAPI');
const loginRoutes = require('./routes/api/loginAPI');
const registerRoutes = require('./routes/api/registerAPI');
const req = require('express/lib/request');


const port = process.env.PORT || 8000;

// middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

// routes
app.use('/api/login',loginRoutes);
app.use('/api/register',registerRoutes);
app.use('/api/products',productRoutes);
app.use('/api/brands',brandRoutes);
app.use('/api/stocks',stockRoutes);

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


app.listen(port,(req,res)=>{console.log(`server running on port ${port}`)})
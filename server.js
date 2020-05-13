'use strict';
//Require and mount dependencies...
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const mongodb = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

//Serve assets and html...
app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

//Check connections...
app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
console.log(mongoose.connection.readyState);

//Test API endpoint...
app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const name = req.file.originalname;
  const size = req.file.size;
  res.json({"name": name, "size": size});
});
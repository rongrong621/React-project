const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));




app.use('/user',require('./routers/user'));
// app.use('/search',require('./routers/search'));

app.use(express.static('view'));
mongoose.connect("mongodb://127.0.0.1:27017")

mongoose.connection.on('open',function(){
    console.log('链接成功')
    app.listen(80);
});



var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./router');

// app.use(express.static('public'));
app.use('/public/', express.static(__dirname + '/public'));

//安装body-parser 解析post 请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'art');

// routes
app.use(router);

app.use((req, res, next) =>{
    res.render('404.html')
 });

app.listen(8080, () => {
    console.log('http://localhost:8080');
})
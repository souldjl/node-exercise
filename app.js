/*
 * @Author: daijiulong@baidu.com
 * @Date: 2020-12-25 14:10:49
 * @LastEditTime: 2020-12-26 01:03:27
 * @Description: 
 * @FilePath: /exercise/app.js
 */
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
const { formatWithOptions } = require('util');


// app.use(express.static('public'));
app.use('/public/', express.static(__dirname + '/public'));

//安装body-parser 解析post 请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.engine('html', require('express-art-template'));
// app.set('view options', {
//     debug: process.env.NODE_ENV !== 'production'
// });
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'art');

// routes
app.get('/', function (req, res) {
    fs.readFile('./user.json', function (err, data) {
        if (err) {
            res.status(404).send(err.message)
        }
        res.render('index.html', {
            dashboards: ['art', 'template', 'nodejs'],
            users: JSON.parse(data).users
        });
    })
});

//删除
app.get('/students/delete', function (req, res) {
    console.log(req.query.id)
    var id = parseInt(req.query.id);
    fs.readFile('./user.json', function (err, data) {
        if (err) {
            res.status(404).send(err.message)
        }
        var users = JSON.parse(data).users;
        
        var index = users.findIndex(function(user){
            return user.id === id;
        });

        users.splice(index, 1);

        console.log(users)

        var data = JSON.stringify({
            "users": users
        })

        fs.writeFile('./user.json', data, function(err){
            if(err){
                console.log(err)
            }
            res.redirect('/')
        })
    })
});
// 编辑

// routes
app.get('/students/edit', function (req, res) {
    var id = parseInt(req.query.id);
    fs.readFile('./user.json', 'utf8', function(err,data){
        if(err){
            console.log(err)
        }
        var users = JSON.parse(data).users;
        var user = users.find(function(u){
            return u.id === id
        });

        console.log(user)
        res.render('edit.html', {
            user: user
        });
    })
   
});

app.post('/students/edit', function (req, res) {
    var id = parseInt(req.body.id);
    fs.readFile('./user.json', 'utf8', function(err,data){
        if(err){
            console.log(err)
        }
        var users = JSON.parse(data).users;
        var user = users.find(function(u){
            return u.id === id
        });

        user.name = req.body.name;
        user.sex = req.body.sex;
        user.age = req.body.age;
        user.hobbies = req.body.hobbies;
        user.level = req.body.level;
        
        var userIndex = users.findIndex(function(u){
            return u.id === id
        });

        users.splice(userIndex, 1, user)
        var result = JSON.stringify({
            users: users
        })

        console.log(userIndex, result)
        fs.writeFile('./user.json', result, function(err, data) {
            if(err) {
                res.status(500).end('server error')
            }
            res.redirect('/')
        })
       
    })
   
});

// routes
app.get('/students/add', function (req, res) {
    res.render('add.html', {
    });
});

app.post('/students/add', function (req, res) {
   var user = {
       name: req.body.name,
       age: req.body.age,
       hobbies: req.body.hobbies,
       level: req.body.hobbies
   };

   fs.readFile('./user.json', function (err, data) {
    if (err) {
        res.status(404).send(err.message)
    }
    var users = JSON.parse(data).users;
    var ids = users.map(function(user){
        return user.id
    });

    var maxid = Math.max.apply(null, ids);

    console.log(maxid)

    user.id = maxid + 1;
    users.push(user)
    var data = JSON.stringify({
        "users": users
    });

    fs.writeFile('./user.json', data, function(err,data) {
        if(err) {
            console.log(err)
            res.status(500).end('500 error')
        }
        res.redirect('/')
    })
})
});

app.use((req, res, next) =>{
    res.render('404.html')
 });

app.listen(8080, () => {
    console.log('http://localhost:8080');
})
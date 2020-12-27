var express = require('express');
var router = express.Router();
var User = require('./user-fs');

router.get('/', function (req, res) {
    User.getUser(function (err, data) {
        if (err) {
            res.status(500).end('service Error')
        }
        res.render('index.html', {
            dashboards: ['art', 'template', 'nodejs'],
            users: data
        });
    })
});

//删除
router.get('/students/delete', function (req, res) {
    var id = parseInt(req.query.id);
    User.deleteUserById(id, function (err) {
        if (err) {
            res.status(500).end('service Error')
        }
        res.redirect('/')
    });
});

// 编辑信息
router.get('/students/edit', function (req, res) {
    var id = parseInt(req.query.id);
    User.getUserById(id, function (err, data) {
        if (err) {
            res.status(500).end('service Error')
        }
        res.render('edit.html', {
            user: data
        });
    })
});

// 保存编辑接口
router.post('/students/edit', function (req, res) {
    var user = {};
    user.id = parseInt(req.body.id);
    user.name = req.body.name;
    user.sex = req.body.sex;
    user.age = req.body.age;
    user.hobbies = req.body.hobbies;
    user.level = req.body.level;

    User.updateUserById(user, function (err) {
        if (err) {
            res.status(500).end('service Error')
        }
        res.redirect('/')
    })
});

// 新增user
router.get('/students/add', function (req, res) {
    res.render('add.html', {
    });
});

// 新增user 接口
router.post('/students/add', function (req, res) {
    var user = {
        name: req.body.name,
        age: req.body.age,
        hobbies: req.body.hobbies,
        level: req.body.hobbies,
        sex: req.body.sex
    };

    User.addUser(user, function (err) {
        if (err) {
            res.status(500).end('service Error')
        }
        res.redirect('/')
    })
});

module.exports = router;
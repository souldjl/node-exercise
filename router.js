
var express = require('express');
var router = express.Router();
var User = require('./user');

console.log(User)

router.get('/', function (req, res) {
    User.find(function (err, data) {
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
    var id = req.query.id.replace(/"/g, '');
    User.deleteOne({_id: id}, function (err) {
        if (err) {
            res.status(500).end('service Error')
        }
        res.redirect('/')
    });
});

// 编辑信息
router.get('/students/edit', function (req, res) {
    console.log(req.query.id)
    var id = req.query.id.replace(/"/g, '');
    User.findOne({_id: id}, function (err, data) {
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
    var id = req.body.id.replace(/"/g, '');
    var user = {};
    user.name = req.body.name;
    user.sex = req.body.sex;
    user.age = req.body.age;
    user.hobbies = req.body.hobbies;
    user.level = req.body.level;
    console.log()

    User.findOneAndUpdate({_id: id},user, function (err) {
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
    var newUser = new User({
        name: req.body.name,
        age: req.body.age,
        hobbies: req.body.hobbies,
        level: req.body.level,
        sex: req.body.sex
    });

    newUser.save(function(err) {
        if (err) {
            return res.status(500).end('service Error')
        }
        res.redirect('/')
    })
});

module.exports = router;
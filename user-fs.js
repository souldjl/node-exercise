var fs = require('fs');

//获取user
exports.getUser = function (callback) {
    fs.readFile('./user.json', function (err, data) {
        if (err) {
            callback(err)
        }
        callback(null, JSON.parse(data).users)
    })
}

//根据id 删除user
exports.deleteUserById = function (id, callback) {
    fs.readFile('./user.json', function (err, data) {
        if (err) {
            callback(err)
        }
        var users = JSON.parse(data).users;

        var index = users.findIndex(function (user) {
            return user.id === id;
        });

        users.splice(index, 1);

        var data = JSON.stringify({
            "users": users
        })

        fs.writeFile('./user.json', data, function (err) {
            if (err) {
                callback(err)
            }
            callback(null)
        })
    })
}

// 根据id 获取编辑页面user信息
exports.getUserById = function (id, callback) {
    fs.readFile('./user.json', 'utf8', function (err, data) {
        if (err) {
            callback(err)
        }
        var users = JSON.parse(data).users;
        var user = users.find(function (u) {
            return u.id === id
        });

        if (user) {
            callback(null, user)
        } else {
            callback(null, [])
        }
    })
}

// 保存编辑接口
exports.updateUserById = function (user, callback) {
    fs.readFile('./user.json', 'utf8', function (err, data) {
        if (err) {
            callback(err)
        }
        var users = JSON.parse(data).users;

        var userIndex = users.findIndex(function (u) {
            return u.id === user.id
        });

        users.splice(userIndex, 1, user)
        var result = JSON.stringify({
            users: users
        })
        fs.writeFile('./user.json', result, function (err) {
            if (err) {
                callback(err)
            }
            callback(null)
        })
    })
}


// 新增user
exports.addUser = function (user, callback) {
    fs.readFile('./user.json', function (err, data) {
        if (err) {
            callback(err)
        }
        var users = JSON.parse(data).users;
        var ids = users.map(function (user) {
            return user.id
        });

        var maxid = Math.max.apply(null, ids);
        user.id = maxid + 1;
        users.push(user)
        var data = JSON.stringify({
            "users": users
        });

        fs.writeFile('./user.json', data, function (err) {
            if (err) {
                callback(err)
            }
            callback(null)
        })
    })
}


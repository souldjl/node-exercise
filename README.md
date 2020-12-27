<!--
 * @Author: daijiulong@baidu.com
 * @Date: 2020-12-25 11:10:12
 * @LastEditTime: 2020-12-27 22:14:55
 * @Description: 
 * @FilePath: /exercise/README.md
-->
### 设计文档
-fs文件为第一版本练习文件，第二版本切换为数据库mongoose
- 路由/接口设计

index | router | method | action
--- | ---|--- | ---
1 | / | get | 获取所有user
2 | /user/add | post | 增加一个user
3 | /user/edit?id=xxx | get | 获取id=xxx的user
4 | /user/edit?id=xxx | post | 编辑一个id=xxx的user
5 | /user/add | post | 添加一个新用户
6 | /user/delete?id=xxx | post | 删除id=xxx的用户
---

- 本地先启动mongo 
```shell
 cd /usr/local/mongodb/bin 
 ./mongo
```
- init
```shell
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')
var userSchema = mongoose.schema({name: string,...})
module.exports = mongoose.model('User', userSchema)
```
- 增删改查
```js
    var User = require('./user')
```
- 增
```js
var newUser = new User({name: req.body.name});
newUser.save(function(err,data){})
```

- 删
```js
User.remove({_id: req.query.id}, function(){})
```
- 改
```
User.findOneAndUpdate({_id:id}, {}, function())
```

- 查
```js
查全部: User.find(function(err, data){})
查所有: User.findOne({_id: req.query.id},function(err, data){})
```

 

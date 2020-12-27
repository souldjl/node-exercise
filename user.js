
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


var userSchema =  new mongoose.Schema({ 
    "name": {
        type: String,
        required: true
    },
    "age": {
        type: Number,
        required: true,
    },
    "hobbies": {
        type: String,
        required: true
    },
    "level": {
        type: Number,
        required: true
    },
    "sex": {
        type: String,
        enum: ['男', '女'],
        required: true
    },
 })
var User = mongoose.model('User', userSchema);
module.exports = User;
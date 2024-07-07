const mongoose = require('mongoose')

const userInfo = mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    googleId: {
        type: String,
        unique: false,
        default:null,
    },
    picture:{
        type: String,
        default:"https://images.pexels.com/photos/633432/pexels-photo-633432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    email_verified:{
        type: Boolean,
        default:false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model('UserInfo1',userInfo);

module.exports = userModel;
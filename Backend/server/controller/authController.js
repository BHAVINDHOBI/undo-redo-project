require("dotenv").config();
const userModel = require("../model/userModel.js");
const { generateToken } = require("../utils/generateJWT.js");
const jwt =require("jsonwebtoken");
const passport = require('passport');
const bcrypt = require('bcrypt');

const { Buffer } = require('safe-buffer');

exports.userRegistration = async (req, res) => {
    const {userName,email,password} = req.body; 
    try{
        const existingUser = await userModel.findOne({email:email});
        if (existingUser){
            return res.status(200).json({ success: false, message: "User already logged ",user:{}});  
        }
        else{
            const saltRounds = 10; 
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = new userModel({
                userName:userName,
                email:email,
                password:hashedPassword,
                email_verified:true,
            });

            const savedUser = await user.save();

            if (savedUser){
                const token =  generateToken(savedUser);

                return res.status(200).json({ success: true, message: 'User register successfully',
                    user :token,
                });
            }
            else {
                return res.status(200).json({ success: false, message: 'Registeration not successful!',user:{} });
            }
        }
    }
    catch(err){
        console.log("error = ",err)
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

exports.userLogin = async (req,res)=>{

    const {email,password} = req.body;
    try{
        const userExist = await userModel.findOne({email:email});
        if (userExist){
            const passwordMatch = await bcrypt.compare(password, userExist.password);
            if(passwordMatch){
                const token =  await generateToken(userExist);
                
                return res.status(200).json({ success: true, message: 'Login successfull',
                    user :token,
                }); 
            }
            else{
                return res.status(200).json({ success: false, message: 'password not match'}); 
            }
        }
        else{
            return res.status(200).json({ success: false, message: 'User Not Found',user :{}});  
        }
    }
    catch(err){
        console.log("error",err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// google 
exports.google = passport.authenticate("google",{ scope: ['profile', 'email'] })

exports.gCallbacks = passport.authenticate("google", {
    failureRedirect:`${process.env.CLIENT_URL}/login`,
    failureMessage: "Failed to authenticate with Google",
});


exports.getUserData = async (req, res) => {
    try {
      const userData = await userModel.findOne({email:req.decodedUserData.email});

      if (!userData) {
        return res.status(404).json({success: false, message: 'User not found' });
      }

      return res.status(200).json({ success: true, message: " User Data ",
        user :{userName:userData.userName, email:userData.email ,picture:userData.picture},
        });
    } 
    catch (error) {
        console.log("error verify token");
        console.log(error)

      res.status(500).json({ success: false, message: 'Server error' });
    }
}
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Buffer } = require('safe-buffer');

const generateToken = (user) =>{
    const payload = {
        username: user.username,
        email: user.email,
        picture: user.picture,
    };

    const secretKey = process.env.JWT_SECRETKEY;
    const options = {expiresIn: process.env.JWT_TIMEOUT};

    const token = jwt.sign(payload, secretKey, options);

    return token;
}

const verifyToken = (req, res, next) => {
 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    const secretKey = process.env.JWT_SECRETKEY;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        } 
        else {
            req.decodedUserData = decoded;
            next();
        }
    });
};

module.exports = {generateToken , verifyToken};
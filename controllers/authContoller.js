const User =require('../models/authSchema');
const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateTokens');
const UserToken = require('../models/userTokenSchema');
const jwt = require('jsonwebtoken')

const createUser = async (req,res)=>{
    try {
        console.log(req.body,'hiii')
        const datas = req.body;
        console.log(datas)
        const user = new User({...datas})
        if(!user){
           return res.status(400).json({message:"Bad requst"});
        }
        await user.save()
        res.status(201).json({
            message:"Successfully created",
            user
        })
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "invalid username or password" });
        }
        const verifiedPassword = await bcrypt.compare(password, user.password);
        if (!verifiedPassword) {
            return res.status(401).json({ message: "invalid username or password" });
        }
        const { accessToken, refreshToken } = await generateTokens(user);
        console.log(accessToken);
        res.status(200).json({
            message: "Login successfully",
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
}

const refreshAccessToken = async (req,res) => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
        return res.status(403).json({ message: "Access Denied: No token provided" });
    }
    try {
        console.log('object')
        const{ _id }= jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY
        );
        console.log(_id,'hiiii')
        const userToken = await UserToken.findOne({ userId: _id, token: refreshToken });
        if (!userToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const accessToken = jwt.sign(
            { _id }, 
            process.env.ACCESS_TOKEN_SECRET_KEY, 
            { expiresIn: "14m" }
        );
        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(403).json({ message: "Invalid refresh token" });
    }
}

const logoutUser = async(req,res) => {
    const {refreshToken}= req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: "No token provided" });
    }
    try {
        const {_id}= jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY
        );
        await UserToken.findOneAndDelete({ userId: _id, token: refreshToken });
        res.status(200).json({ message: "Logout successfull" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { 
        createUser, 
        loginUser,
        refreshAccessToken,
        logoutUser
     };


const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");

//require("dotenv").config();



const handleLogin = async (req, res) =>
{
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({"message" : "Username and password are required."});

    const foundUser = await User.findOne({username: user}).exec();
    if(!foundUser) 
    {   
        console.log("401 in authController");
        return res.sendStatus(401);
    }
    //evaluating password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match)
    {
        const roles = Object.values(foundUser.roles);
        //Creating the access token
        const accessToken = jwt.sign
        (
            {"UserInfo":
                {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "30000s"}
        );

        //Creating the refresh token
        const refreshToken = jwt.sign
        (
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        );
        
        //Saving refreshToken with current user
       foundUser.refreshToken = refreshToken;
       const result = await foundUser.save();
       console.log(result);

        res.cookie("jwt", refreshToken, {httpOnly: true, sameSite: "none", /* secure: true, */ maxAge: 24 * 60 * 60 * 1000});
        res.json({accessToken});
    }
    else
    {
        res.sendStatus(401);
    }
};

module.exports = {handleLogin};
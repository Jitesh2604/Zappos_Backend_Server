const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// controller to handel user registerion
exports.registerUser = async(req, res) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body;
        
        //check if the user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        //create a new user
        const user = new User({
            name,
            email,
            password: hashPassword,
            phoneNumber,
            address
        });
        await user.save();

        res.status(201).json({ message: "User registered successfully",
            user: {name: user.name, email: user.email}
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//controller to handle user login
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        //check if user is exists
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //create a JWT accessToken
        const accessToken = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '15m' });
        
        //create a JWT refreshToken
        const refreshToken = jwt.sign({ userId: user._id}, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        
        user.refreshToken = refreshToken;
        await user.save();
        
        res.status(200).json({ 
            message: "User Logged in successfully",
            user: {name: user.name, email: user.email},
            accessToken,
            refreshToken
        });
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

//controller to get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user  = await User.findById(req.userId).select('-password');
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({user});
    } catch (err) {
        res.status(500).json({ messgae: err.message});
    }
};
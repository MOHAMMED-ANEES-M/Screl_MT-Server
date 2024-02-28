const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const User = require('../models/userModel');

const saltRounds = 10;


// POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
    console.log('user register req.body:',req.body);
    const { username, name, bio, password } = req.body;
    if (!username || !name || !password || !bio) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
  
    const existingUser = await User.findOne(username);
    if (existingUser) {
      res.status(400);
      throw new Error('User already registered');
    }
  
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
  
    const newUser = await User.create({ username, name, bio, password: hashedPassword });
    
    if (newUser) {
      console.log('User created', newUser);
      res.status(201).json(newUser);
    } else {
      res.status(400);
      throw new Error('User data is invalid');
    }
  });


// POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
        const user = await User.findOne(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign(
                { user: { username: user.username, name: user.name, id: user.id } },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60m' }
            );
            res.status(200).json({ accessToken, success: true });
        } else {
            res.status(404);
            throw new Error('Email or Password is not valid');
        }
});


// POST /api/users/current
const getUserById = asyncHandler(async (req, res) => {
    const id = req.user.id
    const user = await User.findById(id)
    res.json(user)
    console.log('Current user:',user);
});


module.exports = { registerUser, loginUser, getUserById };

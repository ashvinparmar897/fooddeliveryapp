const express = require('express')
const router = express.Router();
const User = require('../modal/User')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwtSecret='MyNameisAshvin'

const { body, validationResult } = require('express-validator');

// Create a user
router.post('/createuser',
    [
        // name must be at least 5 chars long
        body('name','name must be at least 5 chars long').isLength({ min: 5 }),

        // email must be an email
        body('email','invalid email').isEmail(),
        // password must be at least 5 chars long
        body('password','password must be at least 5 chars long').isLength({ min: 5 })],

    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
       const salt=await bcrypt.genSalt(10);
       let secPassword=await bcrypt.hash(req.body.password,salt);
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
        }

    })

// Login user
    router.post('/loginuser',
    [
        // email must be an email
        body('email','invalid email').isEmail(),
        // password must be at least 5 chars long
        body('password','password must be at least 5 chars long').isLength({ min: 5 })],

    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email=req.body.email;
        try {
            let userData=await User.findOne({email})
            if(!userData){
                return res.status(400).json({errors:"Try with correct credentials"})
            }

            const pwdCompare=await bcrypt.compare(req.body.password,userData.password)
            if(!pwdCompare){
                return res.status(400).json({errors:"Try with correct credentials"})
            }
            const data={
                user:{
                    id:userData.id
                }
            }

            const authToken=jwt.sign(data,jwtSecret)

            res.json({ success: true,authToken:authToken })
        } catch (error) {
            console.log(error)
        }

    })
module.exports = router;
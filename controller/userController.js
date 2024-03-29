
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// this will handle loggin in
exports.authenticate = async (req, res) => {
    var { password, email } = req.body
    const cookieAge = 1000 * 60 * 60 * 24 * 30

    try{
       const user = await User.findOne({ email })  

       if(user) {
         const isValid = await compare(password, user.password)

         if(isValid) {
            const token = generateAccessToken(user._id)
            res.cookie('__md_e', token, {httpOnly: true, maxAge: cookieAge})
            return res.status(200).render('home')
         }

         return res.status(401).send('password incorrect')
       }
       
    } catch(error) {
        console.log(error)
    }

    return res.status(500).send('error')
}

//this will add a new user then redirect to sign in
exports.inscription = async(req, res) => {
    const { firstname, lastname, email, password } = req.body

    try {
        const user = await User.findOne({ email })
        
        if(user) {
            return res.status(409).send("exist")
        } 
        
        const hashedPassword = await hashPassword(password)
        await User.create({ email, password:hashedPassword, firstname, lastname })
        return res.render('/')
        
    } catch(error) {
        console.log(error)
    }
    return res.status(500).send('error')
}



async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

async function compare(password, hash){
    return await bcrypt.compare(password, hash)
}

function generateAccessToken(id) {
    return jwt.sign({uid:id}, process.env.TOKEN_SECRET, { expiresIn: '30d' })
  }


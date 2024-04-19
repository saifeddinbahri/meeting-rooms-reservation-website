
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
            const token = generateAccessToken(user._id, user.role)
            res.cookie('__md_e', token, {httpOnly: true, maxAge: cookieAge})
            if (user.role === 'admin') {
                return res.json({redirectTo:'/consult-rooms'})
            }
            return res.json({redirectTo:'/rooms'})
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
            console.log('user exist')
            return res.status(409).send("exist")
        } 
        
        const hashedPassword = await hashPassword(password)
        await User.create({ email, password:hashedPassword, firstname, lastname })
        return res.json({redirectTo:'/'})
        
    } catch(error) {
        console.log(error)
    }
    return res.status(500).send('error')
}

exports.logout = (req, res) => {
    res.clearCookie('__md_e')
    res.json({redirectTo:'/'})
}

async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

async function compare(password, hash){
    return await bcrypt.compare(password, hash)
}

function generateAccessToken(id, role) {
    return jwt.sign({uid:id, role:role}, process.env.TOKEN_SECRET, { expiresIn: '30d' })
  }


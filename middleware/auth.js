
const jwt = require('jsonwebtoken');

const ignore = ['/auth/sign-in','/','/auth/sign-up']

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

     if(ignore.includes(req.path)){
        next()
     }
     else{
        if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
     }
 

  
}

module.exports = authenticateToken
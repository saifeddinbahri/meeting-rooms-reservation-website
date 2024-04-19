
const jwt = require('jsonwebtoken');



function authenticateToken(req, res, next) {
  const token = req.cookies.__md_e
  if (token == null) return res.render('login')

  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
   
    if (err) return res.render('login')
   
    req.uid = data.uid
    req.role = data.role
    next()
  })
}

module.exports = authenticateToken
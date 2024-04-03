
const jwt = require('jsonwebtoken');



function authenticateToken(req, res, next) {
  const token = req.cookies.__md_e
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
   
    if (err) return res.sendStatus(403)
   
    req.uid = data.uid

    next()
  })
}

module.exports = authenticateToken
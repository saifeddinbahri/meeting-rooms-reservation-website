
function checkRole(req, res, next) {
    if (req.role === 'admin') {
        next()
    }
    else {
        res.status(401).send('unauthorized')
    }
}

module.exports = checkRole
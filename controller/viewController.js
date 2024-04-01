
exports.login = (req, res) => {
    res.render('login')
}

exports.inscription = (req, res) => {
    res.render('signUp')
}

exports.rooms = (req, res) => {
    res.render('rooms', { data: req.data })    
}

exports.book = (req, res) => {
    res.render('book')
}

exports.reservations = (req, res) => {
    res.render('reservations')
}

exports.calendar = (req, res) => {
    res.render('calendar')
}

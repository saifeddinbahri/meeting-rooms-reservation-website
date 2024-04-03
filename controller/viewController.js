
exports.login = (req, res) => {
    res.render('login')
}

exports.inscription = (req, res) => {
    res.render('register')
}

exports.rooms = (req, res) => {
    res.render('rooms', { data: req.data })    
}

exports.book = (req, res) => {
    const { id } = req.params
    res.render('book', { data: id })
}

exports.reservations = (req, res) => {
    res.render('reservations', {data: req.resRooms})
}

exports.calendar = (req, res) => {
    res.render('calendar')
}


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
    const uid = req.uid
    const room = req.room
    const reservations = room.reservedBy.map((e) => {
        return {
            isUser: e.user.equals(uid),
            date: e.date.toISOString().slice(0, 10),
            start: e.start,
            end: e.end
        }
    } )
    res.render('calendar', {data:reservations})
}

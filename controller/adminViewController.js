

exports.addRoom = (req, res) => {
    res.render('add')
}

exports.consultRoom = (req, res) => {
res.render('consult',{ data: req.data })
}

exports.modifyRoom = (req, res) => {
    res.render('modify', { data: req.room })
}

exports.reservations = (req, res) => {
    res.render('admin-reservations', { data: req.reser })
}

exports.modifyReservation = (req, res) => {
    res.render('admin-update-reservation', { data: { reser: req.reservation, params: req.params } })
}
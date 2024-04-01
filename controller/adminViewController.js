

exports.addRoom = (req, res) => {
    res.render('add')
}

exports.consultRoom = (req, res) => {
res.render('consult',{ data: req.data })
}

exports.modifyRoom = (req, res) => {
    res.render('modify', { data: req.room })
}
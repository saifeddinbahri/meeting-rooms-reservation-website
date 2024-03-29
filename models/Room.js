
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReservedBy = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: Date,
    start: Number,
    end: Number
})

const Equipments = new Schema({
    microphone: Number,
    projecter: Number,
    screen: Number,
    tables: Number,
    chairs: Number
})

const RoomSchema = new Schema({
    label: String,
    address: String,
    capacity: Number,
    equipments: Equipments,
    reservedBy: [ReservedBy]
})

module.exports = mongoose.model('Room', RoomSchema)
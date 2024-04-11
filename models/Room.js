
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReservedBy = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    fullname:String,
    phone: Number,
    email:String,
    date: Date,
    start: Number,
    end: Number
})

const Equipments = new Schema({
    microphone: Number,
    projecter: Number,
    screen: Number,
    bigscreen: Number,
    tables: Number,
    chairs: Number
})

const RoomSchema = new Schema({
    label: String,
    address: String,
    image: String,
    capacity: Number,
    equipments: Equipments,
    reservedBy: [ReservedBy]
})

RoomSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    const newReservation = update.$push && update.$push.reservedBy;
    if (newReservation) {
        const docToUpdate = await this.model.findOne(this.getQuery());
        const lastReservationIndex = docToUpdate.reservedBy.length-1
        if (newReservation && newReservation.date && lastReservationIndex >= 0) {
            const lastReservation = docToUpdate.reservedBy[lastReservationIndex]
            
            if (
                newReservation.date === lastReservation.date.toISOString().slice(0, 10) &&
                newReservation.start < lastReservation.end 
            ) {
                return next(new Error('New reservation start time must be after the last reservation end time for the same date.'))
            }
        }
    }
    next()
});


module.exports = mongoose.model('Room', RoomSchema)
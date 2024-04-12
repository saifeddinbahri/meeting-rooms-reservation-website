const roomSchema = require('../models/Room')
const { Types: { ObjectId } } = require('mongoose');

exports.addRoom = async (req, res) => {
    const { label, address, capacity, mic, vid, bigscreen, vidconf, table, chair } = req.body 
    try{
        await roomSchema.create({
             label, address, capacity, 
             image: req.file.filename,
             equipments: {
                microphone: parseInt(mic),
                projecter: parseInt(vid),
                screen: parseInt(vidconf),
                bigscreen: parseInt(bigscreen),
                tables: parseInt(table),
                chairs: parseInt(chair)
             },
            })
        res.json({redirectTo:'/consult-rooms'})

    }catch(e){
        console.log(e)  
        res.send('failed to add room')
    }
}

exports.updateRoom = async (req, res) => {
    const { oldImage, label, address, capacity, mic, vid, bigscreen, vidconf, table, chair } = req.body 
    console.log(req)
    try{
        await roomSchema.findByIdAndUpdate(req.params.id,{
             label, address, capacity, 
             image: req.file ? req.file.filename : oldImage,
             equipments: {
                microphone: parseInt(mic),
                projecter: parseInt(vid),
                screen: parseInt(vidconf),
                bigscreen: parseInt(bigscreen),
                tables: parseInt(table),
                chairs: parseInt(chair)
             },
            })
        res.json({redirectTo:'/consult-rooms'})

    }catch(e){
        console.log(e)  
        res.send('failed to add room')
    }
}

exports.consult = async (req, res, next) => {
    try {
        const data = await roomSchema.find()
        req.data = data
        next()
    }catch(e){
        console.log(e)
        res.send('failed to retrieve data')
    }
}

exports.findRoom = async (req, res, next) => {
    try {
        const { id } = req.params
        const room = await roomSchema.findById(id)
        req.room = room
        next()
    } catch(e) {
        res.send('failed to find room')
    }
}
    exports.deleteRoom = async (req, res) => {
        try {
            const { id } = req.params
            await roomSchema.findByIdAndDelete(id)
            res.json({redirectTo:'/consult-rooms'})
        } catch(e) {
            res.send('failed to find room')
        }
}

exports.findReservations = async (req, res, next) => {
    const userId = req.uid
    const rooms = await roomSchema.aggregate([
        {
            $match: { 'reservedBy.user': new ObjectId(userId) } 
        },
        {
            $addFields: {
                reservedBy: {
                    $filter: {
                        input: '$reservedBy',
                        as: 'reservation',
                        cond: { $eq: ['$$reservation.user', new ObjectId(userId)] } 
                    }
                }
            },
            
        },
        {
            $unwind: '$reservedBy' 
        },
        {
            $project: {
                label: 1,
                _id:1,
                reservedBy: {
                    _id:1,
                    fullname: 1,
                    phone: 1,
                    email: 1,
                    date: { $dateToString: { format: "%Y-%m-%d", date: '$reservedBy.date' } }, // Format the date field
                    start: 1,
                    end: 1
                  }
            }
        }
    ])
    req.resRooms = rooms
    next()
}

exports.deleteReservation = async (req, res) => {
    try {
        const { roomId, reservationId } = req.body 
        const room = await roomSchema.findByIdAndUpdate(
            roomId,
            { $pull: { reservedBy: { _id: reservationId } } },
            { new: true },
          );
          console.log(room)
        res.json({redirectTo:'/my-reservations'})
    } catch(e) {
        console.log(e)
    }
}

exports.findReservation = async (req, res, next) => {
    const { room, reservation } = req.params
    try {
        const data = await roomSchema.aggregate([
            { $match: { _id: new ObjectId(room) } },
            {
                $project: {
                    reservedBy: {
                        $filter: {
                            input: "$reservedBy",
                            as: "reserved",
                            cond: { $eq: ["$$reserved._id", new ObjectId(reservation)] }
                        }
                    }
                }
            }
        ])
        req.reservation = data[0].reservedBy[0]
        next()
    } catch(e) {
        res.send('failed to load page')
    }
    
}

exports.updateReservation = async (req, res) => {
  const { room, reservation } = req.params;
  const updatedFields = req.body; // Assuming the request body contains the fields to update

  try {
    const roomInfo = await roomSchema.findOneAndUpdate(
      { _id: room, 'reservedBy._id': reservation },
      { 
        $set: {
            'reservedBy.$.fullname': updatedFields.fullname,
            'reservedBy.$.phone': updatedFields.phone,
            'reservedBy.$.date': updatedFields.date,
            'reservedBy.$.start': updatedFields.start,
            'reservedBy.$.end': updatedFields.end
          }
       },
      { new: true }
    );
    console.log(roomInfo)
    if (!roomInfo) {
      return res.status(404).json({ error: 'Room not found or reservation not found in the room.' });
    }

    return res.json({redirectTo:'/my-reservations'})
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const roomSchema = require('../models/Room')

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

exports.consult = async (req, res, next) => {
    try {
        const data = await roomSchema.find()
        console.log(data)
        req.data = data
        next()
    }catch(e){
        console.log(e)
        res.send('failed to retrieve data')
    }
}
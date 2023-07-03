const mongoose=require("mongoose")

const roomSchema=new mongoose.Schema({
        roomName:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        SeatsAvailable:{
            type:Number,
            required:true
        },
        amenities:{
            type:[],
        },
        status:{
            type:String,
            required:true 
        },
        bookedCount:{
            type:Number,
     },
    })
    
    module.exports=mongoose.model('Room',roomSchema)

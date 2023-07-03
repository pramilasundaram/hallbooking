const mongoose=require("mongoose")

const bookingSchema=new mongoose.Schema({
    roomid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms'
    },
    customerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },  
    Customername:{
      type:String,
     required:true 
    } , 
      date: {
        type: Date,
        default: Date.now,
      },
      startTime: {
        type: Date,
        required:true
      },
      endTime: {
        type: Date,
        required:true
      },
    })
    
    module.exports=mongoose.model('Booking',bookingSchema)
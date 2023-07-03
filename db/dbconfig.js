const mongoose=require("mongoose");
 

const main=async()=> {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/booking');
        console.log("db connected")
    } catch (error) {
       console.log(error) 
    } 
  }

module.exports=main;
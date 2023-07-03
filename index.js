const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const main = require("./db/dbconfig");
const PORT = process.env.PORT;
const Room = require('./models/room');
const Customer = require('./models/customer');
const Booking = require("./models/Booking");
const room = require("./models/room");

app.use(express.json());

//mongodb connection
main();




//Rest API Endpoints
app.get("/", async function (req, res) {
  await res.send(" i m server");
});

app.post('/api/rooms', async (req, res, next) => {
  const room = new Room({
    roomName: req.body.roomName,
    price: req.body.price,
    SeatsAvailable: req.body.SeatsAvailable,
    amenities: req.body.amenities,
    status: "available",
    bookedCount: req.body.bookedCount
  });
  await room.save().then(
    () => {
      res.status(201).json({
        message: 'room created !',
        data: room
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.post('/api/booking/:id', async (req, res, next) => {
  console.log(req.params.id)
  const booking = new Booking({
    customername: req.body.name,
    roomid: req.params.id,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });
  const findroom = Room.findOne({
    _id: req.params.id
  })

  const room = new Room({
    _id: req.params.id,
    roomName: findroom.roomName,
    price: findroom.price,
    SeatsAvailable: findroom.SeatsAvailable,
    amenities: findroom.amenities,
    status: "booked",
    bookedCount: findroom.bookedCount + 1,
  });
  await Room.updateOne({ _id: req.params.id }, room)

  await booking.save().then(
    () => {
      res.status(201).json({
        message: 'room booked !',
        data: booking

      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.get('/api/allbookedrooms', async (req, res, next) => {
  let allbookedrooms = [];
  const bookedroom = Booking.find({})
  bookedroom.map((value) => {

    const room = Room.findOne({ _id: value.roomid })
    allbookedrooms.push({
      Roomname: room.name,
      customername: value.customername,
      date: value.date,
      startTime: value.startTime,
      endTime: value.endTime
    })
  })
  res.status(201).json({message:allbookedrooms});
})
app.get('/api/allbookedcustomers', async (req, res, next) => {
  let allbookedCustomers = [];
  const bookedroom = Booking.find({})
  bookedroom.map((value) => {

    const customer = Customer.findOne({ _id: value.customerid })
    allbookedCustomers.push({
      Roomname: room.name,
      customername: value.customername,
      date: value.date,
      startTime: value.startTime,
      endTime: value.endTime
    })
  })
  res.status(201).json({message:allbookedCustomers});
})

app.get('/api/bookedcountofrooms', async (req, res, next) => {
  let bookedcountofrooms = [];
  const rooms = Room.find({})
  rooms.map((value) => {
    if (value.status) {
      const bookedroom = Booking.findOne({ roomid: value.roomid })
      bookedcountofrooms.push({
        Roomname: value.name,
        customername: bookedroom.customername,
        date: bookedroom.date,
        startTime: bookedroom.startTime,
        endTime: bookedroom.endTime,
        bookingid: bookedroom._id,
        status: value.status,
        bookedcount: value.bookedcount

      })
    } else {
      bookedcountofrooms.push({
        Roomname: value.name,
        status: value.status,
        bookedcount: value.bookedcount
      }
      )
    }

  })
  res.status(201).json({message:bookedcountofrooms});
})


app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
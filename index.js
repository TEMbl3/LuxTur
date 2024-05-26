let express = require(`express`);
let app = express();
let cors = require(`cors`);
let port = 3000;
app.listen(port, function () {
  console.log(`Сервер запущен: http://localhost:${port}`)
});

app.use(cors())
app.use(express.json())
app.use(express.static('public'));


let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Luxtur')

let hotelSchema = new mongoose.Schema({
  title: String,
  Stars: Number,
  Description: String,
  Short: String,
  Country: String,
  City: String,
  chain: String,
  image1: String,
  image2: String,
  image3: String,
  image4: String,
  image5: String,
  Gym: Boolean,
  WaterPark: Boolean,
  Line: Boolean,
  Wifi: Boolean,
  Spa: Boolean
}, {
  timestamps: true
});

let Hotel = mongoose.model('hotel', hotelSchema);

let reviewSchema = new mongoose.Schema({
  name: String,
  text: String,
  hotel: String,
  rating: Number
}, {
  timestamps: true
});

let Review = mongoose.model('review', reviewSchema)

let contactSchema = new mongoose.Schema({
  user: String,
  phone: String,
  hotel: String,
  mail: String
}, {
  timestamps: true
});

let Contact = mongoose.model('contact', contactSchema)

app.get(`/Reviews`, async function(req, res){
  let hotel = req.query.hotel
  let data = await Review.find({hotel: hotel}).sort({createdAt: -1})
  res.send(data)
})
app.post(`/sendReview`, async function(req, res){
  let name = req.body.name
  let text = req.body.text
  let hotel = req.body.hotel
  let rating = req.body.rating

  let review = new Review({
    name: name,
    text: text,
    hotel: hotel,
    rating: rating,
  })

  await review.save();
})





app.get(`/Allhotels`, async function (req, res) {
  let data = await Hotel.find().sort({ Stars: -1 });
  res.send(data)
})
app.post(`/PostContact`, async function (req, res){
  let user = req.body.user
  let phone = req.body.phone
  let hotel = req.body.hotel
  let mail = req.body.mail

  let contact = new Contact({
    user: user,
    phone: phone,
    hotel: hotel,
    mail: mail
  })

  await contact.save();
})
app.get(`/hotels`, async function (req, res) {
  let title = req.query.title;
  let Country = req.query.Country;
  let Stars = req.query.Stars;
  let Gym = req.query.Gym;
  let WaterPark = req.query.WaterPark;
  let Line = req.query.Line;
  let Wifi = req.query.Wifi;
  let Spa = req.query.Spa;

  let search = {}

  if (title) {
    search.title = title
  }
  if (Country == 'Все страны') {
    Country = '';
  }
  else if (Country) {
    search.Country = Country
  }
  if (Stars == "Количество звезд") {
    Stars = '';
  }
  else if (Stars) {
    search.Stars = Stars
  }
  if (Gym) {
    search.Gym = Gym
  }
  if (WaterPark) {
    search.WaterPark = WaterPark
  }
  if (Line) {
    search.Line = Line
  }
  if (Wifi) {
    search.Wifi = Wifi
  }
  if (Spa) {
    search.Spa = Spa
  }



  let data = await Hotel.find(search).sort({ Stars: -1 })
  res.send(data)
  console.log(search, 'успешно')
})

app.get(`/hotel`, async function (req, res) {
  let id = req.query.id;
  let data = await Hotel.findOne({_id: id})
  res.send(data);
})
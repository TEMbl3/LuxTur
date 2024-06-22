<script>
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000";
import dayjs from 'dayjs';

import Footer from './components/Footer.vue'
import Login from './components/Login.vue'

export default {
  components: {
    Footer,
    Login
  },
  data() {
    return {
      hotels: [],
      Gym: '',
      title: '',
      Country: 'Все страны',
      Stars: 'Количество звезд',
      WaterPark: '',
      Line: '',
      Wifi: '',
      Spa: '',
      hotel: null,
      Count: 1,
      Reviews: [],
      rating: 10,
      username: '',
      text: '',
      hotel: '',
      error: false,
      success: false,
      full: false,
      bron: false,
      user: '',
      phone: '',
      mail: '',
      createdAt: '2024-05-23T15:28:48.783Z'
    };
  },
  methods: {
    toggleBron() {
      this.bron = !this.bron
    },
    togggleFull() {
      this.full = !this.full
    },
    async sendReview() {
      if (!this.username || !this.text) {
        this.error = true,
          this.success = false
      } else {
        try {
          await axios.post('/sendReview', {
            name: this.username,
            text: this.text,
            hotel: this.hotel.title,
            rating: this.rating
          },
            this.error = false,
            this.rating = 10,
            this.username = '',
            this.text = '',
            this.loadReviews(),
            this.success = true
          );
        } catch {
          console.error
        }
      }
    },
    formattedDate(date) {
      const formatted = dayjs(date).format('DD.MM.YYYY');
      return formatted
    },
    async loadAllHotels() {
      let response = await axios.get('/Allhotels');
      this.hotels = response.data
      this.hotel = null;
      this.success = false
      this.error = false
      this.full = false
    },
    async loadReviews() {
      let response = await axios.get('/Reviews', {
        params: {
          hotel: this.hotel.title
        }
      })
      this.Reviews = response.data
    },
    async loadHotel(id, hotel) {
      let response = await axios.get('/hotel', {
        params: {
          id: id
        }
      });
      this.hotel = response.data

      let responseReviews = await axios.get('/Reviews', {
        params: {
          hotel: hotel
        }
      })
      this.Reviews = responseReviews.data
    },
    async loadHotels() {
      if (this.Gym == false) {
        this.Gym = '';
      }
      if (this.WaterPark == false) {
        this.WaterPark = '';
      }
      if (this.Line == false) {
        this.Line = '';
      }
      if (this.Wifi == false) {
        this.Wifi = '';
      }
      if (this.Spa == false) {
        this.Spa = '';
      }
      let response = await axios.get('/hotels', {
        params: {
          title: this.title,
          Country: this.Country,
          Stars: this.Stars,
          Gym: this.Gym,
          WaterPark: this.WaterPark,
          Line: this.Line,
          Wifi: this.Wifi,
          Spa: this.Spa,
          CurrantImage: 'hotel.image1',
        }
      })

      this.hotels = response.data
    },
    async postContact() {
      if (this.hotel) {
        await axios.post('/PostContact', {
          user: this.user,
          phone: this.phone,
          hotel: this.hotel.title,
          mail: this.mail,
        },
          this.user = '',
          this.phone = '',
          this.mail = ''
        )
      } else {
        await axios.post('/PostContact', {
          user: this.user,
          phone: this.phone,
          mail: this.mail,
        },
          this.user = '',
          this.phone = '',
          this.mail = ''
        )
      }
    }
  },
  mounted() {
    this.loadAllHotels()
  }
}
</script>
<template>

  <header style="-webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;">
    <div class="nav">
      <h2 @click="loadAllHotels()">LuxTur</h2>
      <nav>
        <a href="#" @click="loadAllHotels" class="nava">Поиск</a>
        <a href="#hotels" @click="loadAllHotels" class="nava">Отели</a>
        <a href="#footer" class="nava">Новости</a>
      </nav>
    </div>
    <div v-if="!hotel">
      <h1 style="">
        Поиск лучших отелей</h1>
      <img
        src="https://gcdn1.mouzenidis.com/userfiles/hotels/original/6191779/6e91027d-03ea-44d2-ba92-2edfbb3065d4_Crystal-Aura-Beach-Resort-Spa.jpg"
        width="78%" height="550px" alt="">
      <div class="poisk">
        <div class="selects">
          <input class="form-control" type="text" v-model="title" placeholder="Название"
            aria-label="default input example">
          <select class="form-select" aria-label="Default select example" v-model="Country">
            <option selected>Все страны</option>
            <option value="Турция">Турция</option>
            <option value="ОАЭ">ОАЭ</option>
            <option value="Египет">Египет</option>
          </select>
          <select v-model="Stars" class="form-select" aria-label="Default select example">
            <option selected>Количество звезд</option>
            <option value="3">3★</option>
            <option value="4">4★</option>
            <option value="5">5★</option>
          </select>
          <a href="" class="btn btn-primary" @click.prevent="loadHotels">Поиск
          </a>
        </div>
        <details>
          <summary>
            <h3 id="hotels" class="btn btn-outline-primary">Показать все фильтры</h3>
          </summary>

          <div class="d-flex justify-content-center mt-2"
            Style="margin-left:20px;margin-right:20px;flex-wrap:wrap;gap: 30px; font-size: 18px; font-weight: 500; color:black;">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" v-model="Gym">
              <label class="form-check-label" for="flexSwitchCheckDefault">Спортзал</label>
            </div>
            <div class="form-check form-switch">
              <input v-model="WaterPark" class="form-check-input" type="checkbox" role="switch">
              <label class="form-check-label" for="flexSwitchCheckDefault">Аквапарк</label>
            </div>
            <div class="form-check form-switch">
              <input v-model="Line" class="form-check-input" type="checkbox" role="switch">
              <label class="form-check-label" for="flexSwitchCheckDefault">Первая линия</label>
            </div>
            <div class="form-check form-switch">
              <input v-model="Wifi" class="form-check-input" type="checkbox" role="switch">
              <label class="form-check-label" for="flexSwitchCheckDefault">Wi-fi</label>
            </div>
            <div class="form-check form-switch">
              <input v-model="Spa" class="form-check-input" type="checkbox" role="switch">
              <label class="form-check-label" for="flexSwitchCheckDefault">СПА</label>
            </div>
          </div>

        </details>

      </div>
    </div>
  </header>

  <body>
    <div class="container mb-4" v-if="!hotel" id="hotels">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <div class="col mt-5" v-for="hotel in hotels" :key="hotel">
          <div class="card">
            <img class="card-img-top" :src="hotel.image1" alt="">
            <div class="card-body">
              <h5>{{ hotel.title }}</h5>
              <div style="display: flex; gap: 8px;">
                <h6><span style="font-weight: 500; font-size: 18px;"> {{ hotel.Stars }} <span
                      style="font-size: 20px;">⭐</span><span style="font-size: 20px; position: relative; top: -1px;">
                      |</span> Город:</span> {{ hotel.City }}</h6>
              </div>
              <a href="#" class="btn btn-outline-dark mt-2" @click="loadHotel(hotel._id, hotel.title)">Посмотреть</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="hotel" class="hotel">
      <div v-if="bron" class="shadow" style="">
        <div class="form bg-white " v-if="bron" style="">
          <form>
            <a @click="toggleBron()">✖</a>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label" style="font-size: 20px;">Как вас зовут?</label>
              <input v-model="user" type="text" placeholder="Иван" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label mt-2" style="font-size: 20px;">Введите ваш номер
                телефона</label>
              <input v-model="phone" placeholder="+7-777-777-77-77" type="tel" class="form-control"
                id="exampleInputPassword1">
            </div>
            <button @click.prevent="postContact" type="submit" class="btn btn-primary mt-2">Отправить заявку</button>
            <div id="emailHelp" class="form-text mt-1">Мы позвоним вам, в течение 5 минут!</div>
          </form>
        </div>
      </div>
      <div class="dflex">
        <h2 class="hoteltitle">{{ hotel.title }} </h2> <button class="btn btn-success"
          @click="toggleBron()">Забронировать</button>
      </div>
      <h3><span v-for="star in hotel.Stars" :key="star.id">⭐</span> | <span style="font-weight: 600;">Город:</span> <span
          style="font-weight: 200;">{{
            hotel.City }}</span></h3>
      <div id="carouselExample" class="carousel slide mt-4">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img :src="hotel.image1" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="hotel.image2" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="hotel.image3" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="hotel.image4" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="hotel.image5" class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev"
          style="opacity: 1;">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next"
          style="opacity: 1;">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div class="opis">
        <h3>Все преимущества "{{ hotel.title }} ⭐ {{ hotel.Stars }}"</h3>
        <p>{{ hotel.Short }}</p>
        <details>
          <summary><span class="btn btn-outline-primary" @click="togggleFull" v-if="!full">Подробнее</span></summary>
          <p>{{ hotel.Description }}</p>
        </details>
      </div>
      <div class="Reviews">
        <h2 class="mb-3">Оставьте отзыв <span v-if="Reviews.length === 0">первым</span></h2>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Как вас зовут?</label>
          <input v-model="username" type="text" class="form-control nickname" id="exampleFormControlInput1"
            placeholder="Имя">
        </div>
        <div class="mb-2">
          <label for="exampleFormControlTextarea1" class="form-label">Ваш комментарий</label>
          <textarea v-model="text" class="form-control" placeholder="Комментарий" id="exampleFormControlTextarea1"
            rows="3"></textarea>
        </div>
        <label for="customRange2" class="form-label mt-2">Ваш рейтинг: {{ rating }}</label>
        <input type="range" class="form-range" min="1" max="10" v-model="rating" id="customRange2">
        <button @click.prevent="sendReview()" class="btn btn-primary mb-3 mt-2">Отправить отзыв</button>
        <p class="error  " v-if="error">Извините, но чтобы оставить, отзыв нужно заполнить все поля!</p>
        <p class="success" v-if="success">Спасибо, за оставленный отзыв, он появится сразу как его проверит
          модерация!</p>
        <div v-if="Reviews.length !== 0">
          <h2 class="mb-4 mt-4" style="text-decoration: underline; text-underline-offset: 5px;">Все отзывы:</h2>
          <div class="card" v-for="Review in Reviews" :key="Review.id">
            <h4 class="card-title">Автор: <span style="font-weight: 600; text-decoration: underline;">{{ Review.name
                }}</span></h4>
            <h4 class="card-title">Рейтинг: <span style="font-weight: 600;">{{ Review.rating }}</span></h4>
            <p>{{ Review.text }}</p>
            <p style="font-weight: 700; margin-top: -20px; margin-left: auto;">{{ formattedDate(Review.createdAt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </body>
  <Footer />
</template>
<style>
footer {
  width: 100%;
  height: 220px;
  background-color: #0d84ac;
  margin-top: 50px;
}

footer .form-text {
  color: #b7e2f1;
  font-size: 17px;
  padding-left: 10px;
}

.form a {
  display: block;
  text-align: end;
  margin-right: 10px;
  font-size: 24px;
}

footer .input-group {
  width: 350px;
  margin-top: 20px;
}

footer h2 {
  color: white;
  text-align: center;
  padding-top: 40px;
  font-weight: 700;
}

.dflex {
  display: flex;
}

.carousel-control-next-icon {
  filter: drop-shadow(white 0 0 5px);
}

.carousel-control-prev-icon {
  filter: drop-shadow(white 0 0 3px);
}

.dflex button {
  height: 45px;
  margin-top: 141px;
  font-size: 20px;
  margin-left: 1%
}

#carouselExample img {
  height: 470px;
  object-fit: cover;

}

#carouselExample {
  margin-left: 16%;
  width: 900px;
  box-shadow: rgba(0, 0, 0, 0.6) 0 0 10px;
}

.Reviews .card {
  margin-bottom: 20px;
}

.Reviews label {
  font-weight: 500;
}

.Reviews .card {
  padding: 20px;
}

.Reviews .card p {
  padding-top: 15px;
  font-weight: 400;
  font-size: 21px;
}

.Reviews .card-title {
  font-weight: 300;
  font-size: 25px;
}

.Reviews textarea {
  height: 80px;
}

.success {
  color: green;
}

.error {
  color: rgba(255, 0, 0, 0.7);
  font-weight: 400;
}

textarea,
label {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.form-floating label {
  color: gray;
}

.btn-success {
  box-shadow: rgba(0, 128, 0, 0.8) 0 0 7px;
}

.hotel .btn-primary {
  box-shadow: rgba(0, 47, 255, 0.8) 0 0 7px;
}

.Reviews h2 {
  text-align: center;
}

.Reviews {
  width: 60%;
  margin-left: 16.6%;
  margin-top: 20px;
  font-size: 20px;
}


.opis p {
  width: 66%;
  word-break: break-all;
  margin-left: 16.6%;
  font-size: 17px;
}

.opis summary {
  margin-left: 16.6%;
  margin-top: -0.3%;
  margin-bottom: 5px;
}

.opis h3 {
  font-size: 30px;
  padding-left: 0.5%;
  padding-top: 1%;
  width: 70%;
}

.image1 {
  margin-left: 15%;
  margin-top: 1.5vw;
  width: 23vw;
  height: 250px;
  object-fit: cover;
  border-radius: 20px;
}

.image3 {
  margin-left: 4vw;
  margin-top: 1.5vw;
  width: 45vw;
  border-radius: 20px;
  height: 507px;
  object-fit: cover;
}

.gallery {
  display: flex;
  margin-left: 12%;
}

.image2 {
  margin-left: 15%;
  margin-top: 0.5vw;
  width: 23vw;
  border-radius: 20px;
  height: 250px;
  object-fit: cover;
}

.gallery-col {
  display: flex;
  flex-direction: column;
}

.hoteltitle {
  font-size: 35px;
  margin-left: 16%;
  padding-top: 140px;
}

.hotel h3 {
  margin-left: 16%;
  font-size: 30px;
}

.card h5 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  font-weight: 600;

}

body {
  font-family: "Noto Sans HK", sans-serif;
}

.card h6 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 17px;
  font-weight: 300;
}

.container .card {
  border: 0px solid rgba(0, 0, 0, 0.24);
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.438) 0 0 5px;
  color: black;
  height: 425px;
}

.card img {
  object-fit: cover;
  border-top-left-radius: 25px;
  height: 270px;
  border-top-right-radius: 25px;
}

.selects {
  display: flex;
  gap: 40px;
  margin-right: 10%;
  margin-left: 10%;
  margin-top: 40px;

}

summary {
  list-style: none;

}

header details {
  margin-top: 20px;
  margin-bottom: 15px;
  text-align: center;
}

.flex {

  margin-top: 20px;
  flex-wrap: wrap;
  font-size: 18px;
  font-weight: 600;

}

header details h3 {
  font-weight: 500;
  font-size: 20px;
}

.nav {
  width: 80%;
  height: 70px;
  box-shadow: rgba(0, 0, 0, 0.514) 0 0 8px;
  border-radius: 15px;
  margin-left: 10%;
  margin-top: 20px;
  position: fixed;
  z-index: 15;
  background-color: white;
}

nav {
  margin-left: auto;
  margin-right: 30px;
  font-size: 20px;
  display: flex;
  gap: 30px;
  margin-top: 17px;
}

.shadow {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 15;
  background-color: rgba(0, 0, 0, 0.7);
}

.form {
  z-index: 20;
  padding: 30px;
  margin: 10px;
  width: 450px;
  border: 1px solid black;
  margin-top: 0px;
  border-radius: 20px;
}

nav a {
  text-decoration: none;
  color: black;
  font-weight: 400;
}

header h2 {
  margin-top: 17px;
  margin-left: 1vw;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-weight: 700;
}

header img {
  object-fit: cover;
  border-radius: 50px;
  margin-left: 11%;
  margin-top: 150px;
  filter: brightness(50%);
  box-shadow: rgba(0, 0, 0, 0.5) 0 0 10px;
  z-index: 5;
}

.poisk {
  width: 70%;
  background-color: white;
  margin-left: 15%;
  position: relative;
  top: -5vw;
  border-radius: 30px;
  -webkit-backdrop-filter: blur(11px);
  backdrop-filter: blur(11px);
  background: rgba(255, 255, 255, 0.596);
  border: 1px solid rgba(104, 104, 104, 0.377);
  z-index: 10;


}

h1 {
  filter: drop-shadow(rgba(0, 68, 255, 0.896) 0 0 6px);
  font-family: "Noto Sans HK", sans-serif;
  position: absolute;
  top: 330px;
  z-index: 14;
  font-size: 100px;
  width: 70%;
  margin-left: 15%;
  text-align: center;
  color: white;

}

@media (max-width: 1220px) {
  #carouselExample {
    width: 70vw;
  }
}

@media (max-width: 1030px) {
  h1 {
    margin-top: -9%;
  }
}

@media (max-width: 550px) {
  h1 {
    font-size: 17vw;
    top: 230px;
  }

  #carouselExample {
    width: 90vw;
  }

  .hotel p {
    width: 80%;
  }

  .hotel h3 {
    width: 80%;
  }

  .hoteltitle {
    width: 80%;
  }

  .Reviews {
    width: 80%;
  }

  .hotel {
    margin-left: -13%;
  }

  .shadow {
    width: 113%;
  }

  header img {
    height: 450px;
    margin-top: 130px;
  }

  .nav h2 {
    font-size: 50px;
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
  }

  .selects {
    display: flex;
    flex-wrap: wrap;
  }

  nav {
    visibility: hidden;
  }

  .poisk a {
    width: 100%;
    text-align: center;
  }

  .form {
    margin-left: 13%;
    padding: 15px;
  }

  .poisk h3 {
    width: 80%;
    text-align: center;
  }
}

@media (max-width: 1100px) {
  .selects {
    display: flex;
    flex-wrap: wrap;
  }

  .poisk a {
    width: 100%;
    text-align: center;
  }

  .poisk h3 {
    width: 80%;
    text-align: center;
  }
}

@media (max-width: 1050px) {
  .dflex button {
    height: 45px;
    margin-top: 10px;
    font-size: 20px;
    margin-left: 16%
  }

  .dflex {
    display: block;
  }
}

@media (max-width: 800px) {
  #carouselExample img {
    height: 300px;
  }

}

@media (max-width: 500px) {
  #carouselExample img {
    height: 220px;
  }

  nav {
    visibility: hidden;
  }

  .hotel h2 {
    font-size: 30px;
  }

  .hotel h3 {
    font-size: 23px;
    margin-top: 10px;
  }

  footer .form-text {
    font-size: 12.5px;
  }

  footer h2 {
    font-size: 22px;
  }

  footer .input-group {
    width: 260px;
    margin-top: 20px;
  }

  .hotel p {
    font-size: 17px;
  }

  .Reviews p {
    width: 100%;
    word-break: break-all;
  }

  h1 {
    font-size: 17vw;
    top: 230px;
  }

  header img {
    height: 430px;
  }
}

@media (max-width: 400px) {
  nav {
    visibility: hidden;
  }

  h1 {
    font-size: 17vw;
    top: 240px;
  }

  header img {
    height: 390px;
  }
}

@media (max-width: 350px) {
  h1 {
    font-size: 17vw;
    top: 240px;
  }

  header img {
    height: 380px;
  }
}
</style>
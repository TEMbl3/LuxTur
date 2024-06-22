<script>
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000"


export default {
  data() {
    return {

    }
  },
  methods: {
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
  }
}
</script>
<template>
  <footer id="footer">
    <div>
      <h2>Будьте в курсе всех наших новостей</h2>
      <center>
        <div class="input-group mb-3">
          <input v-model="mail" type="text" class="form-control" placeholder="example@mail.com"
            aria-label="Recipient's username" aria-describedby="button-addon2">
          <button @click.prevent="postContact" class="btn btn-primary" type="button"
            id="button-addon2">Отправить</button>
          <div id="emailHelp" class="form-text mt-1">Вы можете отписаться в любое время!</div>
        </div>
      </center>
    </div>
  </footer>
</template>
<style scoped> 
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
.form a{
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
</style>
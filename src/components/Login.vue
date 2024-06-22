<script>
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000";

export default {
  data() {
    return {
      reg: true,
      log: false,
      login: false,
      mail: "",
      password: "",
      error: '',
      user: {},
      error2: '',
      RegMail: '',
      RegPassword: '',
    }
  },
  methods: {
    ToggleRegLog() {
      this.reg = !this.reg
      this.log = !this.log
      this.error = false
      this.error2 = false
      this.RegMail = ''
      this.mail = ''
      this.RegPassword = ''
      this.password = ''
    },
    ToggleLogin() {
      this.login = !this.login
      this.error = false
      this.error2 = false
    },
    async Login() {
      if (!this.mail || !this.password) {
        this.error = true
        this.error2 = false
      } else {
        let response = await axios.get('/FindUser', {
          params: {
            mail: this.mail,
            password: this.password
          }
        })
        this.user = response.data
        if (this.user) {
          this.login = true
          this.mail = ''
          this.password = ''
        } else {
          this.error2 = true
        }
      }
    },
    async CreateUser() {
      if (!this.RegMail || !this.RegPassword) {
        this.error = true
      } else {
        this.error = false
        await axios.post('/CreateUser', {
          mail: this.RegMail,
          password: this.RegPassword
        },
          this.login = true
        )
      }
    }
  }
}
</script>

<template>

  <body>
    <div class="forms" v-if="reg || log">
      <div class="form" v-if="reg">
        <form>
          <a class="close" @click="log = false, reg = false">✖</a>
          <h3 v-if="reg">Зарегистрируйте аккаунт</h3>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Введите вашу почту</label>
            <input v-model="RegMail" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">Мы никогда не передадим вашу электронную почту кому-либо еще.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Введите пароль</label>
            <input v-model="RegPassword" type="password" class="form-control" id="exampleInputPassword1">
          </div>
          <button type="submit" class="btn btn-primary" @click.prevent="CreateUser()">Зарегистрироваться</button>
          <div id="emailHelp" class="text mt-2">Если вы уже зарегистрировались, <a @click.prevent="ToggleRegLog()"
              href="">войдите в аккаунт</a></div>
          <p v-if="error" class="mt-2" style="color: red">Заполните все поля ввода для входа в аккаунт!</p>
        </form>

      </div>
      <div class="form" v-if="log">
        <form>
          <a class="close" @click="log = false, reg = false">✖</a>
          <h3>Войдите в ваш аккаунт</h3>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Введите вашу почту</label>
            <input v-model="mail" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">Мы никогда не передадим вашу электронную почту кому-либо еще.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Введите пароль</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
          </div>
          <button type="submit" class="btn btn-primary" @click.prevent="Login()">Войти в аккаунт</button>
          <div id="emailHelp" class="text mt-2">Если у вас еще нет аккаунта, <a @click.prevent="ToggleRegLog()"
              href="">зарегистрируйтесь</a></div>
          <p v-if="error" class="mt-2" style="color: red">Заполните все поля ввода для входа в аккаунт!</p>
          <p v-if="error2" class="mt-2" style="color: red">Неправильный пароль или почта!</p>
        </form>
      </div>
    </div>
  </body>

</template>

<style scoped>
form a{
  text-decoration: none;
}
.close{
  display: block;
  text-align: end;
  color: black;
  font-size: 24px;
  margin-top: -15px;
  margin-bottom: 5px;
  font-weight: 800;
}
.forms{
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 16;
  background-color: rgba(0, 0, 0, 0.7);
}
.form {
  z-index: 20;
  background-color: white;
  padding: 30px;
  margin: 10px;
  width: 450px;
  border: 1px solid black;
  margin-top: 0px;
  border-radius: 20px;
}
</style>

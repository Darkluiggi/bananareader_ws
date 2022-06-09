<template>
<body>
  <div class="submit-form mt-3 mx-auto">

    <p class="headline">Inicia sesión</p>

    <p v-if="errors.length">
    <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
    <ul>
      <li v-for="error in errors" :key="error" style="color:red;text-decoration: underline">{{ error }}</li>
    </ul>


  </p>
    <div>
      <v-form ref="form" >
        <v-text-field
          label="Correo Electronico"
          :rules="[(v) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid']"
          v-model="user.email"
          required
        ></v-text-field>

        <v-text-field
          label="Password"
          :rules="[(v) => !!v || 'password is required']"
          v-model="user.password"
          required
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
           @click:append="show1 = !show1"
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="checkForm">Entrar</v-btn>
      <div>
        ¿Aún no tienes una cuenta?
        <router-link :to="'Registration'">Regístrate aquí</router-link>
      </div>
    </div>

  </div>
    <div>
    <div class="flex flex-column mt3">
      <input
        class="mb2"
        v-model="posts.title"
        type="text"
        placeholder="A description for the link">
      <input
        class="mb2"
        v-model="posts.body"
        type="text"
        placeholder="The URL for the link">
    </div>
    <button @click="addPost()">Submit</button>
  </div>

</body>
</template>


<script>
import router from '../../router';
// import AuthDAS from '../../services/AuthDAS'
import { LOGIN_MUTATION } from '../../constants/graqhql';
import { onLogin } from '../../vue-apollo'

export default ({
    name: "Login",
     data() {
    return {
      show1: false,
      user: {
       email:"",
       password:""
      },
      link:{
        description:'',
        url:''
      },
      posts:{
        title: '',
        body: ''
      },
       errors:[]
    };
  },
   mounted() {
   
    this.hideLoading();
  },
    methods: {

    checkForm() {
      this.errors = [];
      if (!this.user.email) {
        this.errors.push('El correo es obligatorio.');
      }
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
        this.errors.push('El correo debe ser válido.');
      }

      if (!this.user.password) {
        this.errors.push('La contraseña es obligatoria.');
      }
       if (this.user.email && this.user.password  ) {
        this.login();
      }
    },
      login(){
       this.showLoading();
       this.$apollo.mutate({
          mutation: LOGIN_MUTATION,
          variables: {
            password: this.user.password,
            email: this.user.email,
          }
        }).then(response => {

          localStorage.user=JSON.stringify(response.data.login);
          var user_= JSON.parse(localStorage.getItem('user'));
          
          onLogin(user_.token);
            if(user_.ok){
            router.push({ name: "Home2", params: { reload: true } });
          }
          else{        
             this.errors.push(user_.message);  
          }
          })

        .catch(e => console.log(e))
      },
    hideLoading() {
      var x = document.getElementById("loading");
      x.style.display = "none";
    },
    showLoading() {
      var x = document.getElementById("loading");
      x.style.display = "flex";
    },
      },

})

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  background:white;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}

</style>



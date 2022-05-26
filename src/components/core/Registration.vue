<template>
<body>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Nuevo usuario</p>

    <div v-if="!submitted">
      <v-form ref="form" >
        <p v-if="errors.length">
    <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
    <ul>
      <li v-for="error in errors" :key="error" style="color:red;text-decoration: underline">{{ error }}</li>
    </ul>
  </p>
        
        <v-text-field
          v-model="user.nombre"
          :rules="[(v) => !!v || 'Nombre is required']"
          label="Nombre"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          :rules="[(v) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid']"
          label="Correo Electronico"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :rules="[(v) => !!v || 'password is required']"
          label="Password"
          required
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"          
          :type="show1 ? 'text' : 'password'"
           @click:append="show1 = !show1"
        ></v-text-field>

      </v-form>

      <v-btn color="primary" class="mt-3" @click="checkForm">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new USer.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newUser">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</body>
</template>

<script>
import { REGISTER_MUTATION } from "../../constants/graqhql.js";
import user from "../../Entity/User.js";
import router from '../../router'

export default {
  name: "add-user",
  data() {
    return {
      show1: false,
      user:{
        user
      },   
      errors:[],   
      submitted: false,
    };
  },

  methods: {
    checkForm() {

      this.errors = [];
       if (!this.user.nombre) {
        this.errors.push('El nombre es obligatorio.');
      }

      if (!this.user.email) {
        this.errors.push('El correo es obligatorio.');
      }
      if (!this.user.password) {
        this.errors.push('La contraseña es obligatoria.');
      }
      if (this.user.email && this.user.password && this.user.nombre ) {
        this.saveUser();
      }

      
    },
    getRandomArbitrary(min, max) {
      var num = (Math.random() * (max - min) + min).toFixed();      
      return parseInt(num, 10);
    },
    hideLoading() {
      var x = document.getElementById("loading");
      x.style.display = "none";
    },
    showLoading() {
      var x = document.getElementById("loading");
      x.style.display = "flex";
    },
    saveUser() { 
      this.$apollo.mutate({
          mutation: REGISTER_MUTATION,
          variables: {
            user_id: this.getRandomArbitrary(0,100),
            nombre: this.user.nombre,
            role:'USER',
            password: this.user.password,
            email: this.user.email,
          }
        }).then(response => {
          localStorage.user=JSON.stringify(response.data.register);
          var user_= JSON.parse(localStorage.getItem('user'));
            if(user_.ok){
            router.push({ name: "Home2", params: { reload: true } });
          }
          else{        
             this.errors.push(user_.message);  
          }
          })

        .catch(e => console.log(e))
    },
  },
  mounted() {  
      this.hideLoading();
  },
};
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

<template>
<div >
   <v-btn text style="cursor: pointer" @click="Volver()">
                <v-icon>mdi-arrow-left-bold</v-icon>
                <span>Volver</span>
    </v-btn>
  <div class="submit-form mt-6 mx-auto">
    <p class="headline">Nuevo Audiolibro</p>
    
    <div v-if="!submitted">
      
      <v-form ref="form" >
        <v-text-field
          v-model="user.name"
          :rules="[(v) => !!v || 'El nombre es requerido']"
          label="Titulo"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          :rules="[(v) => v.length > 0 && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'el email debe ser válido']"
          label="Sinopsis"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          type="password"
          :rules="[(v) => !!v || 'La contraseña es requerida']"
          label="Año"
          required
        ></v-text-field>
       
        <v-select :items="autors" item-text="name" item-value="id_autor" 
        single-line auto v-model="autors.id_autor" label="Seleccionar autor"></v-select>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveBook()">Submit</v-btn>
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
</div>
</template>

<script>
import user from "../../Entity/User.js"
import gql from 'graphql-tag'

export default {
  name: "add-user",  
  apollo: {
    // Simple query that will update the 'hello' vue property
    Autors: gql`{
          getAutors(userId: 1) {
           name
           surname
          }
        }      
    `,
  },
  data() {
    return {
      user: {
        user
      },
      autors:[],  
      select: null,
      submitted: false,
    };
  },
  // mounted(){ 
  // },
  methods: {
    saveUser() {
      var data = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        phoneNumber: this.user.phoneNumber,
        idRol: this.user.idRol,
      };
      console.log(data);
     
    },

    newUser() {
      this.submitted = false;
      this.user = {};
    },
     Volver(){
      return this.$router.push("/Profile");
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
</style>

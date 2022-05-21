<template>
  <div class="container-fluid">
    <div class="row">
      <v-container>
        <div>
          <v-spacer></v-spacer>
          <v-btn x-small v-if="!this.user.ok" @click="goToLog()" text>
            <span>Ingresar</span>
          </v-btn>
          <v-btn
            x-small
            v-if="!this.user.ok"
            text
            @click="goToRegistration()"
          >
            <span>Registrarse</span>
          </v-btn>

          <v-card-actions v-if="this.user.ok">
            <v-menu auto offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="blue"
                  x-small
                  dark
                  fab
                  v-on="on"
                  v-on:click.prevent
                >
                  <v-icon dark> mdi-account-circle </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon> mdi-account </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content style="cursor: pointer;">
                    <v-list-item-title @click="goToProfile()">
                    {{this.user.usuario.nombre}}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>                  
                <v-list-item>
                  <v-list-item-icon>
                    <button @click="signOut()">
                      <v-icon> mdi-logout </v-icon>
                    </button>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <button @click="signOut()">Cerrar sesión</button>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import router from "../../router";
import User from "../../Entity/Auth.js";

export default {
  name: "HeaderBarLinks",
  methods: {
    goToRegistration() {
      this.showLoading();
      return router.push("/Registration");
    },
    goToLog() {
      this.showLoading();
      return router.push("/Login");
    },
    goToProfile() {
      this.showLoading();
      return this.$router.push("/Profile");
    },
    signOut() {
      this.showLoading();
      var user = new User();
      localStorage.user = JSON.stringify(user);
      router.go();
      router.push({ name: "Home2", params: { reload: true } });
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
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
};
</script>

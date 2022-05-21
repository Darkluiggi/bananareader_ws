<template>
  <v-row class="list px-3 mx-auto">
    <div class="row">
      <div class="col-md-3">
        <div class="card-container">
          <img
            class="round"
            src="https://es.seaicons.com/wp-content/uploads/2022/03/User-green-icon-1.png"
            alt="user"
          />
          <h3>{{ user.usuario.nombre }}</h3>
          <h6>{{ user.usuario.email }}</h6>
          <br />
        </div>
      </div>
      <div class="col-md-8">
        <v-col cols="12" md="8">
          <v-text-field
            v-model="userName"
            label="Buscar por nombre"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-btn small @click="searchTitle">
            Search
          </v-btn>
        </v-col>

        <v-col cols="12" sm="12">
          <v-card class="mx-auto" tile>
            <v-card-title>Mis Libros</v-card-title>
            <v-spacer></v-spacer>

            <v-data-table
              :headers="headers"
              :items="users"
              disable-pagination
              :hide-default-footer="true"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editUser(item.id)"
                  >mdi-pencil</v-icon
                >
                <v-icon small @click="deleteUser(item.id)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card>
          
        <v-btn text style="cursor: pointer" @click="AddBook()">
          <v-icon>mdi-plus</v-icon>
          <span>Agregar audiolibro</span>
        </v-btn>
        </v-col>
      </div>
    </div>
  </v-row>
</template>

<script>
import UserDAS from "../../services/UserDAS";
export default {
  name: "UserIndex",
  data() {
    return {
      users: [],
      user: "",
      userName: "",
      headers: [
        { text: "Título", align: "start", sortable: false, value: "nombre" },
        { text: "Autor(es)", value: "email", sortable: false },
        { text: "Duración", value: "phoneNumber", sortable: false },
        { text: "Leido por", value: "status", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveList() {
      UserDAS.getAll()
        .then((response) => {
          this.users = response.data.map(this.getUser);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveList();
    },

    searchTitle() {
      UserDAS.findByName(this.userName)
        .then((response) => {
          this.users = response.data.map(this.getUser);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteUser(id) {
      UserDAS.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    AddBook() {
      return this.$router.push("/AddBook");
    },
  },

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
   
  },
};
</script>

<style>
.list {
  max-width: 95%;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}

.card-container {
  background-color: #dcdcd7;
  border-radius: 5px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
  color: #000000;
  padding-top: 30px;
  position: relative;
  width: 350px;
  max-width: 100%;
  text-align: center;
}

.card-container .pro {
  color: #231e39;
  background-color: #febb0b;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  padding: 3px 7px;
  position: absolute;
  top: 30px;
  left: 30px;
}

.card-container .round {
  border: 1px solid #03bfcb;
  border-radius: 50%;
  padding: 7px;
}
</style>

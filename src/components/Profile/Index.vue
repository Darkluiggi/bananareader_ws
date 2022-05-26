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
            v-model="title"
            label="Buscar por nombre"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-btn small>
            Search
          </v-btn>
        </v-col>

        <v-col cols="12" sm="12">
          <v-card class="mx-auto" tile>
            <v-card-title>Mis Libros</v-card-title>
            <v-spacer></v-spacer>

            <v-data-table
              :headers="headers"
              :items="readings"
              disable-pagination
              :hide-default-footer="true"
            >
              <!-- <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editBook(item.id)"
                  >mdi-pencil</v-icon
                >
                <v-icon small @click="deleteBook(item.id)">mdi-delete</v-icon>
              </template> -->
              <template v-slot:[`item.actions`]="{ item }">
                 <audio id="audio-preview" :src="item.path" controls v-show="file != ''" />
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
import { GET_AUDIOS_QUERY, GET_BOOKS_QUERY, GET_READINGS_QUERY } from "../../constants/graqhql";
export default {
  name: "UserIndex",
   apollo: {
    // Simple query that will update the 'hello' vue property
    getReadings: GET_READINGS_QUERY,
    getAudio: GET_AUDIOS_QUERY,
    getBooks: GET_BOOKS_QUERY,
  },
  data() {
    return {
      user:'',
      title:'',
      readings: [],
      headers: [
        { text: "Título", align: "start", sortable: false, value: "title" },
        { text: "Autor(es)", value: "author", sortable: false },
        { text: "Duración", value: "duration", sortable: false },
        // { text: "Leido por", value: "status", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveList() {     
    
      this.readings = this.getReadings;
      this.readings.forEach(element =>{
        element.path = this.getAudio.filter(
          (book) => book.id === element.storage
        )[0].path;
          /* eslint-disable no-debugger, no-console */
        debugger
        let book =this.getBooks.filter(
          (book) => 
          
          book.id === element.book
        )[0];
        element.title = book.title;
        var autors ='';
        book.authors.forEach(x=> autors+= ' '+ x.name +' '+ x.surname)
        element.author = autors;

      });
    },

    refreshList() {
      this.retrieveList();
    },

    // searchTitle() {
    //   UserDAS.findByName(this.userName)
    //     .then((response) => {
    //       this.users = response.data.map(this.getUser);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    // deleteUser(id) {
    //   UserDAS.delete(id)
    //     .then(() => {
    //       this.refreshList();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    AddBook() {
      return this.$router.push("/AddBook");
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
    this.hideLoading();
     setTimeout(() => {
       this.refreshList();
      }, 3000);
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

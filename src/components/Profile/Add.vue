<template>
  <div>
    <v-btn text style="cursor: pointer" @click="Volver()">
      <v-icon>mdi-arrow-left-bold</v-icon>
      <span>Volver</span>
    </v-btn>
    <div class="submit-form mt-6 mx-auto">
      <p class="headline">Nuevo Audiolibro</p>

      <div>
        <v-form ref="form">
          <v-select
            :items="getBooks"
            :item-text="(item) => `${item.title}`"
            item-value="id_book"
            single-line
            auto
            v-model="reading.book"
            label="Seleccionar libro"
          ></v-select>

          <v-text-field
            v-model="reading.chapters"
            :rules="[(v) => !!v || 'El número de capítulos es requerido']"
            label="Capítulos"
            required
          ></v-text-field>

          <v-text-field
            v-model="reading.duration"
            :rules="[(v) => v.length > 0 || 'Por favor ingrese la duración']"
            label="Duración"
            id="duration"
            name="duration"
            required
          ></v-text-field>

          <v-select
            :items="getNarrators"
            :item-text="(item) => `${item.name} ${item.surname}`"
            item-value="id_narrator"
            single-line
            auto
            v-model="reading.narrators"
            label="Seleccionar narrador"
          ></v-select>

          <v-select
            :items="getLanguages"
            :item-text="(item) => `${item.name}`"
            item-value="id_language"
            single-line
            auto
            v-model="reading.language"
            label="Seleccionar lenguaje"
          ></v-select>

          <input
            type="file"
            id="audio"
            name="audio"
            accept="audio/mp3 audio/wma"
            v-on:change="getFiles"
          />
          <audio id="audio-preview" controls v-show="file != ''" />
        </v-form>

        <v-btn color="primary" class="mt-3" @click="saveBook()">Submit</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Book from "../../Entity/Book.js";
import Reading from "../../Entity/Reading.js";
import {
  GET_LANGUAGES_QUERY,
  GET_NARRATORS_QUERY,
  GET_BOOKS_QUERY,
  REGISTER_MUTATION
} from "../../constants/graqhql";
import FileDAS from "../../services/FileDAS";

export default {
  name: "add-reading",
  apollo: {
    // Simple query that will update the 'hello' vue property
    getNarrators: GET_NARRATORS_QUERY,
    getLanguages: GET_LANGUAGES_QUERY,
    getBooks: GET_BOOKS_QUERY,
  },
  data() {
    return {
      audiobook: {
        Book,
      },
      reading: {
        Reading,
      },
      files: [],
      select: null,
      submitted: false,
      duration: 0,
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.$hideLoading();
  },
  methods: {
    saveBook() {
      var fileData = {
        audiobook: this.files[0],
        audiobookName: this.getBooks.filter(
          (book) => book.id_book === this.reading.book
        )[0].title,
      };
      FileDAS.create(fileData)
        .then((response) => {
          console.log(response.data.id);
          this.reading.id_storage = response.data.id;
          this.$apollo
            .mutate({
              mutation: REGISTER_MUTATION,
              variables: {
                chapters: this.reading.chapters,
                duration: this.reading.duration,
                user: this.user.usuario.user_id,
                language: this.reading.language,
                narrators: this.reading.narrators,
                book: this.reading.book,
                storage: this.reading.id_storage,
              },
            })
            .then((response) => {
              console.log(response);
              this.Volver();
            })

            .catch((e) => console.log(e));
        })
        .catch((e) => {
          console.log(e);
        });

      var data = {};
      console.log(data);
    },
    Volver() {
      return this.$router.push("/Profile");
    },
    toHHMMSS: function(timeData) {
      var sec_num = parseInt(timeData, 10); // don't forget the second param
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    },
    getFiles(event) {
      this.files = event.target.files;
      this.previewAudio(this.files);
    },
    previewAudio(files) {
      let audio = document.getElementById("audio-preview");
      let reader = new FileReader();

      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", function() {
        audio.src = reader.result;
      });
      setTimeout(() => {
        var dur = this.toHHMMSS(audio.duration);
        this.reading.duration = dur;
      }, 1000);
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

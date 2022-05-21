<template>
  <body class="backgorund">
    <div class="container ">
      <div class="section content-title-group">
        <div class="row">
          <div class="col-6">
            <img src="../../assets/logo.png" />
          </div>
          <div class="col-6">
            <h2 class="title" v-if="!this.user.authorized">
              Bienvenido a Banana Reader
            </h2>
            <h2 class="title" v-else>Bienvenido {{ this.user.user.name }}</h2>
            <p>
              Aquí podrás encontrar los mejores audiolibros y compartir los
              tuyos!
            </p>
          </div>
        </div>
      </div>
      <div>
        <div class="level">
          <div class="level-item title"></div>
        </div>
        <div class="level">
          <div class="level-item">
            <ul></ul>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  mounted() {
    this.showLoading();
    setTimeout(() => {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.hideLoading();
      }, 100);

    if (this.$route.params.reload) {
      this.$router.go();
    }
    
  },
  methods: {
    hideLoading() {
      var x = document.getElementById("loading");
      x.style.display = "none";
    },
    showLoading() {
      var x = document.getElementById("loading");
      x.style.display = "flex";
    },
  },
}
</script>
<style>
.backgorund {
  background: linear-gradient(
    135deg,
    rgb(255, 255, 255) 10%,
    rgb(0, 228, 19) 90%
  );
}

</style>

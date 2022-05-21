<template>
  <v-app>
    <v-main>
      
    <div id="loading" class="loading show">
      <div class="spin"></div>
    </div>
      <Menu></Menu>
      <router-view />
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Menu from "./components/core/Menu.vue";
import Footer from "./components/core/Footer.vue";
export default {
  
  name: "App",
  components: {
    Menu,
    Footer,
  }, 
  data: () => ({
    //
  }),
};
</script>

<style>

.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.256);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: 1s all;
}
.loading.show {
  opacity: 1;
}
.loading.hide {
  opacity: 0;
}
.loading .spin {
  border: 7px solid hsla(69, 100%, 50%, 0.2);
  border-top-color: #171eed;
  border-radius: 50%;
  width: 3em;
  height: 3em;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
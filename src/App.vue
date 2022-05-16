<template>
  <v-app>
    <v-main>
      <Menu></Menu>
      <router-view />
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Menu from "./components/core/Menu-Component.vue";
import Footer from "./components/core/Footer-Component.vue";
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
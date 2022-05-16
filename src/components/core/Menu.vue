<template>
<div>
  <div>
    <v-app-bar color="#191919" dark x-small>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      
      ></v-app-bar-nav-icon>
      <div class="d-flex align-center" style="cursor: pointer"> 
      <img src="../../assets/logo.png" class="logo" />
      <label class="text-h5">
               BananaReader
             </label>
      </div>
      <v-spacer></v-spacer>
       
      
      <HeaderBarLinks></HeaderBarLinks>
    </v-app-bar>

    <v-navigation-drawer
     
      v-model="drawer"
      absolute
      top
      temporary
      src="https://i.pinimg.com/originals/2a/c5/8c/2ac58ca3c5e1d553148f12ba1d7a38e8.jpg"
    >
    <v-list>
        <v-list-item class="px-2">
          
        </v-list-item>

        <v-list-item link  >
          <v-list-item-content>
            <v-list-item-title class="text-h5" style="color:#fff">
               BananaReader_WS
             </v-list-item-title
            >
            <v-list-item-title class="text-h6" style="color:#fff" >
              </v-list-item-title
            >
            <v-list-item-subtitle >
              </v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4" 
        >
          <v-list-item v-for="item in items" :key="item.title" @click="item.action"  link >
            
            <v-list-item-icon   >
              <v-icon style="color:#fff">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content  >
              <v-list-item-title style="color:#fff">{{ item.title }}</v-list-item-title>
              
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    
     
    </v-navigation-drawer>

  </div>
    
<div class="modal-backdrop" v-show="modal">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          La siguiente cita está por comenzar
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
         <v-data-table
          :headers="headers"
          :items="todos"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="attendSchedule(item.id)">mdi-calendar-arrow-right</v-icon>
            <v-icon small @click="deleteUser(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        </slot>
       </section>

      
    </div>
  </div>

</div>
</template>

<script>
import HeaderBarLinks from "./HeaderBarLinks";
export default {
    
    name:'Menu',
    components: {
        HeaderBarLinks,
  },
     data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      drawer: false,
      group: null,
      modal:false, 
      inProcess:false, 
      appointmentList:[],
      todos:[],
      headers: [
        { text: "Fecha", align: "start", sortable: false, value: "date" },
        { text: "Hora", value: "hour", sortable: false },
        { text: "Tipo", value: "Tipos", sortable: false },
        { text: "Genero", value: "Genero", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [
        {
          title: "Dashboard",
          icon: "mdi-home",
          rol: ["admin", "Cliente", "Tailor"],
          action: this.goToDashboard,
        },
        {
          title: "Usuarios",
          icon: "mdi-account-box",
          rol: ["admin" ],
          action: this.goToUsers,
        },     
       
      ],
      messages: 1,
    };
  },
  methods:{
    close() {
        this.modal = false;
      },
      showModal() {
        this.modal = true;
      },
      closeModal() {
        this.modal = false;
      },
      goToDashboard(){
        return this.$router.push("/");
      },
      goToRoles(){
        return this.$router.push("/Roles");
      },
      goToUsers(){
        return this.$router.push("/Users");
      },
  },
   mounted() {
   
    this.user= JSON.parse(localStorage.getItem('user'));
   console.log(this.user.user)
  },
  created() {
    this.user= JSON.parse(localStorage.getItem('user'));
    
    if(this.user.user.rol.nombre=="Tailor"){
     this.appointmentList = this.getList(this.user.user.id);
    }
    
  }

}
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    
  }

  .modal {
    background: #FFFFFF;
    width: 500px;
    height: 250px;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
  .logo {
    width: 40px;
    height: auto;
  }
</style>
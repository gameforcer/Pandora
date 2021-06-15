<template>
<div>
  <div class="navbar">
    <div class="topnav">
      <router-link to="/"><div class="nav-el">Home</div></router-link>
      <router-link v-if="user > 0" to="/profile"><div class="nav-el">Profile</div></router-link>
      <router-link v-if="user <= 0" to="/login"><div class="nav-el">Login</div></router-link>
      <div v-else v-on:click="logout" class="nav-el">Logout</div>
    </div> 
    </div>
    <router-view @auth="onLogin"/>
</div>

</template>

<script>
export default {
  name: 'NavBar',
  data: function(){
        return {user: 0} 
    },
  methods: {
    onLogin (user) {
      this.user = user;
    }, 
    logout: function(){
      localStorage.removeItem('token');
      window.location.href = "/";
    },
  }
}
</script>

<style scoped>
.navbar {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #333;
}

.topnav {
  background-color: #333;
  overflow: hidden;
}

.topnav .nav-el {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 20px;
}

.topnav .nav-el:hover {
  background-color: #ddd;
  color: black;
}

.topnav .nav-el.active {
  background-color: #04AA6D;
  color: white;
}

.nav-el:last-child{
  cursor: pointer;
}
</style>
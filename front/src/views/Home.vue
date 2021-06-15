<template>
<div class="container">
  <div class="title">
    <h1><b>Welcome to Pandora!</b></h1>
  </div>
  <div class="section">
    <h2>About</h2>
    <p>Pandora is a space where you can keep check of all of your belongings without even looking inside the boxes to check them!</p>
  </div>
    <div class="section">
    <h2>How to start?</h2>
    <p>1. Create an account.</p>
    <p>2. Log in.</p>
    <p>3. Add a new item to generate a QR code.</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data: function(){
        return {user: {}} 
    },
    async mounted(){
        let token = localStorage.getItem('token');
        await axios.get('http://localhost:3000/user/profile', { headers: { Authorization: 'Bearer '.concat(token) } })
      .catch(function(error) {
        console.log(error);
        }).then(response => {
            this.user = response.data;
            this.$emit("auth", this.user.id);
        });
    },
}
</script>

<style scoped>
.container {
  background: #4299fb;
  margin-top:7vh;
  padding-top:5vh;
  padding: 7vh;
  color: rgb(255, 255, 255);
  
  min-width: 60%;
}

h1, h2, h3, h4, h5, h6 {
  margin-top:2vh;
  margin-bottom: 2vh;
}

.title {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;   
}

.title h1 {
  font-size: 3em;
}

.section {
  margin-top:5vh;
  text-align: left;
  background: #ffffff;
  color: rgb(0, 0, 0);
  padding: 3%;
  border-radius: 10px;
}
</style>
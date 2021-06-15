<template>
    <div class="whole">
        <div class="back">
            <div class="hint">{{hint}}</div>
            <form v-on:submit.prevent="login()" method="POST">
                <input v-model="email" name="email" type="text" placeholder="email">
                <input v-model="password" name="password" type="password" placeholder="password">
                <button type='submit'>Login</button>
            </form>
            <button v-on:click="register()">Create an account</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data: function(){
        return {
            email: '',
            password: '',
            hint: '',
            user: {}} 
    },
    methods: {
        login: function(){
            let dataToSend = {"email": this.email,
                          "password": this.password };
            axios.post('http://localhost:3000/user/login', dataToSend)
                    .then(response => {
                        let data =response.data;
                        if(typeof data === 'object' && data !== null){
                            localStorage.setItem('token', data.access_token);
                            this.$router.push('/profile');
                            }
                        else{
                            this.hint = data;
                        }
                        });
        },
        register: function(){
            this.$router.push('/register');
        }
    },    async mounted(){
        let token = localStorage.getItem('token');
        await axios.get('http://localhost:3000/user/profile', { headers: { Authorization: 'Bearer '.concat(token) } })
       .catch(function(error) {
            console.log(error);
        }).then(response => {
            this.user = response.data;
        });
        if (this.user.id)
            window.location.href = "profile";
    },
}
</script>


<style scoped>
    body{
        background: #000028;
    }
    .whole{
        margin-top: 5vw;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: top;
    }
    .back{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #4299fb;
        width: 60%;
        height: 40vh;
    }
    input{
        width: 80%;
        height: 25%;
        border: none;
        margin: 15px;
        margin-bottom:5px;
        padding-left:2%;
        border-radius: 10px;
    }
    button{
        width: 30%;
        min-height: 12%;
        border: none;
        border-radius: 10px;
        background: rgb(255, 255, 255);
        color: rgb(0, 0, 0);
        margin: 15px;
        transition: 0.4s;
    }
    form{
        padding: 10px;
        margin-bottom:2vh;
    }
    form>button{
        height: 25%;
    }
    button:hover{
        background: rgb(88, 88, 88);
        color: rgb(255, 255, 255);
  }
    .hint{
        color: rgb(0, 13, 36);
        font-weight: bold;
    }

    @media screen and (max-width: 800px) {
        .back{
            width: 100vw;
        }
        button{
            width: 40%;
        }
        form>button{
            width: 40%;
        }
    }
</style>
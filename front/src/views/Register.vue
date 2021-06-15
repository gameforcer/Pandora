<template>
    <div class="whole">
        <div class="back">
            <div class="hint">{{hint}}</div>
            <form v-on:submit.prevent="register()" method="POST">
                <input v-model="email" v-on:change="checkEmail()" name="email" type="text" placeholder="email">
                <input v-model="password" v-on:change="checkPassword()" name="password" type="password" placeholder="password">
                <input v-model="passwordagain" v-on:change="checkPassword()" name="passwordagain" type="password" placeholder="repeat password">
                <button type='submit'>Register</button>
            </form>
            
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
export default {
    data: function(){
        return {username: '',
        email: '',
        password: '',
        passwordagain: '',
        hint: ''}
    },
    methods: {
        register: function(){
            let dataToSend = { 
                          "email": this.email,
                          "password": this.password };
            axios.post('http://localhost:3000/user', dataToSend)
                    .then(response => {
                        console.log(response.data);
                        let data =response.data;
                        if (data === 'Success'){
                            
                            this.login();
                        }
                        else{
                            this.hint = data;
                        }
                    });
        },
        login: function(){
            this.$router.push('/login');
        },
        checkPassword: function(){
            if (this.password === this.passwordagain){
                this.hint = '';
            }
            else{
                this.hint = 'Passwords must be the same!';
            }
        },
        checkEmail: function(){
            if (this.email.includes('@') && this.email.includes('.')){
                this.hint = '';
            }
            else{
                this.hint = 'This is not a proper email!';
            }
        }
    },
    async mounted(){
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
        background: #4299fb;
        width: 40vw;
        height: 60vh;
    }
    input{
        width: 80%;
        height: 20%;
        border: none;
        border-radius: 10px;
        margin: 15px;
        padding-left:2%;
    }
    input[type=file]{
        height: 80%;
    }
    button{
        width: 25%;
        min-height: 25%;
        border: none;
        border-radius: 10px;
        background: rgb(255, 255, 255);
        color: rgb(0, 0, 0);
        margin: 15px;
        transition: 0.4s;
    }
    button:hover{
        background: rgb(88, 88, 88);
        color: rgb(255, 255, 255);
  }
    @media screen and (max-width: 800px) {
        .back{
            width: 100vw;
        }
        button{
            width: 40%;
        }
    }
    .hint{
        color: rgb(0, 13, 36);
        margin-top: -10vh;
        font-weight: bold;
    }

</style>
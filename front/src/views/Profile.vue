<template>
    <div class="whole">
        <div class="back scanned" v-if="name_displayed.length > 0">
            <h1><b>{{name_displayed}}</b></h1> 
            <p>{{items_displayed}}</p>
        </div>  
        <qrcode-drop-zone @decode="onDecode" class="drop-zone" >Put your QRcode file here!</qrcode-drop-zone>
        <qrcode-capture @decode="onDecode" class="capture"></qrcode-capture>
        <div class="back trans" v-if="name_selected.length > 0">
            <h2><b>Your QR code</b></h2>
            <qr-code id="pop-up" ref="qr" :text="name_selected" :size="250"></qr-code>
        </div>  
        <div class="back">
          <h2>Create a new box</h2>
            <form v-on:submit.prevent="createBox()" method="POST">
                <input v-model="name" name="name" type="text" placeholder="box name" required>
                <textarea v-model="items" name="items" cols="40" rows="5"  placeholder="items" required></textarea>
                <button id="createButton" type='submit'>Submit</button>
            </form>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th class="left-border">Content</th>
                    <th class="left-border">Delete</th>
                    <th>Display QR</th>
                </tr>
            </thead>
            <tbody id="boxList">
                 <tr v-for="box in boxes" v-bind:key="box">   
                    <td class="name-row">{{box.name}}</td>
                    <td class="left-border max-width">{{box.items}}</td>
                    <td class="left-border"><button class="deleteButton" @click="deleteRow(box.id)">X</button></td>
                    <td ><button class="QRButton" @click="displayQR(box.id)">√</button></td>
                </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: function(){
        return {user: {}, boxes: [], name: "", items:"", name_selected: "", name_displayed: "", items_displayed: ""} 
    },
    methods: {
        createBox: function(){
            this.name_selected = this.name;
            let dataToSend = { "id": this.user.id, "name": this.name,"items": this.items};
            axios.post('http://localhost:3000/storage/new', dataToSend)
                .then(response => {
                    if (typeof response.data === 'object')
                    {
                        this.boxes.push({id: response.data.id, name: dataToSend.name, items: 
                            dataToSend.items});
                    }
                });
        },
        deleteRow: function(row){
            let isThrown = false;
            axios.post('http://localhost:3000/storage/remove', { "boxId": row})
            .catch(function(error) {
                console.log(error);
                isThrown = true;
            }).then(() => {
                if(!isThrown)
                    for(let i=0;i<this.boxes.length;i++){
                        if (this.boxes[i].id === row){
                            this.boxes.splice(i, 1);
                        }
                    }
                });
        },
        displayQR: function(box){
            for(let i=0;i<this.boxes.length;i++){
                if (this.boxes[i].id === box){
                    this.name_selected = this.boxes[i].name;
                    this.name_displayed = "";
                    this.items_displayed = "";
                }
            }
        },
        onDecode (decodedString) {
            let wasFound = false;
            for(let i=0;i<this.boxes.length;i++){
                if (this.boxes[i].name === decodedString){
                    this.name_displayed = this.boxes[i].name;
                    this.items_displayed = this.boxes[i].items;
                    this.name_selected = this.name_displayed;
                    wasFound = true;
                }
            }
            if(wasFound === false){
                this.name_displayed = ("No box with name ").concat(decodedString," found.");
                this.items_displayed = "";
                this.name_selected = "";
            }
        },
    },  
    async mounted(){
        let token = localStorage.getItem('token');
        await axios.get('http://localhost:3000/user/profile', { headers: { Authorization: 'Bearer '.concat(token) } })
       .catch(function(error) {
            if (error.response && error.response.status === 401) {
                window.location.href = "login";
            }
            else {
                window.location.href = "/";
            }
        }).then(response => {
            this.user = response.data;
            this.$emit("auth", this.user.id);
        });

        await axios.post('http://localhost:3000/user/all', {id: this.user.id})
        .then(response => {
            this.boxes = response.data;
        });
    },
}
</script>

<style scoped>
  body{
      background: #000028;
  }
  .whole{
      margin-top: 5vw;
      width: 100%;
      height: 100vh;
      align-items: top;
      white-space: pre-wrap;
  }
  .back{
      overflow: hidden;
      margin:auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #4299fb;
      padding-top:5vh;
      width: 60%;
      min-height: 20vh;
      color: white;
  }
  textarea{
      width: 80%;
      height: 50%;
      border: none;
      margin: 15px;
      padding-left:2%;
      resize: none;
  }
  form{
      padding: 10px;
  }
    #createButton{
      width: 30%;
      height: 12%;
      border: none;
      border-radius: 10px;
      background: rgb(255, 255, 255);
      color: rgb(0, 0, 0);
      margin: 15px;
      transition: 0.4s;
  }
    #createButton:hover{
        background: rgb(88, 88, 88);
        color: rgb(255, 255, 255);
  }
  form>#createButton{
      height: 20%;
      padding: 10px;
  }

  h2 {
    color: white;
  }

  table{
    margin: auto;
    margin-top: 7vh;
    width: 60%;
    color: black;
    margin-bottom: 7vh;
    border: 5px solid rgb(0, 96, 221);
    overflow: scroll;
    background: rgb(241, 241, 241);
  }

  th {
    border-bottom: 5px solid rgb(0, 96, 221);
    padding: 1vh;
  }
  td {
    border-bottom: 2px solid rgb(0, 96, 221); 
    border-radius: 1em;
    text-align: center;
    padding: 0.5em;
    word-break: break-word;
  }

  .name-row{
    word-break: normal;
  }

  .left-border{
      border-left: 2px solid rgb(0, 96, 221);
      border-radius: 1em;
  }



  .deleteButton{
      color: red;
      cursor: pointer;
      background: none;
      height: 100%;
      border: none;
      width: 70%;
      font-size:1.5em;
  }

  .QRButton{
      color: rgb(0, 146, 0);
      cursor: pointer;
      background: none;
      height: 100%;
      border: none;
      width: 70%;
      font-size:1.5em;
      font-weight: 900;
  }

  #pop-up{
      padding-bottom: 5vh;
      margin-bottom: 7vh;
  }

  .drop-zone{
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:auto;
    min-height: 14vw;
    text-align: center;
    width: 60vw;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 2px dashed #55d1f6;
    margin-top:7vh;
    margin-bottom:1vh;
    font-size: 3vh;
  }

  .capture{
    overflow: hidden;
    margin-bottom:7vh;
  }

  h2{
    margin-bottom: 2vh;
  }

  .trans{
    margin-bottom:-10vh;
  }

  .scanned{
      font-size: 1.5em;
      padding-bottom:3vh;
  }

  @media only screen and (max-width: 800px) {
    .back{
        width: 100vw;
    }
    button{
        width: 40%;
    }
    form>button{
        width: 40%;
    }
    table{
        font-size: 0.8em;
        width:100%;
    }
  }
</style>
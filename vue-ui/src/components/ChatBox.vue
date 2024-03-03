<script>

    import { io } from 'socket.io-client'

    const adjectives = ['chief','jaded','aloof','known','lying','teeny','swift','nappy','every','tired','juicy','husky','sweet','crazy','lucky','spicy','quiet','moldy','foamy','gaudy','ahead','weary','witty','thick','light']
    const nouns = ['event','ratio','owner','scene','blood','phone','honey','steak','piano','power','night','error','youth','chest','heart','story','music','river','media','guest','uncle','tooth','buyer','paper','movie']

    export default {

        data(){
            return {
                username: '',
                chatbox: '',
                chats: [],
                known_users: {}
            }
        },
        mounted(){
            console.log("[chat box] mounted!")
            this.username = (()=>{
                return `${adjectives[Math.floor(Math.random() * (24 - 0))]}-${nouns[Math.floor(Math.random() * (24 - 0))]}`
            })()
            console.log(this.username)
            this.socket = io()

            this.socket.on('chat', (chat)=>{
                this.chats.push(chat)
                if(!this.known_users.hasOwnProperty(chat.user))
                {
                    var randomColor = Math.floor(Math.random()*16777215).toString(16);
                    var firstKnownAlias = chat.alias
                    this.known_users[chat.user] = {
                        style: `#${randomColor}`,
                        firstKnownAlias: firstKnownAlias,
                        
                    }
                }
            } )

        },
        methods: {
            getTime(){
                return Date.now()
            },

            sendChat(){
                this.socket.emit('chat', {
                    id: Math.floor(Math.random() * (456789656789 - 0)),
                    alias: this.username,
                    message: this.chatbox
                });
                this.chatbox = ''
            }
        }

    }

</script>


<template>

    <div>
        <div v-for="chat in chats" :key="chat.chat_id" class="grid">
            <div :style="{"text-color": known_users[chat.user].style}">[{{chat.time}}] - {{ chat.alias }}:</div>
            <div>{{ chat.message }}</div>
        </div>



    </div>




    <div>
        <form>
            <fieldset role="group">
                <input v-model="username"  type="text">
            </fieldset>
        </form>
    </div>
    <textarea v-model="chatbox" placeholder="put a message in here">

    </textarea>
    <button @click="()=>{sendChat()}">send a chat</button>

</template>
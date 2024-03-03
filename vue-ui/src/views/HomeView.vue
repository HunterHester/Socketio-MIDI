<script>

  import ChatBox from '../components/ChatBox.vue'
  import MidiBox from '../components/MidiBox.vue'

  export default {

    components: {
      ChatBox,
      MidiBox
    },

    data(){
      /*
        reactive data source you can reference in the template. reference it in the js using this.thing_i_want_to_access
      */
      return {
        test_data: "hello world from the vue obj",
        clicked: 0
      }
    },
    methods: {

    },
    mounted(){
      /*
        mounted() hook, runs when the component is mounted - after virtual dom is loaded but right before rendering, I think
      */
      console.log("[home world]: mounted! ")
    }

  }
</script>

<template>
  <main>
    <div class="grid">
      <div>
        hello werld from home view
      </div>
      <div>
        <button @click="()=>{ this.clicked++ }">hello</button>
      </div>
    </div>



    {{ clicked }}

    <hr>
    <ChatBox/>

</main>
</template>

<style>

</style>

<template>
  <div class="home">
    <div class="gameStateZone">
      <h1 v-on:click="joinGame">{{gameState}}</h1>
      <button>Help</button>
    </div>
    <div class="cardZone">
      <div class="cards">
        <span class="cardNumber">1</span>
        <button>Drop</button>
      </div>
    </div>
    <div>Dialog</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'home',
  components: {
    HelloWorld,
  },
  computed: mapGetters(['gameState']),
  methods: {
    ...mapActions(['wsSendMessage']),
    joinGame() {
      // @ts-ignore
      this.wsSendMessage('JOIN_GAME');
    },
  },
});
</script>

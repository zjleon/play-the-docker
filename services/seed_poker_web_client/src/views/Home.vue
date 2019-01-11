<template>
  <div class="home">
    <div class="gameStateZone">
      <h1>Game Statue Bar</h1>
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
import { mapActions } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'home',
  components: {
    HelloWorld,
  },
  methods: {
    // ...mapActions(['getMessageTypes']),
  },
});
</script>

<template>
  <v-container grid-list-md fluid pa-0>
    <v-layout row align-center px-2 class="top-bar">
      <v-flex xs9>
        <h2 v-on:click="joinGame">{{gameState}}</h2>
      </v-flex>
      <v-flex xs3 text-xs-right>
        <v-btn color="info" small depressed>Help</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row mt-3 px-2>
      <Card number="6" needDecision="true" />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import Card from '@/components/Card.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'home',
  components: {
    Card,
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

<style lang="stylus" scoped>
.top-bar
  // border-bottom 1px solid grey

</style>


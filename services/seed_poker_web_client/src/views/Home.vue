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
      <Card v-bind:number="6" v-bind:needDecision="true" />
    </v-layout>
    <v-dialog
      v-model="showJoinGameDialog"
      width="75%"
      persistent
    >
      <v-card>
        <v-card-text>
          Tips for how this game works
        </v-card-text>
        <v-card-actions>
          <!-- <v-btn color="primary" v-on:click="addAI">Fill with AI</v-btn> -->
          <v-spacer></v-spacer>
          <v-btn color="primary" v-on:click="joinGame">Join Game</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import Card from '@/components/Card.vue'; // @ is an alias to /src
import { log } from 'util';

export default Vue.extend({
  name: 'home',
  components: {
    Card,
  },
  computed: {
    ...mapGetters(['gameState']),
    showJoinGameDialog() {
      const state = this.$store.state;
      return !state.player.id;
    },

  },
  methods: {
    ...mapActions(['wsSendMessage']),
    joinGame() {
      // @ts-ignore
      this.wsSendMessage('JOIN_GAME');
    },
    addAI() {
      // @ts-ignore
      this.wsSendMessage('ADD_AI');
    },
  },
});
</script>

<style lang="stylus" scoped>
.top-bar
  // border-bottom 1px solid grey

</style>


<template>
  <v-flex text-xs-center>
    <v-card dark color="accent">
      <v-card-text>
        <p class="card-number">{{number}}</p>
        <v-btn color="warning" large v-if="needDecision">Drop</v-btn>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Card',
  props: {
    number: Number,
    needDecision: Boolean,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.card-number
  font-size 7rem
</style>

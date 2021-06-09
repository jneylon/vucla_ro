<template>
  <v-container fill-height fluid>
    <v-row class="text-center" align="center" justify="center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/ucla_radonc.png')"
          class="my-3"
          contain
          height="80"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to vUCLARO
        </h1>

        <p class="subheading font-weight-regular">
          A collection of web tools for clinical automation, 
          <br>data visualization, and research facilitation.
        </p>
      </v-col>
    </v-row>
    <v-footer app
      color="#2774AE"
      padless
      class="no-print">
      <v-col
        class="text-center white--text"
        cols="12"
        >
          <h3>Comments, Questions or Requests?</h3>
          <br>Address all comments to <strong>Jack Neylon, PhD, DABR  |  jneylon@mednet.ucla.edu</strong>
        </v-col>
    </v-footer>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloUCLARO',
  }
</script>

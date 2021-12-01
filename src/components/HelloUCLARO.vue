<template>
  <v-container fill-height fluid>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/ucla_radonc.png')"
            class="my-3"
            contain
            height="80"
          />
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col cols="12" class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">
            Welcome to vUCLARO
          </h1>
          <p class="subheading font-weight-regular">
            A collection of web tools for clinical automation, 
            <br>data visualization, and research facilitation.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-2" v-for="i in pages" :key="i">
          <v-btn 
            :color="check_color[color_index]" 
            @click="emitSelectedWafer(i)"
            block
            rounded
            dark>
            <v-icon>{{ w_icons[i] }}</v-icon>&emsp;{{ w_titles[i] }}
          </v-btn>
        </v-col>
      </v-row>
    <v-footer app
      color="#2774AE"
      padless
      class="no-print">
      <v-col
        class="text-center white--text"
        >
          <h3>Comments, Questions, or Requests?</h3>
          <br>Address to <strong>Jack Neylon, PhD, DABR  |  jneylon@mednet.ucla.edu</strong>
        </v-col>
    </v-footer>
  </v-container>
</template>

<script>
  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
    ['#005587', '#2774AE', '#8BB8E8'],
    ['#FFB81C', '#FFC72C', '#FFD100']
  ]

  export default {
    name: 'HelloUCLARO',
    props: {
      w_titles: {
        type: Array,
        default: function() {
          return ['null'];
        } 
      },
      w_icons: {
        type: Array,
        default: function() {
          return ['null'];
        } 
      },
    },
    data() {
        return {
          gradient: gradients[6],
          value: [0, 3, 7, 10, 7, 3, 0, 3, 7, 10, 7, 3, 0, 3, 7, 10, 7, 3, 0],
          check_color: ['#2774AE', '#FFD100', '#8BB8E8', '#FFB81C'],
          color_index: 0,
          gradients,
        }
      },
    computed: {
      pages () {
        return this.w_titles.length-1;
      } 
    },
    methods: {
      emitSelectedWafer(sid) {
        this.$emit("selection", sid);
      }
    }
  }
</script>

<template>
  <v-app>
    <v-app-bar
      app
      color="#2774AE"
      dark
      clipped-left
      >
      <div class="d-flex align-center">
        <v-img
          alt="vUCLARO Logo"
          class="shrink mr-2"
          contain
          src="./assets/UCLAH_White.png"
          transition="scale-transition"
          width="250"
        />       
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-title class="no-print"><v-icon>{{ wafer_icons[vindex] }}</v-icon> {{ wafer_title[vindex] }}</v-toolbar-title>
      <v-app-bar-nav-icon @click="navdrawer=true" class="no-print"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="navdrawer"
      absolute
      temporary
      right
      >
      <v-list
        nav
        dense
        >
          <v-list-item-group
            v-model="vindex"
            color="#2774AE"
            mandatory
            >
            <v-list-item @click="navdrawer=false">
              <v-list-item-icon><v-icon>{{ wafer_icons[0] }}</v-icon></v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item @click="navdrawer=false">
              <v-list-item-icon><v-icon>{{ wafer_icons[1] }}</v-icon></v-list-item-icon>
              <v-list-item-title>Bravos_SM Decay Table</v-list-item-title>
            </v-list-item>
            <v-list-item @click="navdrawer=false">
              <v-list-item-icon><v-icon>{{ wafer_icons[2] }}</v-icon></v-list-item-icon>
              <v-list-item-title>Bravos_SM TG43 Calc</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main class="v-content">
      <HelloUCLARO v-if="vindex == 0"></HelloUCLARO>
      <DecayTable v-if="vindex == 1"></DecayTable>
      <TG43 v-if="vindex == 2"></TG43>
    </v-main>
  </v-app>
</template>

<script>
import HelloUCLARO from './components/HelloUCLARO';
import DecayTable from './components/DecayTable';
import TG43 from './components/TG43';

export default {
  name: 'App',

  components: {
    HelloUCLARO,
    DecayTable,
    TG43,
  },

  data: () => ({
    wafer_title: ['Home',
                  'Bravos_SM Decay Table',
                  'Bravos_SM TG43 Calc'],
    wafer_icons: ['mdi-home',
                  'mdi-timer-sand',
                  'mdi-atom'],
    navdrawer: false,
    vindex: 0,
  }),
};
</script>

<style>
    @media print{
        .v-content {
            padding: 0 !important;
            margin-top: 2cm; 
        }
        .no-print {
            display: none;
            padding: 0 !important;
        }
    }   
</style>
<template>
  <v-app>
    <v-app-bar
      app
      color="#2774AE"
      dark
      clipped-left
      absolute
      flat
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

      <v-divider vertical class="mx-4; no-print"></v-divider>
      <v-btn text class="no-print"><v-icon>{{ wafer_icons[vindex] }}</v-icon></v-btn>
      <v-toolbar-title class="no-print">{{ wafer_title[vindex] }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="no-print">
        <v-btn text v-if="vindex != 0" @click="vindex = 0" class="no-print"><v-icon>{{ wafer_icons[0] }}</v-icon></v-btn>
        <v-divider vertical class="no-print"></v-divider>
      </v-toolbar-items>

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
            <v-list-item @click="navdrawer=false" v-for="i in pages" :key="i">
              <v-list-item-icon><v-icon>{{ wafer_icons[i-1] }}</v-icon></v-list-item-icon>
              <v-list-item-title>{{ wafer_title[i-1] }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main class="v-content">
      <router-view @selection="selectWafer"/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    wafer_title: ['Home',
                  'Bravos_SM Decay Table',
                  'Bravos_SM TG43 Calc',
                  'Trajectory Log Analysis',
                  'Settings'],
    wafer_icons: ['mdi-home',
                  'mdi-timer-sand',
                  'mdi-atom',
                  'mdi-abacus',
                  'mdi-cog-outline'],
    wafer_paths: ['/home',
                  '/decay',
                  '/tg43',
                  '/tlog',
                  '/settings'],
    navdrawer: false,
    vindex: 0,
  }),
  computed: {
      pages () {
        return this.wafer_title.length;
      } 
  },
  methods: {
    selectWafer (sid) {
      this.vindex = sid
    },
    updateRouter () {
      if (this.vindex == 0) {
        this.$router.push({ name: 'home',
                            params: {
                              w_titles: this.wafer_title,
                              w_icons: this.wafer_icons
                            }});
      } else {
        this.$router.push({ path: this.wafer_paths[this.vindex]});
      }
    }
  },
  watch: {
    vindex: function () {
      this.updateRouter();
    }
  },
  mounted() {
    this.updateRouter()
  }
};
</script>

<style>
    @media print{
        .v-content {
            padding: 0 !important;
            margin-top: 15mm; 
        }
        .no-print {
            display: none;
            padding: 0 !important;
        }
        .nobreak
        {
          page-break-inside: avoid;
          break-inside: avoid
        }
        .breakbefore
        {
          page-break-before:always;
          break-before:always;
        }
    }
</style>
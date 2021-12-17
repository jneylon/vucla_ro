<template>
    <div id="decay_table">
        <v-navigation-drawer
            app
            clipped 
            permanent
            stateless
            :mini-variant="!show_settings"
            mini-variant-width="80"
            dark
            width="360" 
            class="no-print">
            <v-list-item>
                <v-list-item-content>
                    <v-icon @click="show_settings=!show_settings">mdi-unfold-more-vertical</v-icon>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list>
                <v-list-group :value="show_settings" @click="show_settings=true">
                    <template v-slot:activator>
                        <v-list-item-icon><v-icon>mdi-timetable</v-icon></v-list-item-icon>
                        <v-list-item-title>Decay Date & Time:</v-list-item-title>
                    </template>
                    <v-list-item>
                        <v-card outlined>
                            <v-card-text>
                                <v-date-picker 
                                    show-adjacent-months
                                    v-model="current.date"
                                    width="275"
                                ></v-date-picker>
                            </v-card-text>
                        </v-card>
                    </v-list-item>
                    <v-list-item>
                        <v-card outlined>
                            <v-card-text>
                                <v-time-picker
                                    v-model="current.time"
                                    :allowed-minutes="allowedStep"
                                    format="24hr"
                                    width="275"
                                    scrollable
                                ></v-time-picker>
                            </v-card-text>
                        </v-card>
                    </v-list-item>
                </v-list-group>
            </v-list>
            <v-divider></v-divider>
            <v-list>
                <v-list-item @click="print2pdf()">
                    <v-list-item-icon><v-icon>mdi-printer</v-icon></v-list-item-icon>
                    <v-list-item-title>Print to PDF</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-container>
            <v-row>
                <v-col>
                    <h2 style="text-align:center;">UCLA Radiation Oncology</h2>
                    <h2 style="text-align:center;">HDR Brachytherapy - Independent Ir-192 Decay Calculation</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card outlined>
                        <v-card-title>Bravos_SM Source Data</v-card-title>
                        <v-card-subtitle class="d-flex justify-space-between">
                            <div><b>Source Serial No:</b> {{ source.serial }}</div>
                            <div><b>{{ source.isotope }} half-life:</b> {{ source.half_life }} days</div>    
                        </v-card-subtitle>
                        <v-card-text>
                            <v-simple-table dense>
                                <tbody>
                                    <tr>
                                        <td><b>Calibration Date:</b></td>
                                        <td>{{ calibration | format_datestring() }}</td>
                                        <td>10:00 PT</td>
                                    </tr>
                                    <tr>
                                        <td><b>Listed 10 Ci Date:</b></td>
                                        <td>{{ ten_ci | format_datestring() }}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Calibration Strength</b></td>
                                        <td>{{ source.curie }} Ci
                                        <br>{{ source.gbq }} GBq
                                        <br>{{ source.air_kerma_m }} mGy m<sup>2</sup> / h
                                        <br>{{ source.air_kerma_cm }} cGy cm<sup>2</sup> / h</td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card outlined>
                        <v-card-title class="d-flex justify-space-between">
                            <h4>Source Decay Calculation</h4>
                            <v-btn 
                                fab 
                                text 
                                small 
                                class="no-print" 
                                @click="show_settings=true">
                                <v-icon>mdi-update</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-subtitle>
                            <div><b>Decay Date: </b>{{ current.date }}, {{ current.time }} PT</div>
                        </v-card-subtitle>
                        <v-card-text>
                            <v-row>
                                <v-col class="pa-2">
                                    <v-card style="text-align:center;">
                                        <h3>Elapsed Days</h3>
                                        <p>From Calibration</p>
                                        <v-card-text>
                                            <v-progress-circular
                                                rotate="-90"
                                                size="125"
                                                width="20"
                                                :value="elapsed_progress"
                                                color="teal"
                                                >
                                                <h2>{{ elapsed_days | onlysigfigs(3) }}</h2>
                                            </v-progress-circular>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col class="pa-2">
                                    <v-card style="text-align:center;">
                                        <h3>Decay Factor</h3>
                                        <p>% Remaining</p>
                                        <v-card-text>
                                            <v-progress-circular
                                                rotate="-90"
                                                size="125"
                                                width="20"
                                                :value="decay_progress"
                                                color="purple darken-3"
                                                >
                                                <h2>{{ decay_progress | onlysigfigs(1) }}%</h2>
                                            </v-progress-circular>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col class="pa-2">
                                    <v-card style="text-align:center;">
                                        <h3>Source Activity</h3>
                                        <p>Ci</p>
                                        <v-card-text>
                                            <v-progress-circular
                                                rotate="-90"
                                                size="125"
                                                width="20"
                                                :value="decay_progress"
                                                color="cyan darken-2"
                                                >
                                                <h2>{{ decay_activity | onlysigfigs(3) }}</h2>
                                            </v-progress-circular>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col class="pa-2">
                                    <v-card style="text-align:center;">
                                        <h3>Air Kerma Strength</h3>
                                        <p>cGy cm<sup>2</sup> / h</p>
                                        <v-card-text>
                                            <v-progress-circular
                                                rotate="-90"
                                                size="125"
                                                width="20"
                                                :value="decay_progress"
                                                color="indigo darken-2"
                                                >
                                                <h2>{{ decay_aks | onlysigfigs(1) }}</h2>
                                            </v-progress-circular>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row style="page-break-after: always;">
                <v-col>
                    <v-card outlined>
                        <v-card-title>Independent Decay Check:</v-card-title>
                        <v-card-subtitle>Check the Decayed Source Activity on the Treat Computer</v-card-subtitle>
                        <v-card-text>
                            <v-row>
                                <v-col class="pa-2">
                                    <v-text-field 
                                        label="Treat Computer Activity (Ci)"
                                        placeholder="Enter the Decayed Source Activity on the Treat Computer in Curie"
                                        hint="Enter the Decayed Source Activity on the Treat Computer in Curie"
                                        v-model="tx_curie">
                                    </v-text-field>
                                </v-col>
                                <v-col class="pa-2">
                                    <v-card :color="check_color[decay_check]" dark>
                                        <v-card-title>Difference in Activity (%):</v-card-title>
                                        <v-card-text><h3>{{ decay_diff | onlysigfigs(2) }}</h3></v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card outlined>
                        <v-card-title>Pre-Treatment Decay & Time Scaling Checks:</v-card-title>
                        <v-card-subtitle>All treatment plans are generated using a 10 Ci source.
                            <br>Enter the values below from the Pre-Treatment Report
                        </v-card-subtitle>
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-text-field 
                                        label="Planned Treatment Time (s)"
                                        placeholder="Enter the Total Planned Treatment Time in Seconds"
                                        hint="Enter the Total Planned Treatment Time in Seconds"
                                        v-model="tx_time">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="pa-2">
                                    <v-text-field 
                                        label="Bravos Scaled Activity (Ci)"
                                        placeholder="Enter the Scaled Activity in Curie"
                                        hint="Enter the Scaled Activity in Curie"
                                        v-model="bravos_scaled_ci">
                                    </v-text-field>
                                </v-col>
                                <v-col class="pa-2">
                                    <v-card color="cyan darken-2" dark>
                                        <v-card-title>Calc'd Activity (Ci):</v-card-title>
                                        <v-card-text><h3>{{ decay_activity | onlysigfigs(3) }}</h3></v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col class="pa-2">
                                    <v-card :color="check_color[bravos_decay_check]" dark>
                                        <v-card-title>Difference (%):</v-card-title>
                                        <v-card-text><h3>{{ bravos_decay_diff | onlysigfigs(2) }}</h3></v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="pa-2">
                                    <v-text-field 
                                        label="Bravos Scaled Treatment Time (s)"
                                        placeholder="Enter the Scaled Treatment Time in Seconds"
                                        hint="Enter the Scaled Treatment Time in Seconds"
                                        v-model="bravos_scaled_tx_time">
                                    </v-text-field>
                                </v-col>
                                <v-col class="pa-2">
                                    <v-card color="cyan darken-2" dark>
                                        <v-card-title>Calc'd Tx Time (s):</v-card-title>
                                        <v-card-text><h3>{{ scaled_tx_time | onlysigfigs(2) }}</h3></v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col class="pa-2">
                                    <v-card :color="check_color[scale_check]" dark>
                                        <v-card-title>Difference (%):</v-card-title>
                                        <v-card-text><h3>{{ scaled_diff | onlysigfigs(2) }}</h3></v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="pa-2">
                                    <v-text-field 
                                        label="Bravos Scaled Curie-Seconds (Ci-s)"
                                        placeholder="Enter the Scaled Total Curie-Seconds"
                                        hint="Enter the Scaled Total Curie-Seconds"
                                        v-model="bravos_scaled_cis">
                                    </v-text-field>
                                </v-col>
                                <v-col class="pa-2">
                                    <v-card color="cyan darken-2" dark>
                                        <v-card-title>Calc'd Ci-s:</v-card-title>
                                        <v-card-text><h3>{{ scaled_cis | onlysigfigs(2) }}</h3></v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col class="pa-2">
                                    <v-card :color="check_color[cis_check]" dark>
                                        <v-card-title>Difference (%):</v-card-title>
                                        <v-card-text><h3>{{ cis_diff | onlysigfigs(2) }}</h3></v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
  </div>
</template>

<script>
export default {
    name: 'DecayTable',
    data() {
        return {
            message: '',
            tx_time: null,
            tx_curie: null,
            bravos_scaled_ci: null,
            bravos_scaled_tx_time: null,
            bravos_scaled_cis: null,
            current: {
                date: new Date().toISOString().substr(0,10),
                time: '12:00',
            },
            source: {},
            check_color: {
                'None': '#2774AE',
                'Pass': 'light-green darken-3',
                'Fail': 'red darken-3'
            },
            show_settings: false,
        }
      },
    mounted() {
        fetch("/api/bravos_sources/active")
            .then(response => response.json())
            .then(result => {
                //console.log(result);
                this.source = result.source[0];
                //console.log(this.source);
            })
    },
    methods: {
        allowedStep: m => m % 5 === 0,
        print2pdf() {
            window.print();
        }
      },
    computed: {
        calibration () {
            if (!this.source) {
                return '';
            } else {
                return new Date(this.source.calibration);
            }
        },
        ten_ci () {
            if (!this.source) {
                return '';
            } else {
                return new Date(this.source.ten_ci_date);
            }
        },
        now_date () {
            var _date = new Date(this.current.date);
            var _year = _date.getFullYear();
            var _month = _date.getMonth();
            var _day = _date.getDate()+1;
            var _hour = this.current.time.substr(0,2);
            var _min = this.current.time.substr(3,5);
            var _now = new Date(_year,_month,_day,_hour,_min,0,0);
            //console.log("Now =" + _now);
            return _now;
        },
        elapsed_days () {
            var now_time = this.now_date.getTime();
            var cal_time = this.calibration.getTime();
            //console.log("Now =" + now_time);
            //console.log("Cal =" + cal_time);
            var diff = (now_time - cal_time) / (1000 * 3600 * 24);
            return diff;
        },
        elapsed_progress () {
            var prog = 100 * this.elapsed_days / 120;
            return prog;
        },
        decay_factor () {
            var f = Math.exp(-1 * Math.LN2 * (this.elapsed_days / this.source.half_life));
            return f;
        },
        decay_progress () {
            var prog = 100 * this.decay_factor;
            return prog;
        },
        decay_activity () {
            var act = this.decay_factor * this.source.curie;
            return act;
        },
        decay_aks () {
            var aks = this.decay_factor * this.source.air_kerma_cm;
            return aks;
        },
        decay_diff () {
            var diff = 100.0 * Math.abs(this.decay_activity - this.tx_curie) / this.decay_activity;
            return diff;
        },
        bravos_decay_diff () {
            if (!this.bravos_scaled_ci) { return '' }
            var diff = 100.0 * Math.abs(this.decay_activity - this.bravos_scaled_ci) / this.decay_activity;
            return diff;
        },
        scaled_diff () {
            if (!this.bravos_scaled_tx_time || !this.tx_time) {  return '' }
            var diff = 100.0 * Math.abs(this.scaled_tx_time - this.bravos_scaled_tx_time) / this.scaled_tx_time;
            return diff;
        },
        cis_diff () {
            if (!this.bravos_scaled_cis || !this.tx_time) {  return '' }
            var diff = 100.0 * Math.abs(this.scaled_cis - this.bravos_scaled_cis) / this.scaled_cis;
            return diff;
        },
        planned_cis () {
            var cis = this.tx_time * 10.0;
            return cis;
        },
        scaled_tx_time () {
            var scaled = this.tx_time * 10.0 / this.decay_activity;
            return scaled;
        },
        scaled_cis () {
            var scaled = this.scaled_tx_time * this.decay_activity;
            return scaled;
        },
        decay_check () {
            if (!this.tx_curie) { return 'None' }
            else if (this.decay_diff > 1) { return 'Fail'; }
            else { return 'Pass' }
        },
        bravos_decay_check () {
            if (!this.bravos_scaled_ci) { return 'None' }
            else if (this.bravos_decay_diff > 1) { return 'Fail'; }
            else { return 'Pass' }
        },
        scale_check () {
            if (!this.bravos_scaled_tx_time) { return 'None' }
            else if (this.scaled_diff > 1) { return 'Fail'; }
            else { return 'Pass' }
        },
        cis_check () {
            if (!this.bravos_scaled_cis) { return 'None' }
            else if (this.cis_diff > 1) { return 'Fail'; }
            else { return 'Pass' }
        },
      },
    filters: {
          onlysigfigs: function (value, figs) {
              if (!value) return '0'
              value = value.toFixed(figs);
              return value;
          },
          format_isostring: function (value) {
              return value.substr(0, 10);
          },
          format_datestring: function (value) {
              if (value == 'Invalid Date') {
                return '';
              } else {
                return value.toISOString().substr(0, 10);
              }
          }
      },
}
</script>

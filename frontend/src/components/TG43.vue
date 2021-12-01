<template>
    <div id="tg43">
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
                <v-list-item @click="loading=true,importJSON()">
                    <v-list-item-icon><v-icon>mdi-file-import</v-icon></v-list-item-icon>
                    <v-list-item-title>Import TG43 JSON File</v-list-item-title>
                </v-list-item>
                <v-list-item 
                    :disabled="!analyzed" 
                    @click="print2pdf()">
                    <v-list-item-icon><v-icon :disabled="!analyzed">mdi-printer</v-icon></v-list-item-icon>
                    <v-list-item-title>Print to PDF</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
                <v-list-group :value="show_settings" @click="show_settings=true">
                    <template v-slot:activator>
                        <v-list-item-icon><v-icon>mdi-timetable</v-icon></v-list-item-icon>
                        <v-list-item-title>Treatment Date & Time:</v-list-item-title>
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
        </v-navigation-drawer>
        <v-container justify="center" align="center">
            <v-row class="d-print-none">
                <v-col>
                    <v-card outlined :loading=loading>
                        <v-card-title>JSON File Parser:</v-card-title>
                        <v-card-text>
                            <v-file-input 
                                accept=".json"
                                :label="contents"
                                outlined
                                v-model="chosenFile">
                            </v-file-input>
                        </v-card-text>
                        <template slot="progress">
                            <v-progress-linear
                                color="#2774AE"
                                :indeterminate="loading"
                                rounded
                                height="6"
                            ></v-progress-linear>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <h2 style="text-align:center;">UCLA Radiation Oncology</h2>
                    <h2 style="text-align:center;">HDR Basic Dosimetry Calculation for Varian Bravos</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card outlined>
                        <v-card-title><h4>Patient & Plan Information:</h4></v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-card>
                                        <v-card-text class="d-flex justify-space-between">
                                            <b>Patient:</b>
                                            {{ patient }}
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-card>
                                        <v-card-text class="d-flex justify-space-between">
                                            <b>MRN:</b>
                                            {{ mrn }}
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-card>
                                        <v-card-text class="d-flex justify-space-between">
                                            <b>Plan:</b>
                                            {{ plan }}
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-card>
                                        <v-card-text class="d-flex justify-space-between">
                                            <b>Rx Dose Per Fraction:</b>
                                            {{ rx_dose }}
                                        </v-card-text>
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
                        <v-card-title class="d-flex justify-space-between">
                            <h4>Bravos_SM Source Data</h4>
                            <v-btn 
                                fab 
                                text 
                                small 
                                class="no-print" 
                                @click="show_settings=true">
                                <v-icon >mdi-update</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-subtitle class="d-flex justify-space-between">
                            <div><b>Source Serial No: </b>{{ source.serial }}</div>
                            <div><b>Dose Rate Constant: </b>{{ lambda }} cGy / h / U</div>
                        </v-card-subtitle>
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-card style="text-align:center;">
                                        <h3>Calibration Activity</h3>
                                        <p>Cal. Date: {{ calibration | format_datestring }}</p>
                                        <v-progress-circular
                                                    rotate="-90"
                                                    size="90"
                                                    width="10"
                                                    :value="calibration_progress"
                                                    color="teal"
                                                    >
                                                    <h3>{{ source.curie | onlysigfigs(2) }} Ci</h3>
                                        </v-progress-circular>
                                        <v-card-text><h4><b>Total Ci-s: </b>{{ scaled_cis | onlysigfigs(2) }}</h4></v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-card style="text-align:center;">
                                        <h3>Plan Activity</h3>
                                        <p>10 Ci Date: {{ ten_ci | format_datestring }}</p>
                                        <v-progress-circular
                                            rotate="-90"
                                            size="90"
                                            width="10"
                                            :value="tenci_progress"
                                            color="purple"
                                            >
                                            <h3>10.00 Ci</h3>
                                        </v-progress-circular>
                                        <v-card-text><h4><b>Planned Tx Time: </b>{{ tx_time | onlysigfigs(2) }} s</h4></v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-card style="text-align:center;">
                                        <h3>Treatment Activity</h3>
                                        <p>Tx Date: {{ current.date }}</p>
                                        <v-progress-circular
                                            rotate="-90"
                                            size="90"
                                            width="10"
                                            :value="decay_progress"
                                            color="primary"
                                            >
                                            <h3>{{ decay_activity | onlysigfigs(2) }} Ci</h3>
                                        </v-progress-circular>
                                        <v-card-text><h4><b>Scaled Tx Time: </b>{{ scaled_tx_time | onlysigfigs(2) }} s</h4></v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-show="analyzed">
                <v-col>
                    <v-card outlined>
                        <v-card-title><h4>Plan Calculation Points for Verification:</h4></v-card-title>
                        <v-card-subtitle>{{ prp_counter }} reference points with physical locations identified.</v-card-subtitle>
                        <v-card-text>
                                <v-simple-table dense>
                                    <thead>
                                        <tr>
                                            <th class="text-left"><b>Ref Point ID</b></th>
                                            <th class="text-left"><b>Plan Dose (cGy)</b></th>
                                            <th class="text-left"><b>Plan Dose (%)</b></th>
                                            <th class="text-left"><b>Calculated Dose (cGy)</b></th>
                                            <th class="text-left"><b>Percent Difference (%)</b></th>
                                            <th class="text-left"><b>Pass/Fail</b></th>
                                            <th class="no-print text-center"><b>Hide/Show</b></th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="analyzed">
                                        <tr v-for='calcpt in ref_calcs' :key="calcpt.id">
                                            <td :class="fonts[calcpt.icon]"><b>{{ calcpt.id }}</b></td>
                                            <td :class="fonts[calcpt.icon]">{{ calcpt.plan | onlysigfigs(2) }}</td>
                                            <td :class="fonts[calcpt.icon]">{{ calcpt.pct | onlysigfigs(2) }}</td>
                                            <td :class="fonts[calcpt.icon]">{{ calcpt.dose | onlysigfigs(2) }}</td>
                                            <td :class="fonts[calcpt.icon]">{{ calcpt.diff | onlysigfigs(2) }}</td>
                                            <td :class="calcpt.font"><b>{{ calcpt.pass }}</b></td>
                                            <td class="no-print text-center"><v-icon @click="calcpt.show=!calcpt.show; toggle_icons()">{{ calcpt.icon }}</v-icon></td>
                                        </tr>
                                    </tbody>
                                </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
  </div>
</template>

<script>
export default {
    name: 'TG43',
    data() {
        return {
            message: '',
            tx_time: 0.0,
            loading: false,
            analyzed: false,
            chosenFile: null,
            contents: 'Select a JSON file',
            current: {
                date: new Date().toISOString().substr(0,10),
                time: '12:00',
            },
            json: null,
            patient: null,
            mrn: null,
            plan: null,
            rx_dose: null,
            ref_points: null,
            ref_calcs: [],
            rp_counter: 0,
            dwells: null,
            radial: {
                counter: 14,
                dist: [0.0, 2.0, 2.5, 5.0, 7.5, 10.0, 15.0, 20.0, 30.0, 40.0, 50.0, 60.0, 80.0, 100.0],
                dose: [0.998, 0.998, 0.997, 0.996, 0.998, 1.0, 1.003, 1.006, 1.006, 1.004, 0.999, 0.993, 0.968, 0.935]
            },
            lambda: 1.117,
            gamma: 40700,
            tolerance: 5,
            fonts: {
                'Pass': "green--text",
                'Fail': "red--text",
                'mdi-eye-off': "text--disabled text-decoration-line-through font-italic no-print",
            },
            source: {},
            show_settings: false,
        }
    },
    mounted() {
        fetch("http://localhost:3000/api/bravos_sources/active")
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.source = result.source[0];
                console.log(this.source);
            })
    },
    methods: {
        allowedStep: m => m % 5 === 0,
        interp_radial(distance) {
            var low_index = this.radial.counter-2;
            var high_index = this.radial.counter-1;
            for (let i = this.radial.counter-1; i>1; i--)
            {
                if (this.radial.dist[i] > distance)
                {
                    low_index = i-1;
                    high_index = i;
                }
            }
            var a = (distance - this.radial.dist[low_index]) / (this.radial.dist[high_index] - this.radial.dist[low_index]);
            var m = this.radial.dose[high_index] - this.radial.dose[low_index];
            var b = this.radial.dose[low_index] + a * m;
            return b;
        },
        toggle_icons() {
            for (let i = 0; i < this.rp_counter; i++)
            {
                if (this.ref_calcs[i].show) { 
                    this.ref_calcs[i].icon = 'mdi-eye';
                    this.ref_calcs[i].font = this.fonts[this.ref_calcs[i].pass];
                }
                else { 
                    this.ref_calcs[i].icon = 'mdi-eye-off';
                    this.ref_calcs[i].font = this.fonts['mdi-eye-off'];
                }
            }
        },
        importJSON() {
            if (!this.chosenFile) {
                return;
            }
            console.log(this.chosenFile.name);

            var reader = new FileReader();
            reader.readAsText(this.chosenFile);
            reader.onload = () => {
                this.json = JSON.parse(reader.result);
                this.patient = this.json.patient;
                this.mrn = this.json.mrn;
                this.plan = this.json.plan;
                this.rx_dose = this.json.rx_dose;

                this.ref_points = this.json.ref_points;
                //console.log(this.ref_points);
                this.rp_counter = this.ref_points.length;
                
                this.dwells = this.json.dwells;
                //console.log(this.dwells);

                this.ref_calcs = [];
                for (let r = 0; r < this.rp_counter; r++) 
                {
                    var dose_sum = 0.0;
                    for (let d = 0; d < this.dwells.length; d++)
                    {
                        var x_dist = this.dwells[d].xpos - this.ref_points[r].xpos;
                        var y_dist = this.dwells[d].ypos - this.ref_points[r].ypos;
                        var z_dist = this.dwells[d].zpos - this.ref_points[r].zpos;

                        var dist = Math.sqrt( x_dist*x_dist + y_dist*y_dist + z_dist*z_dist );
                        var dist_cm = dist / 10.0;
                        var grf = this.interp_radial(dist);
                        var d_time_h = this.dwells[d].time / 3600;
                        var d_partial = this.lambda * this.gamma * grf * d_time_h / (dist_cm*dist_cm)

                        dose_sum += d_partial;

                        if (r == 0)
                            this.tx_time += this.dwells[d].time;
                    }
                    var dose_diff = 100.0 * (dose_sum - this.ref_points[r].dose_abs) / this.ref_points[r].dose_abs;
                    let pass = "Fail";
                    let font = "red--text";
                    if (dose_diff < this.tolerance)
                    {
                        pass = "Pass";
                        font = "green--text";
                    }
                    let new_entry = {
                        'id': this.ref_points[r].id,
                        'dose': dose_sum,
                        'diff': dose_diff,
                        'plan': this.ref_points[r].dose_abs,
                        'pct': this.ref_points[r].dose_rel,
                        'show': true,
                        'icon': 'mdi-eye',
                        'pass': pass,
                        'font': font
                    };
                    this.ref_calcs.push(new_entry);
                }
            }
            this.loading = false;
            this.analyzed = true;
        },
        print2pdf() {
            window.print();
        }
      },
      computed: {
        prp_counter () {
            let c = 0;
            for (let i = 0; i < this.rp_counter; i++)
            {
                if (this.ref_calcs[i].show) { c++ }
            }
            return c;
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
        calibration () {
            return new Date(this.source.calibration);
        },
        ten_ci () {
            return new Date(this.source.ten_ci_date);
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
            var prog = 100 * this.elapsed_days / 90;
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
        tenci_progress () {
            var prog = 1000 / this.source.curie;
            return prog;
        },
        calibration_progress () {
            var prog = 100;
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
        }
      },
      filters: {
          onlysigfigs: function (value, figs) {
              if (!value) return '0'
              value = value.toFixed(figs);
              return value;
          },
          format_isostring: function (value) {
            if (value == 'Invalid Date') {
                return '';
            } else {
                return value.substr(0, 10);
            }
          },
          format_datestring: function (value) {
            if (value == 'Invalid Date') {
                return '';
            } else {
                return value.toISOString().substr(0, 10);
            }
          },
          checkTolerance: function(value, tolerance) {
                if (!value) return 'n/a'
                if (value > tolerance) return 'Fail'
                if (value < tolerance) return 'Pass'
          },
      },
}
</script>

<style>
    @media print{
        @page {
            size: Letter;
            margin: 5mm 2mm 5mm 2mm;
        }
    }
    v-simple-table {
        page-break-inside: auto;
      }
    tr {
        page-break-inside: avoid;
        page-break-after: auto;
    }
</style>

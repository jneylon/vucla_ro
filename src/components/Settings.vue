<template>
  <v-container fill-height fluid>
      <v-overlay
        :value="!authorize"
        opacity=0.9
        absolute>
            <v-card>
                <v-card-title>Login</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="User"
                                    v-model="authuser"
                                    :rules="[rules.required]"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Password"
                                    v-model="authpwd"
                                    :rules="[rules.required]"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="#2774AE" 
                        text
                        @click="checkAuthorization()"
                        >
                        OK
                    </v-btn>
                </v-card-actions>
            </v-card>
      </v-overlay>
      <v-row class="text-center">
        <v-col cols="12" class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">
            vUCLARO Settings
          </h1>
        </v-col>
      </v-row>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-title>Brachytherapy</v-card-title>
                  <v-card-subtitle>BravosSM Radioactive Source Inventory</v-card-subtitle>
                  <v-card-text>
                    <v-simple-table dense>
                        <thead>
                            <tr>
                                <th class="text-left"><b>Source ID</b></th>
                                <th class="text-left"><b>Source Serial</b></th>
                                <th class="text-left"><b>Calibration Date</b></th>
                                <th class="text-left"><b>Calibration Activity (Ci)</b></th>
                                <th class="text-left"><b>Active?</b></th>
                                <th class="text-left"><b>Delete</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='source in sources' :key='source._id'>
                                <td>{{ source._id }}</td>
                                <td>{{ source.serial }}</td>
                                <td>{{ source.calibration | format_datestring() }}</td>
                                <td>{{ source.curie }}</td>
                                <td>
                                    <v-icon
                                        :color="get_icon_color(source.active)"
                                        @click="set_source_as_active(source._id)">
                                        {{ get_active_icon(source.active) }}
                                    </v-icon>
                                </td>
                                <td>
                                    <v-icon 
                                        color="red darken-4"
                                        @click="delete_confirmation=true; delete_id=source._id">
                                        mdi-delete-forever
                                    </v-icon>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn 
                        @click.stop="dialog = true"
                        color="#2774AE" 
                        text>
                        Add New Source
                    </v-btn>
                    <v-btn 
                        @click.stop="refresh()"
                        color="#2774AE" 
                        text>
                        Refresh List
                    </v-btn>
                  </v-card-actions>
                  <v-overlay
                    :value="overlay"
                    absolute>
                    <v-btn
                        color="error"
                        @click="overlay = false">{{this.error}}
                    </v-btn>
                  </v-overlay>
              </v-card>
          </v-col>
      </v-row>
      <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
            >           
            <v-card>
                <v-card-title>
                    <span class="text-h5">Brachytherapy Source Entry</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="4">
                                <v-select
                                    label="Isotope"
                                    :items="['Ir-192']"
                                    v-model="isotope"
                                ></v-select>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    label="Half-Life"
                                    disabled
                                    v-model="half_life"
                                    suffix="days"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Source Serial Number *"
                                    v-model="serial"
                                    :rules="[rules.required, rules.check]"
                                    hint="Example format: 27-01-0001-001-010121-15000-21"
                                    @change="attempted = false"
                                ></v-text-field>
                            </v-col>
                            <!-- v-col cols="5">
                                <v-checkbox
                                    v-model="set_active"
                                    label="Set as Active?"
                                ></v-checkbox>
                            </v-col -->
                            <v-col cols="6">
                                <v-menu
                                    ref="calmenu"
                                    v-model="calmenu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="calibration"
                                        label="Source Calibration Date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="calibration"
                                        no-title
                                        scrollable
                                        @input="calmenu = false"
                                        >
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="6">
                                <v-menu
                                    ref="tenmenu"
                                    v-model="tenmenu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="tencurie"
                                            label="Source 10-Ci Date"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="tencurie"
                                        no-title
                                        scrollable
                                        @input="tenmenu = false"
                                        >
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Activity"
                                    v-model="curie"
                                    required
                                    suffix="Ci"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Activity"
                                    v-model="gbq"
                                    suffix="GBq"
                                ></v-text-field>
                            </v-col>                            
                            <v-col cols="4">
                                <v-text-field
                                    label="Air Kerma Strength"
                                    v-model="aks_m"
                                ></v-text-field>
                            </v-col>        
                            <v-col cols="2">
                                <span>mGy.m<sup>2</sup>/h</span>
                            </v-col>                   
                            <v-col cols="4">
                                <v-text-field
                                    label="Air Kerma Strength"
                                    v-model="aks_cm"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <span>cGy.cm<sup>2</sup>/h</span>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <span v-if="!checksum" style="color:red">Checksum failed. Please try again.</span>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>* Required Fields</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="#2774AE" 
                        text
                        @click="parse_serial(); attempted = true"
                        >
                        Parse Serial
                    </v-btn>
                    <v-btn
                        color="#2774AE" 
                        text
                        @click="dialog = false"
                        >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="#2774AE" 
                        text
                        :disabled="!parsed"
                        @click="dialog=false; set_new_source(); post_new_source()"
                        >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      </v-row>
      <v-row justify="center">
          <v-dialog
            v-model="delete_confirmation"
            persistent
            max-width="400px"
            >
            <v-card>
                <v-card-title class="text-h5">
                    Permanently Delete Source?
                </v-card-title>
                <v-card-text>Proceeding will remove this source from the database permanently. You may want to consider setting the source as inactive instead.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="#2774AE" 
                        text
                        @click="delete_confirmation=false"
                        >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="#2774AE" 
                        text
                        @click="delete_forever=true; delete_source(delete_id); delete_confirmation=false"
                        >
                        Delete Forever
                    </v-btn>
                </v-card-actions>
            </v-card>
          </v-dialog>
      </v-row>
    <v-footer app
        color="#2774AE"
        padless
        class="no-print">
        <v-col
            class="text-center white--text"
            cols="12"
            >
            <h3>Comments, Questions, or Requests?</h3>
            <br>Address to <strong>Jack Neylon, PhD, DABR  |  jneylon@mednet.ucla.edu</strong>
        </v-col>
    </v-footer>
</v-container>
</template>

<script>
  export default {
    name: 'Settings',
    props: {
    },
    data() {
        return {
            error: "error",
            messages: [],
            sources: [],
            dialog: false,
            new_source: {
                    "isotope": "",
                    "half_life": "",
                    "serial": "",
                    "calibration": "",
                    "ten_ci_date": "",
                    "curie": "",
                    "gbq": "",
                    "air_kerma_m": "",
                    "air_kerma_cm": "",
                    "_id": "",
                    "active": false
            },
            isotope: "Ir-192",
            half_life: 73.83,
            serial: "",
            calibration: new Date().toISOString().substr(0,10),
            calmenu: false,
            tencurie: new Date().toISOString().substr(0,10),
            tenci_hours: "",
            tenmenu: false,
            curie: 0.0,
            rules: {
                required: value => !!value || 'Required',
                check: value => this.checksum(value) || 'Checksum failed! (ex: 27-01-0001-001-010121-15000-22)',
            },
            set_active: false,
            overlay: false,
            delete_confirmation: false,
            delete_forever: false,
            delete_id: "",
            authorize: false,
            authuser: "",
            authpwd: ""
        }
    },
    mounted() {
        this.refresh()
    },
    computed: {
        gbq () {
            return (this.curie * 37).toFixed(2);
        },
        aks_m () {
            return (this.curie * 4.07).toFixed(2);
        },
        aks_cm () {
            return (this.curie * 4070).toFixed(2);
        },
        parsed () {
            if (this.checksum(this.serial)) {
                if (this.curie > 0.0) {
                    return true;
                }
                else {
                    return false;
                }
            } else {
                return false;
            }
        }
    },
    methods: {
        checkAuthorization() {
            if (this.authuser == 'admin'){
                if (this.authpwd == 'admin') {
                    this.authorize = true;
                }
            }
        },
        checksum (serial) {
            var numerals = serial.split("-").join("");
            var check = 0;
            for (let i = 0; i < 11; i++)
                check += parseInt(numerals.slice(2*i,2*i+2));
            var csum = (check % 100);
            var vsum = parseInt(numerals.slice(22,24));
            return (csum == vsum);
        },
        set_new_source () {
            this.new_source.isotope = this.isotope;
            this.new_source.half_life = this.half_life;
            this.new_source.serial = this.serial;
            var _date = new Date(this.calibration);
            _date.setHours(_date.getHours() + 17);
            this.new_source.calibration = _date;
            this.new_source._id = _date.getFullYear().toString();
            this.new_source._id += (1 + _date.getMonth()).toString().padStart(2, "0");
            this.new_source._id += _date.getDate().toString().padStart(2, "0");
            _date = new Date(this.tencurie);
            _date.setHours(_date.getHours() + 7 + this.tenci_hours);
            this.new_source.ten_ci_date = _date;
            this.new_source.curie = this.curie;
            this.new_source.gbq = this.gbq;
            this.new_source.air_kerma_m = this.aks_m;
            this.new_source.air_kerma_cm = this.aks_cm;
            this.new_source.active = this.set_active;
        },
        post_new_source () {
            console.log(this.new_source);

            fetch("/api/bravos_sources/new", {
                method: "POST",
                body: JSON.stringify(this.new_source),
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    this.error = result.error;
                    this.overlay = true;
                } else {
                    this.error = "";
                }
                this.refresh();
            });
        },
        delete_source (id) {
            if (this.delete_forever) {
                console.log(id);
                var _message = {
                    "_id": id
                }

                fetch("/api/bravos_sources/delete", {
                    method: "DELETE",
                    body: JSON.stringify(_message),
                    headers: {
                        "content-type": "application/json"
                    }
                })
                .then(response => response.json())
                .then(result => {
                    if (result.error) {
                        this.error = result.error;
                        this.overlay = true;
                    } else {
                        this.error = "";
                    }
                });
                this.delete_forever = false;
                this.refresh();
            }
        },
        set_source_as_active (id) {
            console.log('Setting Active: ' + id);
            var _message = {
                "_id": id
            }

            fetch("/api/bravos_sources/activate", {
                method: "PUT",
                body: JSON.stringify(_message),
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    this.error = result.error;
                    this.overlay = true;
                } else {
                    this.error = "";
                }

                this.refresh();
            });
        },
        parse_serial () {
            var parts = this.serial.split("-");

            this.curie = parseFloat(parts[5]) / 1000;

            var caldate = parts[4];
            var _month = parseInt(caldate.slice(0,2)) - 1;
            var _day = parseInt(caldate.slice(2,4));
            var _year = parseInt(caldate.slice(4,6)) + 2000;
            var _date = new Date(_year, _month, _day);
            _date.setHours(_date.getHours() + 10);

            this.calibration = _date.toISOString().substr(0,10);

            var _decay = -1 * Math.log(10 / this.curie) * this.half_life / Math.LN2;
            var _tendays = parseInt(_decay);
            var _tenhours = parseInt(24 * (_decay - _tendays));
            _date.setDate(_date.getDate() + _tendays);
            _date.setHours(_date.getHours() + _tenhours);

            this.tencurie = _date.toISOString().substr(0,10);
            this.tenci_hours = _date.getHours();
        },
        refresh () {
            fetch("/api/bravos_sources")
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    this.messages = result;
                    this.sources = result.sources;
                })
        },
        get_active_icon(toggle) {
            if (toggle) {
                return 'mdi-radioactive'
            } else {
                return 'mdi-radioactive-off'
            }
        },
        get_icon_color(toggle) {
            if (toggle) {
                return 'amber'
            } else {
                return 'grey'
            }
        }
    },
    filters: {
        format_datestring: function (value) {
            var _date = new Date(value);
            return _date.toLocaleString('en-US', {
                        day: 'numeric', // numeric, 2-digit
                        year: 'numeric', // numeric, 2-digit
                        month: 'short', // numeric, 2-digit, long, short, narrow
                        hour: 'numeric', // numeric, 2-digit
                        minute: 'numeric', // numeric, 2-digit
                    });
        }
    }
  }
</script>
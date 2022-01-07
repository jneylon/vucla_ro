<template>
    <div id="pqexplorer">
        <v-navigation-drawer 
            app 
            clipped
            permanent
            :mini-variant="mini"
            mini-variant-width="80"
            stateless
            dark 
            width="320" 
            class="no-print">
            <v-list-item>
                <v-list-item-content>
                    <v-icon @click="mini=!mini">mdi-unfold-more-vertical</v-icon>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list>
                <!-- v-list-item @click="loading=true,importJSON()">
                    <v-list-item-icon><v-icon>mdi-file-import</v-icon></v-list-item-icon>
                    <v-list-item-title>Import Multiple PQ Files</v-list-item-title>
                </v-list-item -->
                <v-list-item 
                    @click="print2pdf()">
                    <v-list-item-icon><v-icon>mdi-printer</v-icon></v-list-item-icon>
                    <v-list-item-title>Print to PDF</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h2 style="text-align:center;">UCLA Radiation Oncology</h2>
                    <h2 style="text-align:center;">Plan Quality Database Explorer</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>Population Statistics</v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="6">
                                        <v-combobox
                                            label="Constraint Folder"
                                            hint="Select a treatment area"
                                            v-model="sel_folder"
                                            :items="cc_folders"
                                            @change="retrieve_templates();sel_template=''">
                                        </v-combobox>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-combobox
                                            label="Constraint Template"
                                            hint="Select a template to view constraints"
                                            v-model="sel_template"
                                            :items="cc_templates"
                                            item-text="template"
                                            @change="laterality = sel_template.laterality;retrieve_dose_levels();retrieve_patients();retrieve_stats()"
                                            return-object>
                                        </v-combobox>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-combobox
                                            label="Laterality"
                                            v-model="laterality"
                                            :items="lat_opts"
                                            @change="retrieve_patients();retrieve_stats()">
                                        </v-combobox>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-combobox
                                            label="Dose Per Fraction (cGy)"
                                            v-model="fractional_dose"
                                            :items="dose_opts"
                                            @change="retrieve_patients();retrieve_stats()">
                                        </v-combobox>
                                    </v-col>
                                    <v-col cols="12">
                                        <h2 v-if="sel_template">Constraints</h2>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-simple-table dense v-if="sel_template">
                                            <template v-slot:default>
                                                <tbody>
                                                    <tr>
                                                        <th>Structure</th>
                                                        <th>Constraint</th>
                                                        <th>Goal</th>
                                                        <th v-if=stats>UCLA Population<br>(Mean {{plusminus}} St. Dev.)</th>
                                                        <th v-if=stats>UCLA Population Distribution</th>
                                                    </tr>
                                                    <tr v-for="item in sel_template.constraints" :key='item.Priority'>
                                                        <td>{{item.StructureTemplate}}</td>
                                                        <td>{{item.ConstraintToPresent}}</td>
                                                        <td>{{item.GoalLimitToPresent}}</td>
                                                        <td v-if=stats>{{stats[item.Priority].mean.toFixed(2)}} {{plusminus}} {{stats[item.Priority].std.toFixed(2)}}</td>
                                                        <td v-if=stats>
                                                            <pqrBoxplot :key="stats[item.Priority].mean"
                                                                :p_item="item"
                                                                :p_stats="stats[item.Priority]"
                                                                :p_flip="reporter">
                                                            </pqrBoxplot>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-col>
                                    <v-col cols="12">
                                        <h2 v-if="pt_counter > 0">Patients ({{pt_counter}})</h2>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-simple-table dense v-if="pt_counter > 0">
                                            <template v-slot:default>
                                                <tbody>
                                                    <tr>
                                                        <th>MRN</th>
                                                        <th>Course</th>
                                                        <th>Plan</th>
                                                        <th>Laterality</th>
                                                    </tr>
                                                    <tr v-for="item in cc_patients" :key='item.mrn'>
                                                        <td>{{ item.mrn }}</td>
                                                        <td>{{ item.course_id }}</td>
                                                        <td>{{ item.plan_id }}</td>
                                                        <td>{{ item.laterality}}</td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn 
                                @click.stop="refresh_templates()"
                                color="#2774AE" 
                                text>
                                Refresh List
                            </v-btn>
                            <v-btn
                                @click.stop="clear_templates()"
                                color="#2774AE"
                                text>
                                Clear
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
//import Plotly from 'plotly.js-dist';
import pqrBoxplot from '../components/pqrBoxplot';

export default {
    name: 'PQExplorer',
    data() {
        return {
            mini: true,
            cc_folders: [],
            sel_folder: null,
            cc_templates: [],
            sel_template: null,
            pt_counter: 0,
            cc_patients: [],
            laterality: null,
            lat_opts: ['Left', 'Right', 'Both', 'None'],
            fractional_dose: 'All',
            dose_opts: ['All'],
            stats: null,
            plusminus: '\xB1',
            reporter: false,
        }
    },
    mounted() {
        this.retrieve_folders();
    },
    methods: {
        retrieve_folders () {
            fetch("/api/pqr_templates/folders")
                .then(response => response.json())
                .then(result => {
                    //console.log(result);
                    this.messages = result;
                    this.cc_folders = result.folders;
                })
        },
        retrieve_templates () {
            var _request = "/api/pqr_templates/templates/";
            _request += this.sel_folder;
            
            fetch(_request)
                .then(response => response.json())
                .then(result => {
                    //console.log(result);
                    this.messages = result;
                    this.cc_templates = result.templates;
                })
        },
        retrieve_dose_levels () {
            this.dose_opts = ['All'];

            var _request = "/api/pqr_patients/dose_levels/";
            _request += this.sel_folder;
            _request += "/";
            _request += this.sel_template.template;
            _request += "/";
            _request += this.laterality;

            fetch(_request)
                .then(response => response.json())
                .then(result => {
                    //console.log(result);
                    this.dose_opts = result.dose_levels;
                    this.dose_opts.push('All');
                })
        },
        retrieve_patients () {
            var _request = "/api/pqr_patients/template/";
            _request += this.sel_folder;
            _request += "/";
            _request += this.sel_template.template;
            _request += "/";
            _request += this.laterality;
            _request += "/";
            _request += this.fractional_dose;

            fetch(_request)
                .then(response => response.json())
                .then(result => {
                    //console.log(result);
                    this.messages = result;
                    this.cc_patients = result.patients;
                    this.pt_counter = result.pt_count;
                })
        },
        retrieve_stats () {
            this.stats = null;

            var _request = "/api/pqr_patients/stats/";
            _request += this.sel_folder;
            _request += "/";
            _request += this.sel_template.template;
            _request += "/";
            _request += this.laterality;
            _request += "/";
            _request += this.fractional_dose;

            fetch(_request)
                .then(response => response.json())
                .then(result => {
                    var temp = result.stats;
                    if (temp.length > 0) {
                        this.stats = {};
                    }
                    for (var i=0; i<temp.length; i++) {
                        let mean = temp[i].data.reduce((a, b) => a + b) / temp[i].data.length;
                        let sum_sq = 0.0;
                        for (let j = 0; j < temp[i].data.length; j++)
                        {
                            sum_sq += Math.pow((temp[i].data[j] - mean), 2);
                        }
                        let std = Math.sqrt((sum_sq/temp[i].data.length));

                        this.stats[temp[i]._id] = {
                            ["data"]: temp[i].data,
                            ["mean"]: mean,
                            ["std"]: std
                        }
                    }
                    //console.log(this.stats);
                })
        },
        refresh_templates () {
            this.retrieve_folders();
            this.retrieve_templates();
        },
        clear_templates() {
            this.sel_template = '';
            this.sel_folder = '';
            this.stats = null;
            this.laterality = null;
            this.fractional_dose = null;
            this.pt_counter = 0;
        },
        print2pdf() {
            window.print();
        },
    },
    components: {
        pqrBoxplot,
    }
}
</script>

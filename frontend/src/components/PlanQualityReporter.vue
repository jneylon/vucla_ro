<template>
    <div id="pqreporter">
        <v-navigation-drawer 
            app  
            clipped
            permanent 
            stateless
            :mini-variant="mini"
            mini-variant-width="80"
            dark 
            width="360" 
            class="no-print">
            <v-list-item>
                <v-list-item-content>
                    <v-icon @click="mini=!mini">mdi-unfold-more-vertical</v-icon>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list>
                <v-list-item @click="loading=true,importJSON()">
                    <v-list-item-icon><v-icon>mdi-file-import</v-icon></v-list-item-icon>
                    <v-list-item-title>Import Patient JSON File</v-list-item-title>
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
                <v-list-group @click="mini=false">
                    <template v-slot:activator>
                        <v-list-item-icon><v-icon>mdi-timetable</v-icon></v-list-item-icon>
                        <v-list-item-title>Service Date:</v-list-item-title>
                    </template>
                    <v-list-item>
                        <v-card outlined>
                            <v-card-text>
                                <v-date-picker 
                                    show-adjacent-months
                                    v-model="service_date"
                                    width="275"
                                ></v-date-picker>
                            </v-card-text>
                        </v-card>
                    </v-list-item>
                </v-list-group>
            </v-list>
            <v-divider></v-divider>
            <v-list v-show="imported">
                <v-list-group @click="mini=false">
                    <template v-slot:activator>
                        <v-list-item-icon><v-icon>mdi-content-duplicate</v-icon></v-list-item-icon>
                        <v-list-item-title>Constraint Template Matching:</v-list-item-title>
                    </template>
                    <v-list-item>
                        <v-select
                            v-model="cc_matchedFolder"
                            :disabled="!imported"
                            :items="cc_folders"
                            @change="retrieve_templates()"
                            label="Constraint Folder">
                        </v-select>
                    </v-list-item>
                    <v-list-item>
                        <v-select
                            v-model="cc_matchedTemplate"
                            :disabled="!imported"
                            :items="cc_templates"
                            item-text="template"
                            @change="find_indices();retrieve_pqdata()"
                            label="Constraint Template"
                            return-object>
                        </v-select>
                    </v-list-item>
                    <v-list-item>
                            <v-switch 
                                v-model="p_switch3" 
                                :disabled="!analyzed"
                                color="#2774AE"
                                label="Constraint Matching">
                            </v-switch>
                    </v-list-item>
                </v-list-group>
                <v-divider></v-divider>
                <v-list-item>
                    <v-list-item-icon>
                        <v-switch 
                            v-model="p_switch1" 
                            :disabled="!analyzed"
                            color="#2774AE">
                        </v-switch>
                    </v-list-item-icon>
                    <v-list-item-title>UCLA Patient Statistics</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon>
                        <v-switch 
                            v-model="p_switch2" 
                            :disabled="!analyzed"
                            color="#2774AE">
                        </v-switch>
                    </v-list-item-icon>
                    <v-list-item-title>Boxplot Performance Comparison</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
                <v-list-item
                    :disabled="!analyzed"
                    @click="post_pqr_patient()">
                    <v-list-item-icon><v-icon>mdi-database-plus</v-icon></v-list-item-icon>
                    <v-list-item-title>Upload Current Patient to DB</v-list-item-title>
                </v-list-item>
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
                    <h2 style="text-align:center;">Plan Quality Reporting</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>Special Medical Radiation Physics Consultation (CPT 77370)</v-card-title>
                        <v-card-text>
                            <v-simple-table dense>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td>Patient:</td>
                                            <td>{{ patient }}</td>
                                        </tr>
                                        <tr>
                                            <td>MRN:</td>
                                            <td>{{ mrn }}</td>
                                        </tr>
                                        <tr>
                                            <td>Date of Service:</td>
                                            <td>{{ service_date }}</td>
                                        </tr>
                                        <tr>
                                            <td>Course - Plan:</td>
                                            <td>{{ plan_info }}</td>
                                        </tr>
                                        <tr>
                                            <td>Prescription:</td>
                                            <td><p v-for="(line, lindex) in prescription" :key="lindex">{{ line }}</p></td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-text>
                            <v-textarea
                                outlined
                                auto-grow
                                name="input-7-4"
                                rows="7"
                                label="Notes:"
                                hint="Enter any additional notes or comments here."
                                :value="notes"
                            ></v-textarea>
                        </v-card-text>
                    </v-card>  
                </v-col> 
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>Plan Quality Report - {{ templateName }}</v-card-title>
                        <v-card-subtitle>The attending physician has made a Special Physics Consultation request 
                            for this course of treatment. The request involves comparing the plan quality to published 
                            data and UCLA protocols. More importantly, the plan has been analyzed and compared to prior 
                            plans in the database. A patient specific Plan Quality Report has been generated to evaluate 
                            specific features of the treatment plan. Dose volume histograms for the following structures 
                            have been analyzed for this patient.<br>
                            The results have been reported to the attending physician and a detailed plan quality report
                            has been generated for this patient.
                        </v-card-subtitle>
                        <v-card-text>
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <th class="text-center">Structure</th>
                                            <th class="text-center">Plan Constraint</th>
                                            <th v-show="p_switch3" class="text-center no-print">Template Constraint</th>
                                            <th class="text-center">Achieved</th>
                                            <th class="text-center" v-show="p_switch1">UCLA Population<br>(Mean {{plusminus}} St. Dev.)</th>
                                            <th class="text-center" v-show="p_switch2">Plan Performance</th>
                                        </tr>
                                        <tr v-for="item in constraints" :key="item.Priority">
                                            <td class="text-center text-caption">{{ item.StructurePlan }}</td>
                                            <td class="text-center text-caption">{{ item.ConstraintToPresent }} {{ item.GoalLimitToPresent }}</td>
                                            <td width="120px" v-show="p_switch3" class="text-center no-print">
                                                <v-select
                                                    v-model="indices[item.Priority]"
                                                    @change="toggleKey(item.Priority)"
                                                    class="text-caption"
                                                    :items="cc_matchedTemplate.constraints"
                                                    item-text="ConstraintToPresent"
                                                    item-value="Priority"
                                                    width=100
                                                    >
                                                </v-select>
                                                <!-- :disabled="indices[item.Priority] != -1" -->
                                            </td>
                                            <td class="text-center text-caption font-weight-bold" v-if="plansum" :class=fonts[item.PassFail]>{{ item.Plan1Actual }}</td>
                                            <td class="text-center text-caption font-weight-bold" v-else :class=fonts[item.PassFail]>{{ item.Actual }}</td>
                                            <!-- td class="text-center text-caption" 
                                                :key="keys[item.Priority]"
                                                v-html="findStatistics(item,stats,indices[item.Priority],heartidx)" 
                                                v-show="p_switch1">
                                            </td >
                                            <td v-show="p_switch2">
                                                <stat-range v-if="indices[item.Priority] != -1"
                                                    :key="keys[item.Priority]"
                                                    :p_psum="plansum"
                                                    :p_item="item"
                                                    :p_stats="stats"
                                                    :p_heart="heartidx"
                                                    :p_indices="indices[item.Priority]">
                                                </stat-range>
                                            </td -->
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                            <small v-show="p_switch1 || p_switch2">*Statistics calculated from a population of {{pt_counter}} patients.</small>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-dialog
                    v-model="pq_confirmation"
                    persistent
                    max-width="600px"
                    > 
                    <v-card>
                        <v-card-title>Plan Quality Template Matching:</v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="cc_chosenFolder"
                                            label="Patient Constraint Folder"
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-combobox
                                            label="Matched Constraint Folder"
                                            hint="Confirm the correct constraint folder"
                                            v-model="cc_matchedFolder"
                                            :items="cc_folders"
                                            @change="retrieve_templates()">
                                        </v-combobox>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="cc_chosenTemplate"
                                            label="Patient Constraint Template"
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-combobox
                                            label="Matched Constraint Template"
                                            hint="Confirm the correct constraint template"
                                            v-model="cc_matchedTemplate"
                                            :items="cc_templates"
                                            item-text="template"
                                            return-object>
                                        </v-combobox>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                color="#2774AE" 
                                text
                                @click="pq_confirmation=false"
                                >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="#2774AE" 
                                text
                                @click="pq_confirmation=false;find_indices();retrieve_pqdata()"
                                >
                                Confirm
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
            <v-overlay
                :value="error_overlay"
                absolute>
                <v-btn
                    color="error"
                    @click="error_overlay = false">{{this.error}}
                </v-btn>
            </v-overlay>
        </v-container>
  </div>
</template>

<script>
export default {
    name: 'PlanQualityReporter',
    data() {
        return {
            mini: true,
            message: '',
            satisfactionEmojis: ['😭', '😢', '☹️', '🙁', '😐', '🙂', '😊', '😁', '😄', '😍'],
            loading: false,
            imported: false,
            analyzed: false,
            matched: false,
            plansum: false,
            chosenFile: null,
            contents: 'Select a JSON file',
            notes: '',
            plusminus: '\xB1',
            jsondata: null,
            templateName: null,
            patient: null,
            mrn: null,
            prescription: null,
            plan_info: null,
            constraints: null,
            stats: null,
            matchlist: [],
            indices: {},
            keys: {},
            service_date: new Date().toISOString().substr(0,10),
            breasts3field: false,
            heartidx: 0,
            fonts: {
                "Pass": "green--text",
                "Fail": "red--text",
                "Condition": "orange--text",
                "Verified": "blue--text"
            },
            p_switch1: true,
            p_switch2: true,
            p_switch3: false,
            cc_folders: [],
            cc_chosenFolder: '',
            cc_matchedFolder: '',
            cc_templates: [],
            cc_chosenTemplate: '',
            cc_matchedTemplate: '',
            pq_confirmation: false,
            pt_counter: 0,
            error: "error",
            error_overlay: false,
        }
    },
    mounted() {
        this.retrieve_folders();
    },
    methods: {
        importJSON() {
            if (!this.chosenFile) {
                return;
            }
            //console.log(this.chosenFile.name);

            var reader = new FileReader();
            reader.readAsText(this.chosenFile);
            reader.onload = () => {
                this.jsondata = JSON.parse(reader.result);
                this.templateName = this.jsondata.TemplateName;
                var templateName = this.jsondata.TemplateName.split('(');
                this.cc_chosenFolder = templateName[1].slice(0, -1);
                this.cc_chosenTemplate = templateName[0].slice(0, -1);
                //console.log(this.jsondata);

                this.patient = this.jsondata.PatientLastName + ", " + this.jsondata.PatientFirstName;
                this.mrn = this.jsondata.PatientId;
                this.prescription = this.jsondata.DoseInfos;
                this.notes = this.jsondata.ReportNotes;
                this.plan_info = this.jsondata.Course + " - " + this.jsondata.PlanId;
                if (!this.jsondata.CalculatedConstraints) {
                    this.plansum = false;
                    var plandata = this.jsondata.PlanData;
                    this.constraints = plandata[0].CalculatedConstraints;
                } else {
                    this.plansum = true;
                    this.constraints = this.jsondata.CalculatedConstraints;
                }
                //console.log(this.constraints);

                this.match_folders();

                this.imported = true;
                this.loading = false;
                this.analyzed = false;
                document.title = this.jsondata.PatientId + "-" + this.jsondata.PatientLastName + "-" + this.jsondata.TemplateName;
                this.pq_confirmation = true;
            }
        },
        print2pdf() {
            window.print();
        },
        retrieve_folders () {
            fetch("/api/pqr_templates/folders")
                .then(response => response.json())
                .then(result => {
                    //console.log(result);
                    this.messages = result;
                    this.cc_folders = result.folders;
                })
        },
        match_folders () {
            if (this.cc_folders.includes(this.cc_chosenFolder)) {
                this.cc_matchedFolder = this.cc_chosenFolder;
                this.retrieve_templates();
            } else {
                this.cc_matchedFolder = '';
            }
        },
        match_templates () {
            var _request = "/api/pqr_templates/match/";
            _request += this.cc_matchedFolder;
            _request += "/";
            _request += this.cc_chosenTemplate;
            
            fetch(_request)
                .then(response => response.json())
                .then(result => {
                    //console.log(result);
                    this.messages = result;
                    if (result.template.length > 0) {
                        this.cc_matchedTemplate = result.template[0];
                    }
                    //console.log(this.cc_matchedTemplate);
                })
        },
        retrieve_templates () {
            var _request = "/api/pqr_templates/templates/";
            _request += this.cc_matchedFolder;
            //console.log(_request);
            
            fetch(_request)
                .then(response => response.json())
                .then(result => {
                    //console.log(result);
                    this.messages = result;
                    this.cc_templates = result.templates;
                    //console.log(this.cc_templates);
                    this.match_templates();
                })
        },
        retrieve_pqdata () {
            // stuff
            this.analyzed = true;
        },
        find_index(item, stats, key) {
            if (!this.cc_matchedTemplate) return 'N/A';

            let findentry = stats.filter(function(entry) {
                                return entry.StructureTemplate === item.StructureTemplate 
                                    && item.ConstraintToPresent.includes(entry.ConstraintToPresent)
                                    && entry.GoalLimitToPresent === item.GoalLimitToPresent; });
              if (findentry.length > 0)
              { 
                let i = findentry[0].Priority;
                this.$set(this.indices, item.Priority, i);
              }
              else
              {
                  this.$set(this.indices, item.Priority, -1);
                  this.p_switch3 = true;
              }
              this.$set(this.keys, key, key);
        },
        find_indices() {
            //console.log(this.cc_matchedTemplate);
            for (var i=0; i<this.constraints.length; i++) {
                this.find_index(this.constraints[i], this.cc_matchedTemplate.constraints, i);
            }
        }, 
        toggleKey(i) {
              //console.log("Toggle Key Event Triggered.");
              let newkey = this.keys[i] * -1;
              this.$set(this.keys,i,newkey);
        },
        check_db_for_patient() {
            var _request = "/api/pqr_patients/match/";
            _request += this.mrn;
            _request += "/";
            _request += this.jsondata.Course;
            _request += "/";
            _request += this.jsondata.PlanId;
            //console.log(_request);

            fetch(_request)
                .then(response => response.json())
                .then(result => {
                    //console.log(result);
                    if (result.patient) {
                        return true;
                    } else {
                        return false;
                    }
                })
        },
        parse_prescriptions() {
            if (this.plansum) {
                // implement
                return {};
            } else {
                var plan = '';
                var fx = 0;
                var fx_dose = 0;
                var rx_dose = 0;
                plan = this.prescription[0];
                var params = this.prescription[1].split(" ");
                var p1 = params[0].split("c");
                fx_dose = p1[0].replace(/\s+/g, '');
                fx = params[2].replace(/\s+/g, '');
                var p2 = params[4].split("c");
                rx_dose = p2[0].replace(/\s+/g, '');
                var new_script = {
                    "plan_id": plan,
                    "fx_dose": fx_dose,
                    "fractions": fx,
                    "total_dose": rx_dose,
                    "dose_units": this.jsondata.EclipseDoseUnit
                }
                //console.log(new_script);
                return new_script;
            }
        },
        post_pqr_patient() {
            if (!this.check_db_for_patient()) {
                var new_patient = {
                    "mrn": this.mrn,
                    "last_name": this.jsondata.PatientLastName,
                    "first_name": this.jsondata.PatientFirstName,
                    "dob": this.jsondata.PatientDateOfBirth,
                    "sex": this.jsondata.PatientSex,
                    "creation": this.jsondata.CurrentDate,
                    "plan_id": this.jsondata.PlanId,
                    "course_id": this.jsondata.Course,
                    "dose_info": this.jsondata.DoseInfos,
                    "rx": this.parse_prescriptions(),
                    "plansum": this.jsondata.IsPlanSum,
                    "folder": this.cc_chosenFolder,
                    "template": this.cc_chosenTemplate,
                    "match_folder": this.cc_matchedFolder,
                    "match_template": this.cc_matchedTemplate.template,
                    "match_indices": this.indices,
                    "constraints": this.constraints
                }
                //console.log(new_patient);

                fetch("/api/pqr_patients/new", {
                    method: "POST",
                    body: JSON.stringify(new_patient),
                    headers: {
                        "content-type": "application/json"
                    }
                })
                .then(response => response.json())
                .then(result => {
                    if (result.error) {
                        this.error = result.error;
                        this.error_overlay = true;
                    } else {
                        this.error = "";
                    }
                });
             } else {
                 console.log("This Patient/Course/Plan is already in the database.");
                 // implement patient update dialog
             }
        },
      },
      computed: {
      },
      filters: {
          onlysigfigs: function (value, figs) {
              if (!value) return '0'
              value = value.toFixed(figs);
              return value;
          },
          emote: function (status, emojis) {
            if (status == 'Pass') return emojis[8];
            else if (status == 'Condition') return emojis[4];
            else return emojis[1];
          },
          checkTolerance: function(value, tolerance) {
                if (!value) return 'n/a'
                if (value > tolerance) return 'Fail'
                if (value < tolerance) return 'Pass'
          },
      },
      beforeRouteLeave( to, from, next ) {
        document.title = "vuclaro";
        next()
      }
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

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
                                            return-object>
                                        </v-combobox>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-simple-table dense v-if="sel_template">
                                            <template v-slot:default>
                                                <tbody>
                                                    <tr>
                                                        <th>Structure</th>
                                                        <th>Constraint</th>
                                                        <th>Goal</th>
                                                    </tr>
                                                    <tr v-for="item in sel_template.constraints" :key='item.Priority'>
                                                        <td>{{ item.StructureTemplate }}</td>
                                                        <td>{{ item.ConstraintToPresent }}</td>
                                                        <td>{{ item.GoalLimitToPresent }}</td>
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
        }
    },
    mounted() {
        this.retrieve_folders();
    },
    methods: {
        retrieve_folders () {
            fetch("http://localhost:3000/api/pqr_templates/folders")
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    this.messages = result;
                    this.cc_folders = result.folders;
                })
        },
        retrieve_templates () {
            var _request = "http://localhost:3000/api/pqr_templates/templates/";
            _request += this.sel_folder;
            
            fetch(_request)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    this.messages = result;
                    this.cc_templates = result.templates;
                })
        },
        refresh_templates () {
            this.retrieve_folders();
            this.retrieve_templates();
        },
        clear_templates() {
            this.sel_template = '';
            this.sel_folder = '';
        },
        print2pdf() {
            window.print();
        }
    }
}
</script>

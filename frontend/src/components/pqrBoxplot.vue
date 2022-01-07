<template>
    <v-card outlined v-if="checker">
        <div align="center" :id="plot_id"/>
    </v-card>
</template>

<script>
import Plotly from 'plotly.js-dist'

export default {
    name: 'pqrBoxplot',
    props: ['p_item','p_stats', 'p_flip'],
    data: function() {
        return ({
            item: this.p_item,
            stats: this.p_stats,
            flipper: this.p_flip
        })
    },
    computed: {
        plot_id () {
            let temp = 'boxplot_' + this.item.Priority;
            return temp;
        },
        idx () {
            return this.item.PriorityMatch;
        },
        checker () {
            if (!this.stats) {
                return false;
            }
            else if (this.stats.data.length > 0) {
                return true;
            } else { 
                return false;
            }
        },
        marker_color () {
            let fonts = {
                    "Pass": "green",
                    "Fail": "red",
                    "Condition": "orange",
                    "Verified": "blue",
                    "": "black" };
            return fonts[this.item.PassFail];
        },
        value() {
            let val = 0.0;
            if (this.flipper) { val = this.item.ActualValue; }
            return val;
        },
        x_data () {
            if (this.idx < 0) { return [0]; }
            else {
                return this.stats.data;
            }
        },
        y_data () {
            if (this.idx < 0) { return [0]; }
            else {
                let y = new Array(this.stats.data.length).fill(0);
                return y;
            }
        },
        ideal () {
            let str = this.item.GoalLimitToPresent;
            let str2 = str.split(this.item.GoalLimitActualUnit,1);
            let str3 = str2[0].split("-",2);
            return parseFloat(str3[0]);
        },
        acceptable () {
            let str = this.item.GoalLimitToPresent;
            let str2 = str.split(this.item.GoalLimitActualUnit,1);
            if (str2[0].includes("-"))
            {
                let str3 = str2[0].split("-",2);
                return parseFloat(str3[1]);
            }
            else { return null; }
        },
        accept_x () {
            return [this.acceptable];
        },
        goal_x () {
            return [this.ideal];
        },
        goal_y () {
            return [0];
        },
        boxpoints () {
            if (this.flipper) { return 'suspectedoutliers' }
            else { return 'all' }
        },
        boxcolors () {
            if (this.flipper) { return 'rgba(219, 64, 82, 0.6)' }
            else { return 'rgba(20,120,180)' }
        },
        trace1() {
            let trace = {
                type: 'box',
                name: 'UCLA Patients',
                x: this.x_data,
                y: this.y_data,
                hoverdata: 'x',
                orientation: 'h',
                boxpoints: this.boxpoints, 
                boxmean: 'sd',
                jitter: 0.3,
                whiskerwidth: 0.5,
                marker: {
                    size: 3,
                    color: this.boxcolors,
                    outliercolor: 'rgba(219, 64, 82, 0.6)',
                    line: {
                        outliercolor: 'rgba(219, 64, 82, 1.0)',
                        outlierwidth: 1
                    },
                    opacity: 0.5
                },
                line: {
                    color: 'rgb(20,120,180)',
                    opacity: 0.75,
                    width: 1
                }
            }
            return trace;
        },
        trace2() {
            let trace = {
                x: [this.value],
                y: [0],
                hoverdata: 'x',
                type: 'scatter',
                name: 'Current Patient',
                mode: 'markers',
                marker: {
                    color: this.marker_color,
                    size: 10,
                    opacity: 0.5,
                }
            }
            return trace;
        },
        trace3() {
            let trace = {
                x: this.goal_x,
                y: this.goal_y,
                hoverdata: 'x',
                type: 'box',
                name: 'Goal',
                orientation: 'h',
                boxpoints: false,
                whiskerwidth: 1.0,
                opacity: 0.7,
                line: {
                    color: "darkgreen",
                    width: 1
                }
            }
            return trace;
        },
        trace4() {
            let trace = {
                x: this.accept_x,
                y: this.goal_y,
                hoverdata: 'x',
                type: 'box',
                name: 'Goal',
                orientation: 'h',
                boxpoints: false,
                whiskerwidth: 1.0,
                opacity: 0.5,
                line: {
                    color: "orange",
                    width: 1
                }
            }
            return trace;
        },
        layout() {
            let lay = {
                showlegend: false,
                xaxis: {
                    showgrid: true,
                    gridcolor: 'rgb(220, 220, 220)',
                    zeroline: false,
                    rangemode: "nonnegative",
                    tickfont: {
                        size: 10
                    },
                    hoverformat: '.1f',
                },
                yaxis: {
                    showline: false,
                    visible: false
                },
                width: 225,
                height: 60,
                margin: {
                    l: 16,
                    r: 16,
                    b: 24,
                    t: 2,
                    pad: 0
                },
                hoverlabel: {
                    size: 7,
                }
            }
            return lay;
        },
    },
    mounted() {
        this.updatePlot();
        this.$watch('stats', this.updatePlot);
    },
    methods: {
        updatePlot() {
            if (document.getElementById(this.plot_id)) {
                Plotly.purge(this.plot_id);
            }
            var traces = null;
            if (this.flipper) {
                traces = [this.trace1, this.trace2, this.trace3, this.trace4];
            }
            else {
                traces = [this.trace1, this.trace3, this.trace4];
            }

            if (this.checker) {
                Plotly.newPlot(this.plot_id, traces, this.layout);
            }
        }
    },
    watch: {
        chart: {
            handler: function() {
                Plotly.react(
                    this.$refs[this.chart.uuid],
                    this.chart.traces,
                    this.chart.layout
                );
            },
            deep: true
        }
    }
}
</script>

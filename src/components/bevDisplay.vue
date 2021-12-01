<template>
    <div :ref="chart.uuid"/>
</template>

<script>
import Plotly from 'plotly.js-dist'

export default {
    name: 'bevDisplay',
    props: ['chart'],
    mounted() {
        this.plot();
    },
    methods: {
        plot() {
            Plotly.newPlot(this.$refs[this.chart.uuid], this.chart.traces, this.chart.layout);
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

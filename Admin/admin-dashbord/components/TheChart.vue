<template>
  <section>
    <div class="chart">
      <BarChart :data="barChartData" :options="barChartOptions" :height="170" />
    </div>
  </section>
</template>

<script>
import BarChart from '~/components/BarChart.vue'
export default {
  components: { BarChart },
  data() {
    return {
      barChartData: {
        labels: [
          '2022-01',
          '2022-02',
          '2022-03',
          '2022-04',
          '2022-05',
          '2022-06',
          '2022-07',
          '2022-08',
          '2022-09',
          '2022-10',
        ],
        datasets: [
          {
            // label: 'Visualizaciones',
            label: 'Order',
            data: [100, 200, 115, 50, 90, 150, 200, 100, 64, 96, 29],
            backgroundColor: '#f24e1e',
            borderColor: '#ef1818',
            borderWidth: 2,
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Analytics data',
          fontSize: 24,
          fontColor: '#6b7280',
        },
        tooltips: {
          backgroundColor: '#17BF62',
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 300,
                min: 0,
                stepSize: 30,
              },
              gridLines: {
                display: true,
              },
            },
          ],
        },
      },
    }
  },
}
</script>

<style scoped>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 100px;
  color: #2e495e;
  letter-spacing: 1px;
  font-size: 6em;
}
.green {
  color: #00c48d;
}

.subtitle {
  font-weight: 300;
  font-size: 1em;
  color: #2e495e;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

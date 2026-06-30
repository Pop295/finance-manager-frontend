<template><Line :data="data" :options="options" /></template>
<script setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from 'chart.js'
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler)
defineProps({ data: Object })
const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } }, scales: { y: { grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } } }
</script>

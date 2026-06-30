<template><Bar :data="data" :options="options" /></template>
<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)
defineProps({ data: Object })
const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } }, scales: { y: { grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } } }
</script>

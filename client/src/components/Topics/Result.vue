<template>
    <div >
        <div class="text-center mt-10 ">
            <div class="bg-yellow-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span class="text-xl font-bold">
                A1
                </span>
            </div>
            <p class="text-gray-700 mb-4">
                This is your approximate level for English grammar. You should start studying the
                <a class="text-orange-500" href="#">
                grammar lesson for A1
                </a>
            </p>
        </div>
        <apexchart type="radialBar" height="350" :options="chartOptions" :series="series"></apexchart>
        <div class="text-xl text-center">
            <span>Thời gian làm bài: </span>
            <span class="text-blue-500">{{formattedTime}}</span>
        </div>
    </div>
</template>
<script setup>
   import { axiosdefault } from '../../interceptors/axios-base';
</script>
<script>
export default {
    data() {
        return {
            series: [70],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '70%',
                        }
                    },
                },
                labels: ['Điểm số'],

            },
            time: 0
        }
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor(this.time / 60 )
            const seconds = this.time % 60
            return `${String(minutes).padStart(2, "0")} phút ${String(seconds).padStart(2, "0")} giây`
        }
    },
    beforeCreate() {
        const lessonId = this.$route.params.id
        axiosdefault.post(`/practice/lesson/${lessonId}`)
            .then((res) => {
                
                this.series = [(res.data.metadata.score*100).toFixed()]

                this.time = res.data.metadata.time
            })
    }
}
</script>


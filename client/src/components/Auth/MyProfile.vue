<template>
    <div class="bg-blue-500 text-white p-6 rounded-lg mb-6">
                <h1 class="text-2xl font-semibold">
                    Good Afternoon!
                </h1>
                <p class="mt-2">
                    You've learned 70% of your goal this week! Keep it up and improve your progress.
                </p>
            </div>
            <div class="grid grid-cols-2 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex justify-center items-center mb-4">
                        <div class="relative">
                            <apexchart type="radialBar" height="350" :options="chartOptions" :series="series"></apexchart>
                            <div class="absolute inset-0 flex justify-center items-center text-xl font-semibold">
                            Điểm
                            </div>
                        </div>
                    </div>
                    <hr class="border-gray-400">
                    <div class="flex justity-between mt-4">
                        <p class="text-gray-600">
                            Lesson: 
                        </p>
                        
                        <span class="font-semibold text-blue-600 ml-1">
                            10
                        </span>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                   <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-semibold">My Process</h2>
                        <p class="text-gray-600"> July 2024 </p>
                        <div class="flex items-center">
                            <i class="fas fa-chevron-left text-gray-400 mr-2">
                            </i>
                            <i class="fas fa-chevron-right text-gray-400">
                            </i>
                        </div>
                    </div>
                    <div class="grid grid-cols-7 gap-2 text-center text-gray-600">
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                        <div>Sun</div>
                    </div>
                    <div class="grid grid-cols-7 gap-2 text-center mt-2">
                        <div class="pt-2 " v-for="n in 31" :key="n" :class="n < 10 ? rounded : '' ">{{ n }}</div>
                    </div>
                </div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
            </div>
</template>

<script>

export default {
    data() {
        return {
            rounded: 'text-yellow-500',
            series: [70],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '60%',
                        }
                    },
                },
                labels: [''],
            },
        }
    }
}

</script>


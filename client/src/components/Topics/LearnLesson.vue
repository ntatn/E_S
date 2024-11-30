<template>
    <div class="font-Poppins min-h-screen">
    <HeaderBar/>
    <div class="p-12 ">
        <h1 class="text-2xl font-bold mb-8">English Courses</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="(lesson, index) in lessons" :key="index" class=" border rounded-lg p-4">
                <img src="/dulich.png" class="w-full h-48 object-cover rounded-lg mb-4">
                <h2 class="text-lg font-semibold mb-2" >Bài tập {{ index + 1 }}</h2>
                <div class="text-gray-600 mb-4">
                    <p><i class="fas fa-book"></i> Số lượng câu hỏi: {{lesson.count}} </p>
                    <p><i class="fas fa-signal"></i> Trình độ: Dễ</p>
                </div>
                    <button @click="startQuiz(lesson._id)"  class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Let's Go <i class="fas fa-arrow-right"></i>
                    </button>
            </div>
        </div>
    </div>
    <FooterBar/>
    </div>
   
</template>

<script setup>

import { axiosdefault } from '../../interceptors/axios-base';
import FooterBar from '../FooterBar.vue';
import HeaderBar from '../HeaderBar.vue';

</script>
<script>
export default {
    data() {
        return {
            lessons: []
        }
    },
    mounted() {
        const topicId = this.$route.params.id
        axiosdefault.get(`/topics/lesson?topicId=${topicId}`)
            .then(res => {
                return this.lessons = res.data.metadata
            })
            .catch(err => {
                console.log(err)
            })
    },
    methods: {
        startQuiz(lessonId) {
            this.$router.push({name: 'Quiz', params: {id: lessonId}})
        }
    }
}

</script>


<template>
    <div class="font-Poppins min-h-screen">
    <HeaderBar/>
    <div class="p-12 ">
        <div class="flex justify-start">
            <ArrowLeftIcon @click="goBack" class="size-6 cursor-pointer font-bold mr-2"/>
            <h1 class="text-2xl font-bold mb-8">{{topic.title}}</h1>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(lesson, index) in lessons" :key="index" class=" border rounded-lg p-4">
                <img :srcset="`/lessons/${lesson.thumb}`" class="w-full h-48 object-cover rounded-lg mb-4">
                <h2 class="text-lg font-semibold mb-2" >{{ lesson.title }}</h2>
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

import { axiosdefault, axiosbase } from '../../interceptors/axios-base';
import FooterBar from '../FooterBar.vue';
import HeaderBar from '../HeaderBar.vue';
import {  ArrowLeftIcon, PaperClipIcon } from '@heroicons/vue/24/solid'
</script>
<script>
export default {
    data() {
        return {
            lessons: [],
            topic: []
        }
    },
    mounted() {
        const topicId = this.$route.params.id
        axiosbase.get(`/topics/${topicId}`)
            .then(response => {
                this.topic = response.data.metadata
            })
            .catch(e=> {
                console.log(e)
            })
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
        },
        goBack(){
            this.$router.go(-1)
        }
    }
}

</script>


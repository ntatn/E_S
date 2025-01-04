<template>
    <div class="border rounded-lg p-4 bg-white">
        <img :srcset="`/lessons/${thumb}`" class="w-full h-48 object-cover rounded-lg mb-4">
        <h2 class="text-lg font-semibold mb-2">{{title}}</h2>
        <div class="text-gray-600 mb-4 flex items-start">
            <PaperClipIcon class="size-5 text-black mr-1" /> Chủ đề: {{ topicName }}
        </div>
        <div class="text-gray-600 mb-4 flex justify-between mt-2">
            <div class="flex justify-center">
                <ChatBubbleLeftEllipsisIcon class="size-5 text-black mr-1" /> Số lượng câu hỏi : {{count}}
            </div>
            <div class="flex justify-center">
                <ChartBarIcon class="size-5 text-black mr-1" /> Trình độ : Dễ
            </div>

        </div>
        <div class="flex items-center mt-2 mb-2">
            <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-[#80ee98] h-1.5 rounded-full" :style="{width: scoreToFixed + '%'}">
                </div>
            </div>
        </div>
        <div class="flex justify-between text-gray-600 text-sm mt-4">
            <div>
                Điểm : {{ scoreToFixed }} / 100
            </div>
            <div>
                Thời gian : {{ formattedTime }}
            </div>
        </div>
        <button v-on:click="startQuiz(lessonId)" class="bg-blue-500 text-white mt-4 px-4 py-2 rounded-lg hover:bg-blue-600">
            Try Again <i class="fas fa-arrow-right"></i>
        </button>
    </div>
</template>
<script setup>
import {  PaperClipIcon, ChatBubbleLeftEllipsisIcon, ChartBarIcon } from '@heroicons/vue/24/solid'
import { axiosdefault } from '../../interceptors/axios-base';
</script>
<script>
export default {
    props: ['practice'],
    data() {
        return {
            lessonId: this.practice.lessonId,
            time: this.practice.time,
            score: this.practice.score,
            topicId: '',
            count: '',
            title: '',
            thumb:'',
            topicName: ''

        }
    },
    mounted() {
        axiosdefault.get(`topics/lesson/${this.lessonId}`)
            .then(res => {
                this.topicId = res.data.metadata.topicId
                this.count = res.data.metadata.count
                this.title = res.data.metadata.title
                this.thumb = res.data.metadata.thumb
                axiosdefault.get(`topics/${res.data.metadata.topicId}`)
                    .then(res => {

                        this.topicName = res.data.metadata.title
                    })
            })
            .catch(e => {
                console.log(e)
            })
       
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor(this.time / 60 )
            const seconds = this.time % 60
            return `${String(minutes).padStart(2, "0")} phút ${String(seconds).padStart(2, "0")} giây`
        },
        scoreToFixed(){
            return (this.score*100).toFixed()
        },
        
    },
    methods: {
        startQuiz(lessonId) {
            this.$router.push({name: 'Quiz', params: {id: lessonId}})
        }
    },
    
}

</script>

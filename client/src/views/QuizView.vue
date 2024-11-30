<template>
    <div class="flex flex-col font-Poppins min-h-screen">
        <HeaderBar/>
        <div class="h-[42px] bg-[#15919b] justify-center items-center gap-2 inline-flex ">
            <div class="text-[#ffffff] font-semibold text-base">
                BẮT ĐẦU NÀO !!!
            </div>
        </div>
        <div  class=" w-full h-[54px]  px-[108px] py-3 bg-[#dfdfdf] justify-center items-center gap-6 inline-flex">
            <div class="w-[137px] text-[#1c1c1c] text-sm font-normal">{{sessions[currentIndex].tag}}</div>
            <div class=" grow shrink basis-0 h-[15px] p-1 bg-[#f3f7fc] rounded-lg justify-start items-start gap-0.5 flex">
                <div v-for="(session, index) in sessions" :key="index" :class="index <= currentIndex ? bgblue : bgwhite" class=" w-full h-[7px] relative rounded-[25px] shadow" ></div>
                
            </div>
        </div>
        <div class="text-center">
            <h1  class="text-2xl font-bold mb-16 mt-16">
                <span v-if="isChecked">{{sessions[currentIndex].question}}</span>
                <span class="pl-2" v-for="(word, index) in words" :key="index" :class="word.level" v-if="!isChecked">{{ word.word }}</span>
            </h1>
            <div class="pb-14">{{ sessions[currentIndex].translate }}</div>
            <div  class="flex flex-cols-2 justify-center gap-8">
                <audio type="audio/mpeg" :src="sessions[currentIndex].audioUrl" controls></audio>
                <button @click="check" :disabled="isRecording" class="border border-blue-500 rounded-lg py-2 px-4">
                    <i class="fas fa-microphone"></i>
                </button>
            </div>
        </div>
        <div class="flex justify-between mt-24">
            <button @click="preQuestion" :disabled="currentIndex == 0" class="border border-blue-500 text-blue-500 ml-72 py-2 px-4 rounded-md">
                Quay lại
            </button>
            <button @click="nextQuestion" v-if="currentIndex < 9" class="bg-blue-500 mr-72 text-white py-2 px-4 rounded-md">
                Tiếp theo
            </button>
            <button v-else @click="sendPratice" class="bg-[#80ee98] mr-72 text-white py-2 px-4 rounded-md">
                Nộp bài
            </button>
        </div>
        <FooterBar/>
    </div>
    
</template>

<script setup>

import FooterBar from '../components/FooterBar.vue';
import HeaderBar from '../components/HeaderBar.vue';
import { axiosdefault } from '../interceptors/axios-base';
</script>

<script>

export default {
    data() {
        return {
            sessions: [{
                tag: '',
                question: '',
                correctSentence: '',
                translate: '',
                audioUrl: ''
            }],
            isActive: false,
            isKey: 0,
            bgwhite: 'bg-[#dfdfdf]',
            bgblue: 'bg-[#09d1c7]',
            isRecording: false,
            count: 0,
            currentIndex: 0,
            audioChunks: [],
            mediaRecorder: null,
            mediaBlob: null,
            isChecked: true,
            words: [{
                word: '',
                level: ''
            }],
            score: 0,
            startTime: null,
            endTime: null,
            duration: null

        }
    },
    mounted() {
        this.startTime = Date.now()
    },
    beforeCreate(){
        const sessionId = this.$route.params.id
        axiosdefault.get(`/topics/lesson/${sessionId}`)
            .then(res => {
                this.sessions = res.data.metadata.contents
                this.count = res.data.metadata.contents.length
            })
            .catch(err => {
                console.log(err)
            })
    },
    methods: {
        sendPratice(){
            this.endTime = Date.now()
            this.duration = Math.floor((this.endTime - this.startTime) / 1000)
            
            const lessonId = this.$route.params.id
            console.log(this.score/10)
            console.log(this.duration)
            // axiosdefault.post(`/pratice/${lessonId}`, {
            //     score: average,
            //     time: this.duration
            // }).then(res => {
            //     console.log(res)
            // })
        },
        preQuestion(){
            this.currentIndex--
            this.isKey--
        },
        nextQuestion(){
            if(this.currentIndex < this.count){
                this.currentIndex++
                this.isChecked = true
                this.words = []
                this.isKey++
            }
        },

        async check(){
            this.isRecording = true
            this.audioChunks = []
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            this.mediaRecorder = new MediaRecorder(stream)
            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            }
            this.mediaRecorder.onstop = (e) => {
                this.mediaBlob = new Blob(this.audioChunks, {type: "audio/ogg; codecs=opus"})
                const data = new FormData()
                data.append('audio', this.mediaBlob)
                data.append('text', this.sessions[this.currentIndex].correctSentence)
                let config = {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                axiosdefault.post('/practice/compare', data, config)
                    .then(res => {
                        this.words = []
                        this.words = res.data.metadata.metadata.highLight
                        console.log(this.words)
                        this.score += res.data.metadata.metadata.score
                        console.log(res.data.metadata.metadata.score)
                        this.isChecked = false
                    })
                
            }
            this.mediaRecorder.start()

            setTimeout(() => {
                this.isRecording = false
                this.mediaRecorder.stop()
            }, 5000)
        }
    }
}

</script>

<style>
.level-1 {
    color: #EF4444;
}
.level-2 {
    color: #F59E0B;
}
.level-3 {
    color: #10B981;
}

</style>
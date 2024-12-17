<template>
    <div class="text-center mt-24">
        <h1 class="text-2xl  mb-14">
            Bạn muốn học gì hôm nay?
        </h1>
        <div class="flex items-center justify-center space-x-4">
            <i class="fas fa-chevron-left text-2xl">
            </i>
            <div class="grid grid-cols-4 gap-10">
                <TopicItems v-bind:topic="topic" v-for="topic in topics" :key="topic._id"></TopicItems>
            </div>
            <i class="fas fa-chevron-right text-2xl">
            </i>
        </div>
    </div>
</template>

<script setup>

import { axiosbase } from '../../interceptors/axios-base';
import TopicItems from './TopicItems.vue';


</script>

<script>
export default {
    data() {
        return {
            topics: []
        }
    },
    mounted() {
        axiosbase.get("/topics")
            .then(response => {
                this.topics = response.data.metadata
            })
            .catch(e=> {
                console.log(e)
            })
    },
    method: {

    }
}


</script>
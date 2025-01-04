<template>
    <div class="grid grid-cols-3 gap-8">
        <PracticeItems v-bind:practice="practice" v-for="practice in practices" :key="practice._id"  />
    </div>
</template>

<script setup>
import { axiosdefault } from '../../interceptors/axios-base';
import PracticeItems from './PracticeItems.vue';
</script>

<script>
export default {
    data(){
        return {
            practices: []
        }
    },
    mounted(){
        axiosdefault.get("/practice")
            .then(res => {
                this.practices = res.data.metadata
            })
            .catch(err => {
                console.log(err)
            })
    }   


}
</script>


<template>
        <router-link :to = "{name: 'learnLesson', params: {id : topic._id}}">      
        <div class=" w-44 border rounded-lg p-4 text-center">
            <img alt="Flag of the United States" class="mx-auto mb-2" height="60" :srcset="`/topics/${topic.thumb}`" width="100"/>
            <h2 class="font-sm">
            {{topic.title}}
            </h2>
            <p class="text-gray-500 text-xs">
            {{topic.description}}
            </p>
        </div>
    </router-link>
</template>
<script setup>

</script>
<script>
export default {
    props: ['topic'],
    

}
</script>

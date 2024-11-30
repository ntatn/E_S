<template>
    <router-link :to = "{name: 'learnLesson', params: {id : topic._id}}">      
        <div class="border rounded-lg p-4 text-center">
            <img alt="Flag of the United States" class="mx-auto mb-2" height="60" src="/dulich.png" width="100"/>
            <h2 class="font-sm">
            {{topic.title}}
            </h2>
            <p class="text-gray-500 text-xs">
            {{topic.description}}
            </p>
        </div>
    </router-link>
</template>

<script>
export default {
    props: ['topic'],
    mounted() {
        console.log(this.topic.title)
    },
}
</script>

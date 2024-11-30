<template>
    <div class="flex items-center justify-between p-4 border-b">
        <div class="flex items-center">
            <img alt="Logo with blue stripes and an arrow" class="h-8 w-8" height="50" src="https://storage.googleapis.com/a1aa/image/WVFPbyFEe2WuVqAtFDnwFO1JeleFUxwrNpvKGgAFNYVTYSfOB.jpg" width="50"/>
            <span class="text-blue-600 text-xl font-bold ml-2">
            E-Speech
            </span>
        </div>
        <div class="flex items-center space-x-20">
            <a class="text-gray-700 w-fit relative transition-all before:absolute before:bottom-0 before:right-0 before:h-0.5 before:w-0 before:bg-blue-400 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full hover:before:bg-red-500 " href="/">
            Trang chủ
            </a>
            <router-link class="text-gray-700 w-fit relative transition-all before:absolute before:bottom-0 before:right-0 before:h-0.5 before:w-0 before:bg-blue-400 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full hover:before:bg-red-500 " :to="{name: 'learn'}">
            Học
            </router-link>
            <a class="text-gray-700 w-fit relative transition-all before:absolute before:bottom-0 before:right-0 before:h-0.5 before:w-0 before:bg-blue-400 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full hover:before:bg-red-500 " href="#">
            Liên hệ
            </a>
            <a class="text-gray-700 w-fit relative transition-all before:absolute before:bottom-0 before:right-0 before:h-0.5 before:w-0 before:bg-blue-400 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full hover:before:bg-red-500 " href="#">
            Thành tích
            </a>
        </div>
        <div class="flex items-center space-x-2 ">
            <button class="group relative text-left z-10" >
                <i class="fas fa-user text-gray-700 ">
                </i>
                <div class="absolute top-full w-24 right-0 rounded-lg p-3 mt-1 shadow-lg scale-y-0 bg-white group-focus:scale-y-100">
                    <a class="relative" @click="profile">Profile</a>
                    <br>
                    <hr class="text-gray-700 mt-1 mb-1">
                    <a class="relative" @click="logOut">Log Out</a>
                </div>
            </button>
            <span class="text-gray-700">
            EN
            </span>
            <i class="fas fa-chevron-down text-gray-700">
            </i>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        logOut() {
            this.$router.push({name: 'logout'})
        },
        profile() {
            this.$router.push({name: 'profile'})
        }
    }
}

</script>


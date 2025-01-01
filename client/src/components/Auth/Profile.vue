<template>
    <div class="flex flex-row bg-[#e9effd]">
        <aside class="w-1/5 top-0 bottom-0 bg-white p-6">
            <div class="flex items-center mb-8">
                <img class="rounded-full w-12 h-12 mr-4" height="50" src="https://storage.googleapis.com/a1aa/image/KYCUGqcFp3JiLhLKpeem3CJSYfpffLVhKMfpnnIPnoPOKVYeJA.jpg" alt="img profile">
                <div>
                    <h2 class="font-semibold ">
                        {{ user.name }}
                    </h2>
                    <p class="text-sm text-gray-500">
                        <i class="fa-solid"> {{user.level}}</i>
                    </p>
                </div>
            </div>
            <div class="mt-9 mb-2 flex ">
                <Bars3Icon class="size-6 mr-2"/>
                MENU
            </div>
            <hr class="border-gray-400">
            <nav>
                <ul>
                    <li class=" mt-5 mb-5 p-2 ">
                        <button class="flex items-center" v-on:click="page3 = false; page2 = false" :class="page2 == false && page3 == false ? 'text-blue-600' : 'text-[#404040]'">
                            <UserCircleIcon class="size-6 mr-2"/>
                            My Profile
                        </button>
                    </li>
                    <li class="mb-5 p-2">
                        <button class="flex items-center text-[#404040]" v-on:click="page2 = true" :class="page2 == true ? 'text-blue-600' : 'text-[#404040]'">
                            <FolderIcon class="size-6 mr-2"/>
                            My Courses
                        </button>
                    </li>
                    <li class="mb-5 p-2">
                        <button class="flex items-center text-[#404040]" v-on:click="page2 = false; page3 = true" :class="page2 == false && page3 == true ? 'text-blue-600' : 'text-[#404040]'">
                            <Cog6ToothIcon class="size-6 mr-2"/>
                            Settings
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
        <main class="flex-1 p-6">

            <MyCourse v-if="page2"/>
            <Settings v-bind:user="user" v-else-if="page3"/>
            <MyProfile v-else/>
        </main>
    </div>
</template>
<script setup>
import { axiosdefault } from '../../interceptors/axios-base';
import MyCourse from './MyCourse.vue';
import MyProfile from './MyProfile.vue';
import Settings from './Settings.vue';
import { UserCircleIcon, Cog6ToothIcon, FolderIcon, Bars3Icon} from '@heroicons/vue/24/solid'
</script>
<script >
export default {
    data() {
        return {
            page2: false,
            page3: false,
            user: {
                name: '',
                email: '',
                level: ''
            }
        }
    },
    mounted() {
        axiosdefault.get("/user")
            .then(res => {
                this.user = res.data.metadata.metadata.user
            })
            .catch(err => {
                console.log(err.message)
            })
        
    }
}
</script>



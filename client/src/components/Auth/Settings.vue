<template>
    <div class=" flex justify-center items-baseline min-h-screen ">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h1 class="text-2xl font-bold mb-6">Account Infomations</h1>
            <form @submit.prevent="handleSubmit">
                <div class="grid grid-cols-1 gap-4 mb-4">
                    <label class="block">Name</label>
                    <input type="text" v-model="name" placeholder="Name" class="border border-gray-300 p-2 rounded-md">
                    <label class="block">Email</label>
                    <input type="text" v-model="email" placeholder="Email"
                        class="border border-gray-300 p-2 rounded-md">
                    <label class="block">Level</label>
                    <select v-model="level" autocomplete="country-name"
                        class="block rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option>Beginners</option>
                        <option>Pre-Intermediate</option>
                        <option>Intermediate</option>
                        <option>Upper-Intermediate</option>
                        <option>Advenced</option>
                    </select>
                </div>

                <div class="flex justify-end">

                    <fwb-button type="button" @click="showModal"
                        class="bg-blue-600 text-white px-4 py-2 rounded-md">Save </fwb-button>
                </div>
            </form>
        </div>
    </div>
    <fwb-modal v-if="isShowModal" size="xs" @close="closeModal">
        <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
        </template>
        <template #body>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Mọi thông tin sẽ được thay đổi dựa trên yêu cầu của bạn. Bạn có chắc chắn muốn thay đổi thông tin không?
            </p>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="handleSubmit" color="green">
                    I accept
                </fwb-button>
            </div>
        </template>
    </fwb-modal>
    
</template>
<script setup>
import { axiosdefault } from '../../interceptors/axios-base';
import { ref } from 'vue'
import { FwbButton, FwbModal } from 'flowbite-vue'

const isShowModal = ref(false)

function closeModal() {
    isShowModal.value = false
}
function showModal() {
    isShowModal.value = true
}
</script>
<script>
export default {
    props: ['user'],
    data() {
        return {
            name: this.user.name,
            email: this.user.email,
            level: this.user.level,
            
        }
    },
    methods: {
        handleSubmit() {
            axiosdefault.patch("/user/update", {
                name: this.name,
                email: this.email,
                level: this.level
            }).then(
                localStorage.setItem('showToast', 'true'),
                this.$router.go()
                
            )
        },
    }
}
</script>

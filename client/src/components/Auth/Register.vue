<template>
    <div class="bg-gray-50 p-5"></div>
    <div class="bg-gray-50  flex item-center justify-center">
        <div class="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
            <div class="md:w-1/2 px-8 md:px-16 font-Poppins">
                <h2 class="font-bold text-2xl font-Poppins">Signup</h2>
                <p class="text-sm mt-4 font-Poppins">Chưa có tài khoản?</p>
                <fwb-alert icon type="danger" v-if="isError">
                    Email đã được đăng ký tài khoản!
                </fwb-alert>
                <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
                    <input class="p-2 mt-8 rounded-xl border" type="text" name="username" placeholder="Name"
                        v-model="name" required>
                    <input class="p-2  rounded-xl border" type="email" name="email" placeholder="Email" v-model="email"
                        required>
                    <div class="relative">
                        <input class="p-2 rounded-xl border w-full" type="password" name="password"
                            placeholder="Password" v-model="password" required>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray"
                            class="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                            <path
                                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                            <path
                                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                            <path
                                d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                        </svg>
                    </div>
                    <div class="relative">
                        <input class="p-2 rounded-xl border w-full" type="password" name="rePassword"
                            placeholder="Repeat Password" required>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray"
                            class="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                            <path
                                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                            <path
                                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                            <path
                                d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                        </svg>
                    </div>
                    <button name="btnSignIn" type="submit"
                        class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Đăng ký</button>
                </form>
                <div class="mt-6 grid grid-cols-3 items-center text-gray-400">
                    <hr class="border-gray-400">
                    <p class="text-center text-sm">OR</p>
                    <hr class="border-gray-400">
                </div>
                <button
                    class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                    <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                        <path fill="#FFC107"
                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                        <path fill="#FF3D00"
                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                        <path fill="#4CAF50"
                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                        <path fill="#1976D2"
                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    Signup with Google
                </button>
                <div class="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                    <p>Đã có tài khoản?</p>
                    <router-link :to="{ name: 'login' }"
                        class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Đăng
                        nhập</router-link>
                </div>
            </div>
            <div class="w-1/2">
                <img class="rounded-2xl" srcset="/blondie.png" alt="">

            </div>
        </div>
    </div>
</template>
<script setup>
import { FwbAlert } from 'flowbite-vue'
</script>
<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            level: 'beginners',
            isError: false,
            information: ''
        }
    },
    methods: {
        async handleSubmit() {
            this.$store.dispatch('registerUser', {
                name: this.name,
                email: this.email,
                password: this.password,
                level: this.level
            }).then(() => {
                localStorage.setItem('showToast', 'true'),
                    this.$router.push({ name: 'login' })
            }).catch(e => {
                this.isError = true

            })
        }
    }
}
</script>

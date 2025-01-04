<template>
    <div class="flex flex-col font-Poppins min-h-screen">
        <HeaderBar />
        <div class="h-[42px] bg-[#0B1E46] justify-center items-center gap-2 inline-flex ">
            <div class="text-[#EBAD25] font-semibold text-sm">
                Get 50% off E-Speech Premium & unlock new experience
            </div>
        </div>
        <div class="w-full max-w-4xl p-6 self-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow-md border border-blue-500 text-center">
                    <i class="fas fa-phone-alt text-blue-500 text-3xl mb-4"></i>
                    <h3 class="font-bold text-lg mb-2">Give us a call</h3>
                    <p>+12 4650 123</p>
                    <p>+14 0691 463</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md border border-blue-500 text-center">
                    <i class="fas fa-map-marker-alt text-blue-500 text-3xl mb-4"></i>
                    <h3 class="font-bold text-lg mb-2">Our main office</h3>
                    <p>Agiou Markou 15,</p>
                    <p>Athina 105 60, UK.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md border border-blue-500 text-center">
                    <i class="fas fa-envelope text-blue-500 text-3xl mb-4"></i>
                    <h3 class="font-bold text-lg mb-2">Send us a email</h3>
                    <p>mail@espeech.com</p>
                </div>
            </div>
            <div class="bg-white p-8 rounded-lg shadow-md">
                <h2 class="text-center text-2xl text-blue-600 mb-6">Chúng tôi giúp gì được cho bạn?</h2>
                <form>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input type="text" placeholder="Name" class="border border-gray-300 p-3 rounded-lg w-full">
                        <input type="email" placeholder="Email" class="border border-gray-300 p-3 rounded-lg w-full">
                    </div>
                    <input type="text" placeholder="Subject ..."
                        class="border border-gray-300 p-3 rounded-lg w-full mb-4">
                    <textarea placeholder="Write your problem ..."
                        class="border border-gray-300 p-3 rounded-lg w-full mb-4 h-32"></textarea>
                    <button type="submit" class="bg-blue-600 text-white p-3 rounded-lg w-full">Send Massage</button>
                </form>
            </div>
        </div>

        <FooterBar />
    </div>
</template>

<script setup>
import HeaderBar from '../components/HeaderBar.vue';
import FooterBar from '../components/FooterBar.vue';
</script>

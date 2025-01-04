<template>
    <div class="h-[42px] bg-[#0B1E46] justify-center items-center gap-2 inline-flex ">
        <div class="text-[#EBAD25] font-semibold text-sm">
            Get 50% off E-Speech Premium & unlock new experience
        </div>
    </div>
    <div class="h-[648px] relative bg-gradient-to-r from-blue-600 to-[#4fb3ff]">
        <div class="h-[200px] left-[108px] top-[149px] absolute flex-col justify-start items-start gap-[19px] inline-flex">
            <div class="self-stretch h-[210px] flex-col justify-start items-start flex">
                <div class="self-stretch pt-2.5 justify-center items-center gap-2.5 inline-flex">
                    <div class="grow shrink basis-0 w-[600px] text-white text-[44px] font-bold">Studying Online is now much easier</div>
                </div>
                <div class="self-stretch py-1 justify-start items-start gap-2.5 inline-flex">
                    <div class="w-[510.31px] text-white text-xl font-normal">E-Speech is an interesting platform that will teach you in more an interactive way</div>
                </div>
            </div>
            <div class="h-12 px-4 py-2 bg-[#ebad25] rounded-lg justify-center items-center gap-2 inline-flex">
                <div v-on:click="showToast" class="text-white text-base font-normal">Let’s start</div>
            </div>
        </div>
        <div class="w-[726.92px] h-[536.04px] left-[808px] top-[59px] absolute">
            <img srcset="/student.png" alt="background">
        </div>
    </div>
    
</template>

<script setup>

</script>


<template>
    <div class="grid grid-cols-3 gap-8">
        <div class="border rounded-lg p-4 bg-white">
            <img src="/dulich.png" class="w-full h-48 object-cover rounded-lg mb-4">
                <h2 class="text-lg font-semibold mb-2" >Try to fix myself</h2>
                <div class="text-gray-600 mb-4 flex items-start">
                    <PaperClipIcon class="size-5 text-black mr-1"/> Chủ đề: 
                </div>
                <div class="text-gray-600 mb-4 flex justify-between mt-2">
                    <div class="flex justify-center">
                        <ChatBubbleLeftEllipsisIcon class="size-5 text-black mr-1"/> Số lượng câu hỏi : 10
                    </div>
                    <div class="flex justify-center">
                        <ChartBarIcon class="size-5 text-black mr-1"/> Trình độ : Dễ
                    </div>

                </div>
                <div class="flex items-center mt-2 mb-2">
                    <div class="w-full bg-gray-200 rounded-full h-1.5">
                        <div class="bg-[#80ee98] h-1.5 rounded-full" style="width: 70%">
                        </div>
                    </div>
                </div>
                <div class="flex justify-between text-gray-600 text-sm mt-4">
                    <div>
                        Điểm : 70 / 100
                    </div>
                    <div>
                        Thời gian : 1 phút 60 giây
                    </div>
                </div>
                <button  class="bg-blue-500 text-white mt-4 px-4 py-2 rounded-lg hover:bg-blue-600">
                    Try Again <i class="fas fa-arrow-right"></i>
                </button>
        </div>
    </div>
</template>

<script setup>
import {  PaperClipIcon, ChatBubbleLeftEllipsisIcon, ChartBarIcon } from '@heroicons/vue/24/solid'
</script>

<script>
export default {
    data(){
        return {
            lessons: []
        }
    },


}
</script>


<script setup>

</script>

<template>
    <div class="py-20 container mx-auto text-center">
        <h1 class="text-2xl">How It Works</h1>

        <div class="flex justify-center gap-8 mt-12">

            <div v-for="(feature, index) in features" :key="index"
                class="card flex-1 bg-amber-50 p-6 rounded-lg shadow-md mt-8">
                <div class=" w-10 h-10 text-white p-2 rounded-full flex items-center justify-center mx-auto">
                    {{ feature.icon }}</div>
                <div>{{ feature.title }}</div>
                <div>{{ feature.description }}</div>
            </div>

        </div>
    </div>
</template>
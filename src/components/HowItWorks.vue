<script setup>
const steps = [
    {
        title: 'Pick a date',
        description: 'Choose your preferred date and time slot.',
    },
    {
        title: 'Fill in details',
        description: 'Enter your name, contact and notes.',
    },
    {
        title: 'Get confirmed',
        description: 'Receive a confirmation about your appointment.',
    },
];
</script>

<template>
    <div class="py-20 container mx-auto text-center">
        <h1 class="text-2xl">How It Works</h1>

        <div class="flex justify-center gap-8 mt-12">

            <div v-for="(step, index) in steps" :key="index"
                class="card flex-1 bg-amber-50 p-6 rounded-lg shadow-md mt-8">
                <div class="bg-blue-600 w-10 h-10 text-white p-2 rounded-full flex items-center justify-center mx-auto">
                    {{ index + 1 }}</div>
                <div>{{ step.title }}</div>
                <div>{{ step.description }}</div>
            </div>

        </div>
    </div>
</template>
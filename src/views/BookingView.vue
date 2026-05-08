<script setup>
import { ref } from 'vue';

const currentStep = ref(1);
</script>

<template>
    <h1>Booking View</h1>
    <div>
        <div v-if="currentStep === 1">
            <h2>Step 1</h2>
        </div>
        <div v-else-if="currentStep === 2">
            <h2>Step 2</h2>
        </div>
        <div v-else>
            <h2>Step 3</h2>
        </div>
    </div>
    <div>
        <button @click="currentStep--" :disabled="currentStep === 1">Back</button>
        <button @click="currentStep++" :disabled="currentStep === 3">Next</button>
    </div>
</template>
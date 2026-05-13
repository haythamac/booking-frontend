<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const booking = history.state.booking
const formattedDate = new Date(booking.booking_date).toLocaleString()
</script>

<template>
    <h1>Confirmation View</h1>
    <p>Congratulations! Your booking has been confirmed.</p>
    <p><strong>Date:</strong> {{ formattedDate }}</p>
    <p><strong>Name:</strong> {{ booking.customer_name }}</p>
    <p><strong>Email:</strong> {{ booking.customer_email }}</p>
    <p><strong>Phone:</strong> {{ booking.customer_phone }}</p>
    <p><strong>Notes:</strong> {{ booking.notes }}</p>
    <button @click="router.push('/')">Back to Home</button>
</template>
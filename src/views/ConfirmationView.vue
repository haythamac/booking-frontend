<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const booking = history.state.booking

onMounted(() => {
    console.log('Booking data:', booking)
    if (!booking) {
        router.push('/booking')
    }
})


const formattedDate = booking ? new Date(booking.booking_date).toLocaleString() : null
</script>

<template>
    <div v-if="booking">
        <h1>Confirmation View</h1>
        <p>Congratulations! Your booking has been confirmed.</p>
        <p><strong>Date:</strong> {{ formattedDate }}</p>
        <p><strong>Name:</strong> {{ booking.customer_name }}</p>
        <p><strong>Email:</strong> {{ booking.customer_email }}</p>
        <p><strong>Phone:</strong> {{ booking.customer_phone }}</p>
        <p><strong>Notes:</strong> {{ booking.notes }}</p>
        <button @click="router.push('/')">Back to Home</button>
    </div>
</template>
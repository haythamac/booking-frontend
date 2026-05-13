<script setup>
import { ref } from 'vue';
import { bookingAPI } from '@/services/booking';

const currentStep = ref(1);
const bookingDate = ref(null);
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    notes: ''
})



function showBooking() {
    console.log(bookingDate.value.toISOString().slice(0, 19));
}


function confirmButton() {
    if (!bookingDate.value) {
        alert('Please select a date and time')
        return
    }
    if (!form.value.customer_name) {
        alert('Please enter your name')
        return
    }
    if (!form.value.customer_phone) {
        alert('Please enter your phone number')
        return
    }
    const data = {
        booking_date: bookingDate.value.toISOString().slice(0, 19),
        customer_name: form.value.customer_name,
        customer_email: form.value.customer_email,
        customer_phone: form.value.customer_phone,
        notes: form.value.notes
    }

    bookingAPI.store(data)
        .then(response => {
            alert('Booking confirmed!')
            router.push({
                path: '/confirmation',
                state: { booking: response.data.data }
            })
        })
        .catch(error => {
            alert('An error occurred while confirming your booking. Please try again.')
            console.log(error.response.data)
            console.error(error)
        })

}
</script>

<template>
    <h1>Booking View</h1>
    <div>
        <div v-if="currentStep === 1">
            <h2>Step 1</h2>
            <h1>ha</h1>
            <VDatePicker v-model="bookingDate" mode="dateTime" />
        </div>
        <div v-else-if="currentStep === 2">
            <h2>Step 2</h2>
            <form>
                <label for="customer_name">Name:</label>
                <input type="text" id="customer_name" v-model="form.customer_name" />
                <label for="customer_email">Email:</label>
                <input type="email" id="customer_email" v-model="form.customer_email" />
                <label for="customer_phone">Phone:</label>
                <input type="tel" id="customer_phone" v-model="form.customer_phone" />
                <label for="notes">Notes:</label>
                <textarea id="notes" v-model="form.notes"></textarea>
            </form>
        </div>
        <div v-else>
            <h2>Step 3</h2>
            <div>Summary of booking: </div>
            <p><strong>Date:</strong> {{ bookingDate.toLocaleString() }}</p>
            <p><strong>Name:</strong> {{ form.customer_name }}</p>
            <p><strong>Email:</strong> {{ form.customer_email }}</p>
            <p><strong>Phone:</strong> {{ form.customer_phone }}</p>
            <p><strong>Notes:</strong> {{ form.notes }}</p>
        </div>
    </div>
    <div>
        <button @click="currentStep--" :disabled="currentStep === 1">Back</button>
        <button @click="currentStep++" v-if="currentStep !== 3">Next</button>
        <button @click="confirmButton" v-if="currentStep === 3">Confirm</button>
        <button @click="showBooking">Show</button>
    </div>
</template>
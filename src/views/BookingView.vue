<script setup>
import { ref } from 'vue';
import { bookingAPI } from '@/services/booking';
import { useRouter } from 'vue-router'

const currentStep = ref(1);
const bookingDate = ref(null);

const router = useRouter()

const form = ref({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    notes: ''
})

const errors = ref({
    bookingDate: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
})

function validateStep() {
    if (currentStep.value === 1) {
        if (!bookingDate.value) {
            errors.value.bookingDate = 'Date is required'
            return false
        }
        errors.value.bookingDate = ''
    } else if (currentStep.value === 2) {
        if (!form.value.customer_name) errors.value.customer_name = 'Name is required'
        else errors.value.customer_name = ''

        if (!form.value.customer_phone) errors.value.customer_phone = 'Phone is required'
        else errors.value.customer_phone = ''

        const phoneRegex = /^(09|\+63)\d{9}$/
        if (!phoneRegex.test(form.value.customer_phone)) {
            errors.value.customer_phone = 'Please enter a valid PH phone number (09XXXXXXXXX)'
        } else {
            errors.value.customer_phone = ''
        }

        if (form.value.customer_email && !form.value.customer_email.includes('@')) {
            errors.value.customer_email = 'Please enter a valid email'
        } else {
            errors.value.customer_email = ''
        }

        const hasErrors = Object.values(errors.value).some(error => error !== '')
        if (hasErrors) return false
    }
    return true
}

function nextStep() {
    if (validateStep()) currentStep.value++
}

function confirmButton() {
    if (!bookingDate.value) errors.value.bookingDate = 'Date is required'
    if (!form.value.customer_name) errors.value.customer_name = 'Name is required'
    if (!form.value.customer_phone) errors.value.customer_phone = 'Phone is required'

    const hasErrors = Object.values(errors.value).some(error => error !== '')
    if (hasErrors) return

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
            <p v-if="errors.bookingDate" class="text-red-500 text-sm">{{ errors.bookingDate }}</p>
        </div>
        <div v-else-if="currentStep === 2">
            <h2>Step 2</h2>
            <form>
                <label for="customer_name">Name:</label>
                <input type="text" id="customer_name" v-model="form.customer_name" />
                <p v-if="errors.customer_name" class="text-red-500 text-sm">{{ errors.customer_name }}</p>

                <label for="customer_email">Email:</label>
                <input type="email" id="customer_email" v-model="form.customer_email" />
                <p v-if="errors.customer_email" class="text-red-500 text-sm">{{ errors.customer_email }}</p>

                <label for="customer_phone">Phone:</label>
                <input type="tel" id="customer_phone" v-model="form.customer_phone" />
                <p v-if="errors.customer_phone" class="text-red-500 text-sm">{{ errors.customer_phone }}</p>

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
        <button @click="nextStep" v-if="currentStep !== 3">Next</button>
        <button @click="confirmButton" v-if="currentStep === 3">Confirm</button>
    </div>
</template>
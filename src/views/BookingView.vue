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
    <div class="mx-auto max-w-4xl my-10 py-6 px-12 border border-amber-400 rounded-4xl shadow-md">
        <div class="flex justify-between mb-8 my-4">
            <div class="flex gap-2">
                <p class="bg-green-700 rounded-full w-8 h-8 flex items-center justify-center mx-auto"></p>
                <h1 class="text-2xl">Booking View</h1>
            </div>
            <h1>Step 1 of 3</h1>
        </div>

        <div class="flex justify-between items-center">
            <div class="flex gap-2 items-center">
                <p class="bg-green-700 rounded-full w-8 h-8 flex items-center justify-center mx-auto text-white">1</p>
                <p class="flex items-center justify-center mx-auto">Date & Time</p>
            </div>

            <span class="flex-1 border-t border-gray-300 mx-4"></span>

            <div class="flex gap-2 items-center">
                <p
                    class="bg-white-700 border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center mx-auto">
                    2</p>
                <p class="flex items-center justify-center mx-auto">Your Details</p>
            </div>

            <span class="flex-1 border-t border-gray-300  mx-4"></span>

            <div class="flex gap-2 items-center">
                <p
                    class="bg-white-700 border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center mx-auto">
                    3</p>
                <p class="flex items-center justify-center mx-auto">Confirm</p>
            </div>
        </div>

        <div class="mt-10 gap-5 mx-auto max-w">
            <div v-if="currentStep === 1">
                <h2 class="text-3xl mb-4">Choose your time</h2>
                <p class="mb-4 text-gray-700">Select a date and time for your booking.</p>
                <VDatePicker v-model="bookingDate" mode="dateTime" />
                <p v-if="errors.bookingDate" class="text-red-500 text-sm">{{ errors.bookingDate }}</p>
            </div>
            <div v-else-if="currentStep === 2">
                <h2 class="text-3xl mb-4">Your Details</h2>
                <p class="mb-4 text-gray-700">We'll use this to confirm your appointment.</p>
                <form class="flex flex-col gap-8">
                    <div class="flex justify-between items-center gap-8">
                        <div class="flex flex-col flex-1">
                            <label for="customer_name">Name</label>
                            <input type="text" id="customer_name"
                                class="border border-gray-300 rounded-md shadow-md px-3 py-2" placeholder="Jane Doe"
                                v-model="form.customer_name" />
                            <p v-if="errors.customer_name" class="text-red-500 text-sm">{{ errors.customer_name }}</p>
                        </div>

                        <div class="flex flex-col flex-1">
                            <label for="customer_phone">Phone</label>
                            <input type="tel" id="customer_phone"
                                class="border border-gray-300 rounded-md shadow-md px-3 py-2"
                                placeholder="+639 99 999 9999" v-model="form.customer_phone" />
                            <p v-if="errors.customer_phone" class="text-red-500 text-sm">{{ errors.customer_phone }}</p>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="customer_email">Email</label>
                        <input type="email" id="customer_email"
                            class="border border-gray-300 rounded-md shadow-md px-3 py-2" placeholder="you@example.com"
                            v-model="form.customer_email" />
                        <p v-if="errors.customer_email" class="text-red-500 text-sm">{{ errors.customer_email }}</p>
                    </div>
                    <label for="notes">Notes (Optional)</label>
                    <textarea id="notes" class="border border-gray-300 rounded-md shadow-md px-3 py-2"
                        placeholder="Anything we should know?" v-model="form.notes"></textarea>
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
        <div class="flex justify-between items-center mt-8">
            <button class="cursor-pointer border border-gray-300 flex items-center rounded-full py-2 px-6"
                @click="currentStep--" :disabled="currentStep === 1">Back</button>
            <button class="cursor-pointer border bg-green-700 text-white flex items-center rounded-full py-2 px-6"
                @click="nextStep" v-if="currentStep !== 3">Next</button>
            <button class="cursor-pointerborder bg-green-700 text-white flex items-center rounded-full py-2 px-6"
                @click="confirmButton" v-if="currentStep === 3">Confirm</button>
        </div>
    </div>
</template>

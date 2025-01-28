<template>
  <main class="container px-8 md:px-0 mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid md:grid-cols-2 grid-cols-1 gap-8">
      <template v-if="!eventLoading">
        <EventCard 
        :title="event.title" 
        :when="event.date" 
        :description="event.description"
        v-for="event in events" 
        :key="event.id" 
        @register="handleRegistration(event)"
      />
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i"/>
      </template>
    </section>
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!bookingLoading">
        <BookingItem 
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
        />
      </template>
      <template v-else>
        <LoadingBookingItem v-for="i in 3" :key="i"/>
      </template>
    </section>
  </main>
</template>

<script setup>
import {ref, onMounted} from "vue";
import  EventCard  from "@/components/EventCard.vue";
import BookingItem from "@/components/BookingItem.vue";
import LoadingEventCard from "@/components/LoadingEventCard.vue";
import LoadingBookingItem from "@/components/LoadingBookingItem.vue";

const events = ref([]);
const bookings = ref([]);
const eventLoading = ref(false);
const bookingLoading = ref(false);

const fetchEvents = async () => {
  eventLoading.value = true;
  try {
    const response = await fetch('http://localhost:3001/events');
    events.value = await response.json();
  } finally {
    eventLoading.value = false;
  }
};

const fetchBookings = async () => {
  bookingLoading.value = true;
  try {
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
  } finally {
    bookingLoading.value = false;
  }
};

const handleRegistration = async (event) => {
  const newBooking = {
    id: Date.now().toString(),
    userId : 1,
    eventId: event.id,
    eventTitle: event.title
  }

  await fetch('http://localhost:3001/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...newBooking,
      status: 'confirmed'
    })
  });
}

onMounted(() => {
  fetchEvents();
  fetchBookings();
});
</script>

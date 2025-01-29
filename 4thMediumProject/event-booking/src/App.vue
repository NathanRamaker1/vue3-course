<template>
  <main class="container px-8 md:px-0 mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <EventList @register="handleRegistration($event)" />
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!bookingLoading">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          :status="booking.status"
          @cancelled="cancelBooking(booking.id)"
        />
      </template>
      <template v-else>
        <LoadingBookingItem v-for="i in 3" :key="i" />
      </template>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BookingItem from '@/components/BookingItem.vue';
import LoadingBookingItem from '@/components/LoadingBookingItem.vue';
import EventList from '@/components/EventList.vue';

const bookings = ref([]);
const bookingLoading = ref(false);

const fetchBookings = async () => {
  bookingLoading.value = true;
  try {
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
  } finally {
    bookingLoading.value = false;
  }
};

const findBookingById = (id) => bookings.value.findIndex((b) => b.id === id);

const handleRegistration = async (event) => {
  if (bookings.value.some((booking) => booking.eventId === event.id && booking.userId === 1)) {
    alert('You are already registered for this event.');
    return;
  }

  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending'
  };

  bookings.value.push(newBooking);

  try {
    const respone = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newBooking,
        status: 'confirmed'
      })
    });

    if (respone.ok) {
      const index = findBookingById(newBooking.id);
      bookings.value[index] = await respone.json();
    } else {
      throw new Error('Failed to confirm booking');
    }
  } catch (e) {
    console.error('Failed to register for event: ', e);
    bookings.value = bookings.value.filter((b) => b.id !== newBooking.id);
  }
};

const cancelBooking = async (bookingId) => {
  const index = findBookingById(bookingId);
  const originalBooking = bookings.value[index];
  bookings.value.splice(index, 1);

  try {
    const respone = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE'
    });

    if (!respone.ok) {
      throw new Error('Booking could not be cancelled.');
    }
  } catch (e) {
    console.error('Failed to cancel booking: ', e);
    bookings.value.splice(index, 0, originalBooking);
  }
};

onMounted(() => {
  fetchBookings();
});
</script>

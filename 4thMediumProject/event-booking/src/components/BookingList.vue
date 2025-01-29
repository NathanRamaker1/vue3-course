<template>
    <template v-if="error">
        <ErrorCard :retry="fetchBookings">
            Could not load bookings at the moment. Please try again.
        </ErrorCard>
    </template>
    <template v-else>
        <section class="grid grid-cols-1 gap-4">
            <template v-if="!loading">
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
    </template>
</template>

<script setup>
    import { onMounted } from 'vue';
    import BookingItem from '@/components/BookingItem.vue';
    import LoadingBookingItem from '@/components/LoadingBookingItem.vue';
    import useBookings from '@/composables/useBooking';
    import ErrorCard from '@/components/ErrorCard.vue';

    const { bookings, loading, fetchBookings, cancelBooking, error } = useBookings();

    onMounted(() => {
        fetchBookings();
    });
</script>  
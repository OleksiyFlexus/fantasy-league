<template>
    <router-view></router-view>
    <div class="common_container">
        <EventBackground />
        <Event />
        <Protocol />
        <ProtocolPlayerItem />
    </div>

</template>

<script setup>
import Event from '@/components/Match/Event.vue';
import EventBackground from '@/components/Match/EventBackground.vue';
import Protocol from '@/components/Match/Protocol.vue';
import ProtocolPlayerItem from '@/components/Player/ProtocolPlayerItems.vue';

</script>

<style scoped></style>

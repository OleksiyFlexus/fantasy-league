<template>
    <router-view></router-view>
    <div class="common_container">
        <EventBackground />
        <Event />
        <MatchTimer />
        <Protocol />
        <ProtocolPlayerItem />
    </div>

</template>

<script setup>
import Event from '@/components/match/Event.vue';
import EventBackground from '@/components/match/EventBackground.vue';
import MatchTimer from '@/components/match/MatchTimer.vue';
import Protocol from '@/components/match/Protocol.vue';
import ProtocolPlayerItem from '@/components/player/ProtocolPlayerItems.vue';

</script>

<style scoped></style>

<template>
    <router-view></router-view>
    <div class="common_container">
        <div class="eventBackground">

        </div>


    </div>

</template>

<script setup>

</script>

<style scoped>
.eventBackground {
    display: flex;
    height: 200px;
    width: 355px;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    backdrop-filter: blur(5px);
    background-image:url('../assets/images/MatchEventBackground.jpg');
 
}
</style>

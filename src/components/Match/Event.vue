<template>
        <div class="event__section">
            <div class="left__teamSection">
                <img src="@/assets/images/DefaultTeamLogo.png" alt="default logo">
                <p>Manchester United</p>
            </div>
            <div class="middle__scoreSection">
                <div class="leftTeam__score">
                    <p>0</p>
                </div>
                <div class="middleScore__section">
                    <p>:</p>
                </div>
                <div class="rightTeam__score">
                    <p>0</p>
                </div>
            </div>
            <div class="right__teamSection">
                <img src="@/assets/images/DefaultTeamLogo.png" alt="default logo">
                <p>ebanuie dinozavri 2</p>
            </div>
        </div>
</template>

<script setup>

</script>

<style scoped>
.event__section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}

.left__teamSection {
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    font-size: clamp(20px, 2vw, 12px);
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 105px;
    -webkit-line-clamp: 1;
    gap: 10px;
}

.middle__scoreSection {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    font-size: 80px;
    font-weight: 800;
    gap: 10px;
}

.right__teamSection {
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    font-size: clamp(20px, 2vw, 12px);
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 105px;
    -webkit-line-clamp: 1;
    gap: 10px;
}

</style>

<template>
    <div class="protocolHeader">
        <h1>протокол</h1>
    </div>
    <div class="protocolSection">
        <div class="leftProtocolSection">
            <div class="leftTeamLogo">
                <img src="@/assets/images/DefaultTeamLogo.png" alt="default logo">
            </div>
            <div class="leftTeamName">
                <p>LEFT TEAM name</p>
            </div>
        </div>
        <div class="rightProtocolSection">
            <div class="rightTeamName">
                <p>Right team name</p>
            </div>
            <div class="rightTeamLogo">
                <img src="@/assets/images/DefaultTeamLogo.png" alt="default logo">
            </div>
        </div>

    </div>
</template>

<script setup>

</script>

<style scoped>
.protocolSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    background-color: #cecece;
    border-radius: 4px;
    padding: 5px;
}

.protocolSection::before {
    content: '';
    position: absolute;
    bottom: 57px;
    height: 300px;
    width: 2px;
    background: #4d4949;
    right: 186px;
    transform: translateX(-50%);
}

.protocolHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: 800;
    text-transform: uppercase;
}

.leftProtocolSection {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    gap: 10px;
}

.protocolSection img {
    width: 35px;
    height: auto;

}

.leftTeamName {
    display: block;
    text-align: center;
    text-transform: uppercase;
    font-size: clamp(14px, 2vw, 12px);
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
    -webkit-line-clamp: 2;
}

.rightProtocolSection {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    gap: 10px;
}

.rightTeamName {
    display: block;
    text-align: center;
    text-transform: uppercase;
    font-size: clamp(14px, 2vw, 12px);
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
    -webkit-line-clamp: 2;
}
</style>
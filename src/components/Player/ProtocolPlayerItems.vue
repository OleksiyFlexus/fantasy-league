<template>
    <div class="protocolPlayerWrap">
        <div class="leftProtocolPlayer__itemSection">
            <div class="protocolPlayer__itemSection">
                <div class="protocolPlayerPhoto">
                    <img src="@/assets/images/UndefinePhoto.png" alt="player photo">
                </div>
                <div class="protocolPlayerName">
                    <p>Oleksii</p>
                </div>
                <div class="protocolScoreSection">
                    <Goals />
                    <Assist />
                </div>
            </div>
        </div>
        <div class="rightProtocolPlayer__itemSection">
            <div class="protocolPlayer__itemSection">
                <div class="protocolScoreSection">
                    <Goals />
                    <Assist />
                </div>
                <div class="protocolPlayerName">
                    <p>Oleksii</p>
                </div>
                <div class="protocolPlayerPhoto">
                    <img src="@/assets/images/UndefinePhoto.png" alt="player photo">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Goals, Assist } from '@/constants/importIcons';
</script>

<style scoped>
.protocolPlayerWrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.rightProtocolPlayer__itemSection {
    background-color: #cecece;
    border-radius: 10px;
    width: 170px;
    padding: 5px;
}

.leftProtocolPlayer__itemSection {
    background-color: #cecece;
    border-radius: 10px;
    width: 170px;
    padding: 5px;
}

.protocolPlayer__itemSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    gap: 8px;
}

.protocolPlayerWrap img {
    max-width: 30px;
    height: auto;
}

.protocolPlayerWrap svg {
    max-width: 20px;
    height: auto;
}

.protocolScoreSection {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 15px;
}

.protocolPlayerName {
    font-size: 12px;
}
</style>
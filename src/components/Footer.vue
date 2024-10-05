<template>
    <footer class="footer">
        <div class="footer__container">
            <router-link to="/match" class="footerItem">
                <MatchIcon />
                <span>Створити матч</span>
            </router-link>
            <router-link to="/players" class="footerItem">
                <PlayerIcon />
                <span>Список гравців</span>
            </router-link>
            <router-link to="/teams" class="footerItem">
                <TeamIcon />
                <span>Список команд</span>
            </router-link>
            <router-link to="/scoreTable" class="footerItem">
                <TableIcon />
                <span>Таблиця</span>
            </router-link>
        </div>

    </footer>

</template>

<script setup>
import { MatchIcon, PlayerIcon, TableIcon, TeamIcon } from '@/constants/importIcons';


</script>

<style scoped>
.footer {
    width: 100%;
    height: 75px;
    box-shadow: 0px 4px 10px rgba(31, 30, 30, 0.4);
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
}

.footer__container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.footerItem {
    width: 90px;
    height: auto;
    display: flex;
    gap: 5px;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease, filter 0.3s ease, background-color 0.3s ease;
}

.footerItem:active {
    background-color: #cecece;
    border-radius: 10px;
}

.footerItem svg:hover {
    transform: scale(1.2);
    /* Увеличение при наведении */
}

.footerItem span {
    font-size: 12px;
    font-weight: 700;
    color: #333;
}

.footerItem svg {
    height: 40px;
    width: 40px;
    transition: transform 0.3s ease;
}

@media (min-width: 425px) {
    .footer {
        display: none;
    }
}
</style>
<template>
    <div>
        <div class="header-container" v-if="dataDetails.length">
            <div v-for="(data, index) in dataDetails" :class="[daysContainer, (index === currentIndex) ? activeClass : '']"  :key="index" @click="showDayData(data.dt_txt, index)" :style="{'active':(index === currentIndex)}">
                <p class="day">{{new Date(data.dt_txt).toString().split(' ')[0]}}</p>
                <p class="day-temp"><span class="degree">{{(data.main.temp - 273).toFixed(2)}}</span></p>
                
                <img class="day-icon" :src="'http://openweathermap.org/img/w/'+(data.weather[0].icon)+'.png'" alt="">
                <p class="day-condition">{{data.weather[0].main}}</p>
            </div>
        </div>
        <div v-else class="search-text">{{err ? err : 'Search city to get details'}}</div>
    </div>
</template>
<script>
import { eventBus } from "@/eventBus";
    export default {
        props: ['dataDetails', 'err'],
        data() {
            return {
                borderStyle: '',
                currentIndex: 0,
                daysContainer: 'days-container',
                activeClass: 'active'
            }
        },
        methods: {
            showDayData(date, index){
                this.currentIndex = index
                eventBus.$emit('send-date', date)
            }
        },
        mounted() {     
        },
    }

</script>

<style scoped>
.header-container{
    padding: 1rem 4rem 0rem 4rem;
    display: flex;
    justify-content: space-between;
    text-align: center;
    overflow-y: auto;
}
.day{
    font-weight: 500;
}
.day-temp{
    font-size: 14px;
}
.degree{
    font-weight: bold !important;
}
.day-icon{
    width: 30px;
    height: 30px;
}

.days-container{
    padding: 0.3rem 1rem;
    flex: 0 0 8%;
    max-width: 8%;
    overflow-y: auto;
}
.days-container::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}
.active{
    border: 1px solid rgb(67, 133, 255);
}
@media(max-width: 320px){
    .header-container{
        padding: 1rem;
        overflow-y: auto;
    }
    .days-container{
        flex: 0 0 16%;
        max-width: 16%;
        padding: 0.3rem 0.7rem;
    }
    .day-condition{
        font-size: 13px;
    }
}
</style>
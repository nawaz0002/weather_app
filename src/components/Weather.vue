<template>
    <div>
        <div class="weather-main-container" v-if="dataDetails">
        <div class="weather-container">
            <div class="weather-degree-container" v-if="dataDetails">
                <h2 class="weather-degree">{{(dataDetails.list[0].main.temp - 273).toFixed(2)}}&nbsp; &#8451;</h2>
                <img class="weather-icon" :src="'http://openweathermap.org/img/w/'+(dataDetails.list[0].weather[0].icon)+'.png'" alt="">
            </div>
            <div class="day-forecast-container" v-if="dayData">
                <div class="time-temperature" v-for="(data, index) in dayData" :key="index">
                    <h5 class="time-degree">{{(data.main.temp - 273).toFixed()}}&nbsp; &#8451;</h5>
                    <p class="time">{{new Date(data.dt_txt).toLocaleString('en-US', { hour: 'numeric', hour12: true })}}</p>
                </div>
            </div>

            <div v-else class="search-text">Select day to see the details</div>
            
            <line-chart :data="chartData"></line-chart>
            <div class="pressure-humidity">
                <div class="pressure-container">
                    <p class="pressure-text">Pressure</p>
                    <p class="pressure" v-if="dayData">{{dayData[0].main.pressure}} hpa</p>
                    <p v-else>---</p>
                </div>
                <div class="humidity-container">
                    <p class="humidity-text">Humidity</p>
                    <p class="humidity" v-if="dayData">{{dayData[0].main.humidity}} %</p>
                    <p v-else>---</p>
                </div>
            </div>

            <div class="sunrise-sunset">
                <div class="sunrise-container">
                    <p class="sun-text">Sunrise</p>
                    <p class="sun-time" v-if="dataDetails">{{(new Date(dataDetails.city.sunrise * 1000)).toLocaleTimeString().slice(0, 4)}} am</p>
                    <p v-else>---</p>
                </div>
                <div class="sunset-container">
                    <p class="sun-text">Sunset</p>
                    <p class="sun-time" v-if="dataDetails">{{(new Date(dataDetails.city.sunset * 1000)).toLocaleTimeString().slice(0, 4)}} pm</p>
                    <p v-else>---</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="search-text">
        {{err}}
    </div>
    </div>
</template>

<script>
import { eventBus } from "@/eventBus";
    export default {
        props: ['dataDetails', 'err'],
        data() {
            return {
                dayData: null,
                chartData: {}            
            }
        },
        methods: {

        },
        watch: {
            
        },
        mounted() {
            console.log(this.dataDetails)
        },
        created() {
            eventBus.$on("send-date", date => {
                if(this.dataDetails.list.length > 0){
                    this.dayData = this.dataDetails.list.filter(data => { 
                        return data.dt_txt.split(" ")[0] == date.split(" ")[0]
                    })
                    this.dayData.map(obj => {
                        // console.log(obj)
                        this.chartData["'"+obj.dt_txt+"'"] = obj.main.temp
                        // this.chartData['2020-06-24 00:00:00'] = 300.16
                        // this.chartData['2020-06-24 00:12:00'] = 301.16
                        // this.chartData[obj.dt_txt] = obj.main.temp;
                    })
                    console.log(this.dayData)
                    console.log(this.chartData)
//                     this.chartData = {'2020-06-24 00:00:00': 300.16,
// '2020-06-24 03:00:00': 301.46,
// '2020-06-24 06:00:00': 302.63,
// '2020-06-24 09:00:00': 305.1,
// '2020-06-24 12:00:00': 304.75,
// '2020-06-24 15:00:00': 300.95,
// '2020-06-24 18:00:00': 299.75,}
                    // console.log(this.chartData)
                }

            })
        }
    }
</script>

<style scoped>
.weather-main-container{
    width: 92%;
    margin: 2% auto;
    -moz-box-shadow: 0 0 3px #ccc;
    -webkit-box-shadow: 0 0 3px #ccc;
    box-shadow: 0 0 10px #ccc;
    border-radius: 8px;
    padding-bottom: 1rem
}
.weather-container{
    padding: 0 3rem;
}
.weather-degree-container{
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
}
.weather-degree{
    font-weight: 500;
    font-size: 45px;
    margin: 0;
}
.weather-icon{
    width: 80px;
    height: 80px;
}
.day-forecast-container{
    display: flex;
    justify-content: space-between;
}
.time-degree{
    font-weight: bolder;
    font-size: 16px;
    margin: 0;
}
.time{
    color: rgb(144, 144, 144);
    font-size: 14px;
}
.pressure-humidity,
.sunrise-sunset{
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
}
.pressure-humidity{
    margin-top: 1rem;
}
.pressure-text,
.humidity-text,
.sun-text{
    font-weight: 500;
    font-size: 16px;
}
.humidity,
.pressure,
.sun-time{
    font-size: 14px;
}
.search-text{
    text-align: center;
    font-size: 14px;
    color: rgb(168, 167, 167);
    padding: 1rem 0;
}
@media(max-width: 320px){
    .weather-container{
        padding: 0 1rem;
    }
    .weather-degree{
        font-size: 35px;
    }
    .day-forecast-container{
        overflow-y: auto;
    }
    .time-temperature{
        text-align: center;
        flex: 0 0 20%;
        max-width: 20%;
    }
    .time{
        font-size: 12px !important;
    }
}
</style>
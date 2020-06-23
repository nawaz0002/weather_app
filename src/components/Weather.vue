<template>
    <div>
        <div class="weather-main-container" v-if="dataDetails">
        <div class="weather-container">
            <div class="weather-degree-container" v-if="dataDetails">
                <h2 class="weather-degree">{{(dataDetails.list[0].main.temp - 273).toFixed(2)}}&nbsp; &#8451;</h2>
                <img class="weather-icon" :src="'http://openweathermap.org/img/w/'+(dataDetails.list[0].weather[0].icon)+'.png'" alt="">
            </div>

            <line-chart :data="chartData" :library="chartOptions"></line-chart>

            <div class="day-forecast-container" v-if="dayData">
                <div class="time-temperature" v-for="(data, index) in dayData" :key="index">
                    <h5 class="time-degree">{{(data.main.temp - 273).toFixed()}}&nbsp; &#8451;</h5>
                    <p class="time">{{new Date(data.dt_txt).toLocaleString('en-US', { hour: 'numeric', hour12: true })}}</p>
                </div>
            </div>

            <div v-else class="search-text">Select day to see the details</div>
        
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
                chartData: {},
                chartOptions: {
                    height: "150px",
                    layout: {
                        padding: {left: 10, right: 5, top: 5, bottom: 2},
                    },
                    scales: {
                        xAxes: [{
                            display: false // this hides the x-axis
                        }],
                        yAxes: [{
                            display: false // this hides the x-axis
                        }]
                    }
                }       
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
                    console.log(this.dayData)
                    this.chartData = {}
                    this.dayData.map(obj => {
                        let tempData = obj.dt_txt.split(" ")[1];
                        let tempValue = (obj.main.temp- 273).toFixed();
                        let dataSent = {};
                        dataSent[tempData] = tempValue;
                        this.chartData = {...this.chartData, ...dataSent};
                    })                    
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
    padding-top: 2rem;
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
#chart-2{
    height: 135px !important;
    margin-top: -40px;
}
.chartjs-render-monitor{
    background: yellow !important;
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
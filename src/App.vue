<template>
  <div id="app">
    <Search />
    <Header :dataDetails="fiveDataData" :err="showErr"/>
    <Weather :dataDetails="weatherData" :err="showErr" />
  </div>
</template>

<script>
import Search from './components/Search.vue'
import Header from './components/Header.vue'
import Weather from './components/Weather.vue'
import myApi from './api/weather'
import geoLocationApi from './api/geolocation'
import { eventBus } from "@/eventBus";
export default {
  name: 'App',
  data() {
    return {
      weatherData: "",
      fiveDataData: [],
      cityName: '',
      showErr: ''
    }
  },
  components: {
    Weather,
    Header,
    Search
  },
  methods: {
    geoLocationData() {
        geoLocationApi.get()
            .then(response =>  {
                console.log(response.data)
                this.getWeatherData(response.data.city)
            })
    },
    getWeatherData(name) {
        // myApi.get(`?lat=${latitude}&lon=${longitude}&appid=32721fb6da25d6389d87de2ba3ec978a`)
        myApi.get(`?q=${name}&appid=32721fb6da25d6389d87de2ba3ec978a`)
        .then(response =>  {
          console.log(response.data)
            this.weatherData = response.data

            const seen = new Set();
            const arr = response.data.list
            const filteredArr = arr.filter(el => {
              const duplicate = seen.has(new Date(el.dt_txt).toString().split(' ')[0]);
              seen.add(new Date(el.dt_txt).toString().split(' ')[0]);
              return !duplicate;
            });
            this.fiveDataData = filteredArr
        })
        .catch(err => {
          this.fiveDataData = []
          this.weatherData = ''
          this.showErr = 'Incorrect city name';
          console.log(err)
        })
    },

  },
  mounted() {
      // console.log(navigator)
      this.geoLocationData();
  },
  created() {
    eventBus.$on('send-city' ,(name) => {
      console.log(name)
      if(name){
        this.getWeatherData(name)
      }
    })
  },
}
</script>

<style>
#app{
  font-family: sans-serif;
}
p{
  line-height: 0.4em !important;
}
.search-text{
    text-align: center;
    font-size: 14px;
    color: rgb(168, 167, 167);
    padding: 1rem 0;
}
</style>

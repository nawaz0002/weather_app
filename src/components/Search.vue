<template>
    <div class="search-container">
        <input type="text" id="autocomplete" v-model="searchCity" class="search-input" v-on:keyup.enter="onEnter" @keydown="showCities()">
        <img class="location-icon" src="../assets/location.png" alt="">
        <img class="search-icon" src="../assets/search.png" alt="" @click="onEnter">
    </div>
</template>

<script>
// import axios from 'axios';
import { eventBus } from "@/eventBus";
    export default {
        data() {
            return {
                searchCity: '',
                autocomplete: null,
            }
        },
        mounted() {
            

        },  
        methods: {
            onEnter(){
                console.log(this.searchCity)
                eventBus.$emit('send-city', this.searchCity)
                eventBus.$emit('show-daily-data', this.searchCity)
                
            },
            showCities(){
                
            }
        },
        computed: {
            
        },
    }
</script>

<style scoped>
    .search-container{
        position: relative;
        /* width: 100%; */
        padding: 1rem 1rem;
    }
    .search-input{
        padding-left:30px;
        margin-left:3%;
        width: 86%;
        padding: 0.8rem 2rem;
        border-radius: 8px;
        box-shadow: 0 0 10px #ccc;
        border: none;
        margin-top: 1rem;
        padding-left: 4rem;
        font-size: 16px;
        font-weight: 400;
    }
    .search-input:focus{
        outline: none;
    }
    .location-icon{
        width: 20px;
        height: 20px;
        position: absolute;
        top: 46px;
        left: 6%;
    }
    .search-icon{
        width: 22px;
        height: 22px;
        position: absolute;
        top: 46px;
        right: 5.5%;
        cursor: pointer;
    }
    @media(max-width: 320px){
        .search-container{
            padding: 1rem 0rem;
        }
        .search-input{
            margin-left: 0%;
            width: 75%;
            padding-left: 2.5rem;
        }
        .location-icon{
            left: 4%;
        }
    }
</style>
<template>
    EBEN DETAIL
</template>
  
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import {fetchCityWeatherForecast} from "../Services/cityService.ts"

export default defineComponent({
    setup(_props) {
        const route = useRoute()

        const fetchWeatherInfo = async () => {
            try {
            } catch (error) {
                console.error(error);
            }
        }

        const fetchWeatheForecastInfo = async () => {
            const coords = {
                lat: route.query.lat,
                lng: route.query.lng
            }
            try {
                const data = await fetchCityWeatherForecast(coords);
                console.log("fetchCityWeatherForecast => ", data)
            } catch (error) {
                console.error(error);
            }
        }

        onMounted(() => {
            fetchWeatherInfo()
            fetchWeatheForecastInfo()
        })
    },
});
</script>
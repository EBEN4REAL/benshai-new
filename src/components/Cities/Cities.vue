<template>
    <div>
        <div class="cities-container" v-if="filteredCities.length > 0">
            <div v-for="(city, i) in filteredCities" :key="`${city.name}-${i}`" class="city"
                :style="{ backgroundImage: `url(${city.image})` }">
                <router-link :to="`/city/${city.name}?lat=${city.coords.lat}&lng=${city.coords.lng}`">
                    <p style="color: white">
                        {{ city.distance }}
                    </p>
                    <p>{{ city.name }} {{ city.continent }}</p>
                    <p>{{ city.country }}</p>
                    <p>{{ truncateString(city.description, 100) }}</p>
                </router-link>

                <div class="overlay"></div>
            </div>
        </div>
        <div v-else>
            No cities found
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import { ICity } from "../../types"
import { useCityStore } from "../../store/CityStore.ts"
import { storeToRefs } from 'pinia'
import { truncateString } from "../../utils/truncateString"
import { fetchCityWeatherData } from "../../Services/cityService.ts"

export default defineComponent({
    props: {
        filteredCities: Array<ICity>,
        placeholder: String,
        value: String
    },
    setup() {
        const cityStore = useCityStore()
        const { updateCities } = cityStore
        const { filteredCities, temperature } = storeToRefs(cityStore);

        async function fetchCityWeatherInfo(coords: {
            [x: string]: number; latitude: number, longitude: number
        }) {
            const cities = [...filteredCities.value]

            try {
                const data = await fetchCityWeatherData(coords, temperature.value);

                cities.forEach(city => {
                    if (city.coords.lat === coords.lat && coords.lng === city.coords.lng) {
                        city.temp = data.main.temp
                    }
                })

                updateCities(cities)
                
            } catch (error) {
                console.error(error);
            }
        }

        watch(temperature, () => {
            updateCitiesTemperature()
        })

        const updateCitiesTemperature = () => {
            for (const city of filteredCities.value) {
                fetchCityWeatherInfo(city.coords);
            }
        }

        onMounted(() => {
            updateCitiesTemperature()
        });

        return {
            filteredCities,
            truncateString
        };
    },
});
</script>

<style scoped>
.cities-container {
    display: flex;
    gap: 1rem;
    flex-flow: row wrap;
}

.cities-container .city {
    width: 219px;
    height: 266px;
    border-radius: 5px;
    padding: 5px;
    border: 1px solid;
    position: relative;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
}
</style>
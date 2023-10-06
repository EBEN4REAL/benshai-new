import { defineStore } from "pinia";
import { cities } from "./../constants";
import { ref, computed } from "vue";
import { ICity, IWeatherResponse } from "./../types";

export const useCityStore = defineStore("city", () => {
  const citiesList = ref<ICity[]>(cities);
  const search = ref<string>("");
  const selectedContinent = ref<string>("");
  const temperature = ref<string>("Standard")

  const calculateDistanceInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const earthRadius = 6371;

    /*convert latitude and longitude from degrees to radians*/
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;

    const dlat = lat2Rad - lat1Rad;
    const dlon = lon2Rad - lon1Rad;
    const a =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(dlon / 2) *
        Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  };

  const updatesCityDistance = (city: ICity) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const myLatitude: number = position.coords.latitude;
          const myLongitude: number = position.coords.longitude;
          const cityDistance = calculateDistanceInKm(
            myLatitude,
            myLongitude,
            city.coords.lat,
            city.coords.lng
          );
          city.distance = cityDistance;
        },
        (error: GeolocationPositionError) => {
          console.error(`${Error} getting geolocation: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  };

  citiesList.value
    .filter((city) => city.active)
    .forEach((city) => {
      updatesCityDistance(city);
    });

  const continents = citiesList.value.reduce(
    (continents: { label: string; value: string }[], city: ICity) => {
      if (
        continents.findIndex(
          (continent) => continent.value === city.continent
        ) === -1
      ) {
        continents.push({
          label: city.continent,
          value: city.continent,
        });
      }
      return continents;
    },
    []
  );

  continents.unshift({ label: "All cities", value: "All cities" });

  const updateSearch = (value: string) => {
    search.value = value;
  };

  const updateSelectedContinent = (value: string) => {
    selectedContinent.value = value;
  };

  const updateCities = (cities: ICity[]) => {
    citiesList.value = cities
  }

  const sortCity = (sortLabel) => {
    citiesList.value.sort((firstCity, secondCity) =>
      firstCity[sortLabel] > secondCity[sortLabel] ? 1 : -1
    );
  };

  const filteredCities = computed(() => {
    const continentFilterParam =
      selectedContinent.value === "All cities" ? "" : selectedContinent.value;
    const searchValue = search.value.toLowerCase();

    if (continentFilterParam) {
      return citiesList.value.filter(
        (city) =>
          (city.name.toLowerCase().includes(searchValue) ||
            city.country.toLowerCase().includes(searchValue)) &&
          city.active &&
          city.continent.includes(continentFilterParam)
      );
    }

    return citiesList.value.filter(
      (city) =>
        (city.name.toLowerCase().includes(searchValue) ||
          city.country.toLowerCase().includes(searchValue)) &&
        city.active
    );
  });
  
  const changeTemperature = (label: string) => {
    temperature.value = label
  }

  return {
    filteredCities,
    continents,
    search,
    selectedContinent,
    temperature,
    updateSearch,
    updateSelectedContinent,
    sortCity,
    updateCities,
    changeTemperature
  };
});

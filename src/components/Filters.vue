<template>
  <div class="filters-wrapper">
    <div>
      <SelectInput :options="continents" v-model="selectedContinent" />
    </div>
    <div>
      <Input v-model="search" placeholder="search city..." type="text" />
    </div>
    <div>
      <p @click="sortCity('name')">Name</p>
      <p @click="sortCity('distance')">Distance</p>
    </div>
    <p @click="changeTemperature('metric')">C</p>
    <p @click="changeTemperature('imperial')">F</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import SelectInput from './SelectInput/SelectInput.vue';
import Input from './Input/Input.vue';
import { useCityStore } from "../store/CityStore"

export default defineComponent({
  components: {
    SelectInput,
    Input
  },
  setup() {
    const { continents, updateSelectedContinent, updateSearch, sortCity, changeTemperature } = useCityStore()
    const search = ref('');
    const selectedContinent = ref("");
    const isDisabled = ref(false);

    watch(selectedContinent, (continent) => {
      updateSelectedContinent(continent)
    })

    watch(search, (value) => {
      updateSearch(value)
    })

    return {
      search,
      selectedContinent,
      isDisabled,
      continents,
      sortCity,
      changeTemperature
    };
  },
});
</script>

<style scoped>
.filters-wrapper {
  display: flex;
  gap: 5px;
}
</style>
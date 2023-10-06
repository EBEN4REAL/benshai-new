<template>
    <select v-model="selectedOption" @change="handleChange">
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        options: {
            type: Array as () => Array<{ label: string; value: any }>,
            required: true,
        },
        value: {
            type: [String],
            default: '',
        },
    },
    setup(props, { emit }) {
        const {value, options} = props
        const selectedOption = ref(value);
        selectedOption.value = options[0].value

        function handleChange(event: Event) {
            const selectedValue = (event.target as HTMLSelectElement).value;
            selectedOption.value = selectedValue;
            emit('update:value', selectedValue);
        }

        return {
            selectedOption,
            handleChange,
        };
    },
});
</script>
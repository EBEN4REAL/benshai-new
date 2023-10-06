<template>
  <input v-model="inputValue" :placeholder="placeholder" @input="onInput" :type="type" id="el-input" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    value: String,
    placeholder: String,
    type: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref(props.value);

    const onInput = (event: Event) => {
      const newValue = (event.target as HTMLInputElement).value;
      inputValue.value = newValue;
      emit('update:modelValue', newValue);
    };

    return {
      inputValue,
      onInput,
    };
  },
});
</script>
<template>
  <v-autocomplete v-model="autocomplete" v-bind="$attrs" outlined />
</template>

<script>
export default {
  name: 'Autocomplete',

  props: {
    value: {
      type: Array,
      required: true,
    },
  },

  computed: {
    autocomplete: {
      get() {
        return this.value;
      },
      set(items) {
        this.$emit('input', items);
      },
    },
  },
};
</script>

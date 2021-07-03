<template>
  <v-snackbar
    v-model="snackbar.open"
    :color="snackbar.color"
    :timeout="snackbar.timeout || 3000"
    top
    right
  >
    {{ snackbar.message }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',

  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  computed: {
    snackbar: {
      get() {
        return this.value;
      },
      set(snackbar) {
        this.$emit('input', snackbar);
      },
    },
  },
};
</script>

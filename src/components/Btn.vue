<template>
  <v-btn v-bind="$attrs" v-on="$listeners" outlined :color="color">
    <v-icon left>{{ icon }}</v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: 'Btn',

  props: {
    color: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

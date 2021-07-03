<template>
  <v-card>
    <v-app-bar color="accent" flat>
      <v-icon v-if="icon" left color="grey--text text--darken-2">
        {{ icon }}
      </v-icon>

      <v-toolbar-title class="grey--text text--darken-2" :title="title">
        {{ title }}
      </v-toolbar-title>
    </v-app-bar>

    <v-list>
      <v-list-item v-for="option in actions" :key="option.to" :to="option.to">
        <v-list-item-icon>
          <v-icon color="primary">{{ option.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ option.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },

    actions: {
      type: Array[Object],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
  },
};
</script>

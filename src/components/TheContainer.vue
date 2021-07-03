<template>
  <v-container>
    <v-card outlined>
      <v-card-title class="accent--text">
        <v-icon color="accent"> mdi-chevron-right </v-icon>
        {{ $route.name }}
      </v-card-title>

      <v-divider class="mx-5" />

      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'TheContainer',
};
</script>

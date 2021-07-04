<template>
  <v-app>
    <TheAppbar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheAppbar from '@/components/TheAppbar';

export default {
  name: 'App',

  components: {
    TheAppbar,
  },
};
</script>

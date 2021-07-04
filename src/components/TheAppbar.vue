<template>
  <v-app-bar app flat color="primary">
    <v-toolbar-title>
      <logo />
    </v-toolbar-title>

    <v-spacer />

    <v-btn icon color="white">
      <v-icon> mdi-logout-variant </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import Logo from '@/components/Logo';

export default {
  name: 'TheAppbar',

  components: {
    Logo,
  },
};
</script>

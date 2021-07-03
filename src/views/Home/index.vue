<template>
  <v-row>
    <v-col v-for="{ title, icon, actions } in menus" :key="title" cols="12" md="6">
      <home-menu :title="title" :icon="icon" :actions="actions" />
    </v-col>
  </v-row>
</template>

<script>
import HomeMenu from './components/Menu';

export default {
  name: 'Home',
  components: {
    HomeMenu,
  },
  data: () => ({
    menus: [
      {
        title: 'Times de Futebol',
        icon: 'mdi-soccer',
        actions: [
          {
            title: 'Cadastrar um novo clube',
            to: '/teams/new',
            icon: 'mdi-plus',
          },
          {
            title: 'Ver clubes cadastrados',
            to: '/teams',
            icon: 'mdi-clipboard-list',
          },
        ],
      },
      {
        title: 'Sócios',
        icon: 'mdi-account-tie',
        actions: [
          {
            title: 'Cadastrar um novo sócio',
            to: '/partners/new',
            icon: 'mdi-account-plus',
          },
          {
            title: 'Ver sócios cadastrados',
            to: '/partners',
            icon: 'mdi-account-group',
          },
        ],
      },
    ],
  }),
};
</script>

<template>
  <the-container>
    <v-row>
      <v-col cols="12">
        <text-input
          v-model="filter"
          label="Filtro"
          placeholder="Digite o nome do sócio que você deseja encontrar"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-app-bar flat color="accent">
          <v-toolbar-title class="grey--text text--darken-2"> Sócios </v-toolbar-title>
        </v-app-bar>
        <v-list two-line color="transparent">
          <v-list-item v-if="loading">
            <v-list-item-content> Buscando os sócios cadastrados... </v-list-item-content>
          </v-list-item>

          <template
            v-else-if="filteredPartners.length"
            v-for="(partner, index) in filteredPartners"
          >
            <v-divider v-if="index" :key="partner.id" />
            <v-list-item :key="partner.id">
              <v-list-item-content>
                <v-list-item-title>
                  {{ partner.name }}
                </v-list-item-title>

                <v-list-item-subtitle class="text-caption">
                  {{ partner.teams.map((team) => team.name).join(', ') }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-tooltip top>
                  <template #activator="{ on }">
                    <v-icon
                      v-on="on"
                      color="red"
                      @click.prevent="(partnerToDelete = partner), (dialog = true)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                  Remover Sócio
                </v-tooltip>
              </v-list-item-action>
            </v-list-item>
          </template>

          <v-list-item v-else>
            <v-list-item-content> Nenhum sócio cadastrado. </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <app-dialog
      v-model="dialog"
      actions
      title="Excluir Sócio"
      :content="
        partnerToDelete &&
        `Tem certeza que deseja remover o sócio ${partnerToDelete.name}? Essa ação não poderá ser desfeita`
      "
      @cancel="(partnerToDelete = null), (dialog = false)"
      @confirm="deletePartner(partnerToDelete)"
    />

    <snackbar v-model="snackbarOptions" />
  </the-container>
</template>

<script>
import AppDialog from '@/components/Dialog';
import Snackbar from '@/components/Snackbar';
import TextInput from '@/components/TextInput';
import TheContainer from '@/components/TheContainer.vue';

export default {
  name: 'Partners',
  components: {
    AppDialog,
    Snackbar,
    TextInput,
    TheContainer,
  },

  // temporary until the api is ready
  mounted() {
    this.fakeApiCall();
  },

  data: () => ({
    dialog: false,
    filter: '',
    loading: true,
    snackbarOptions: {
      open: false,
      message: '',
      color: '',
    },
    teams: [
      {
        id: 1,
        name: 'Flamengo',
      },
      {
        id: 2,
        name: 'Palmeiras',
      },
      {
        id: 3,
        name: 'Botafogo',
      },
      {
        id: 4,
        name: 'Corinthians',
      },
      {
        id: 5,
        name: 'Fluminense',
      },
      {
        id: 6,
        name: 'São Paulo',
      },
      {
        id: 7,
        name: 'Internacional',
      },
      {
        id: 8,
        name: 'Grêmio',
      },
      {
        id: 9,
        name: 'Santos',
      },
      {
        id: 10,
        name: 'Sport Recife',
      },
      {
        id: 11,
        name: 'Chapecoense',
      },
      {
        id: 12,
        name: 'Barcelona',
      },
    ],
    partners: [],
    partnerToDelete: null,
  }),

  computed: {
    filteredPartners() {
      return this.filter
        ? this.partners.filter((partner) =>
            partner.name.toLowerCase().includes(this.filter.toLowerCase())
          )
        : this.partners;
    },
  },

  methods: {
    /*
     * temporary until the api is ready
     */
    sortTeams() {
      const teamsQuantity = Number.parseInt(Math.random() * this.teams.length, 10) || 1;

      const teams = [];

      for (let team = 0; team < teamsQuantity; team += 1) {
        const index = Number.parseInt(Math.random() * (teamsQuantity - 1), 10);

        teams.push(this.teams[index]);
      }

      return teams;
    },

    fakeApiCall() {
      this.partners = [
        {
          name: 'Matheus Pedroni',
          teams: this.sortTeams(),
        },
        {
          name: 'Elon Musk',
          teams: this.sortTeams(),
        },
        {
          name: 'Harry Potter',
          teams: this.sortTeams(),
        },
        {
          name: 'Albus Percival Wulfric Brian Dumbledore',
          teams: this.sortTeams(),
        },
        {
          name: 'Severus Snape',
          teams: this.sortTeams(),
        },
        {
          name: 'Hermione Granger',
          teams: this.sortTeams(),
        },
        {
          name: 'Ronald Weasley',
          teams: this.sortTeams(),
        },
        {
          name: 'Bill Gates',
          teams: this.sortTeams(),
        },
        {
          name: 'Steve Jobs',
          teams: this.sortTeams(),
        },
        {
          name: 'Poderosíssimo Ninja',
          teams: this.sortTeams(),
        },
      ];

      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
    /* ****** */

    deletePartner(partner) {
      this.loading = true;
      this.dialog = false;

      this.$http
        .delete(`teams/${partner.id}`)
        .then(() => this.snackbar(`O sócio ${partner.name} foi excluído com sucesso!`, 'success'))
        .catch((error) => this.snackbar(error, 'error'))
        .finally(() => {
          this.loading = false;
        });
    },
    snackbar(message, color) {
      this.snackbarOptions = {
        message,
        color,
        open: true,
      };
    },
  },
};
</script>

<template>
  <the-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-data-table
          class="transparent"
          :headers="headers"
          :hide-default-footer="!teams.length"
          :items="mapTeams"
          :loading="loading"
          no-data-text="Nenhum clube cadastrado"
        >
          <template #[`item.actions`]="{ item: team }">
            <v-tooltip top>
              <template #activator="{ on }">
                <v-icon v-on="on" color="red" @click="(teamToDelete = team), (dialog = true)">
                  mdi-delete
                </v-icon>
              </template>
              Excluir Clube
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <app-dialog
      v-model="dialog"
      actions
      title="Excluir Clube"
      :content="
        teamToDelete &&
        `Tem certeza que deseja excluir o clube ${teamToDelete.name}? Essa ação não poderá ser desfeita`
      "
      @cancel="(teamToDelete = null), (dialog = false)"
      @confirm="deleteTeam(teamToDelete)"
    />

    <snackbar v-model="snackbarOptions" />
  </the-container>
</template>

<script>
import AppDialog from '@/components/Dialog';
import Snackbar from '@/components/Snackbar';
import TheContainer from '@/components/TheContainer.vue';

export default {
  name: 'Teams',
  components: {
    AppDialog,
    Snackbar,
    TheContainer,
  },

  mounted() {
    this.getTeams();
  },

  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Nº',
        value: 'index',
      },
      {
        text: 'Nome',
        value: 'name',
        align: 'center',
      },
      {
        text: '',
        value: 'actions',
        align: 'center',
        sortable: false,
      },
    ],
    loading: false,
    snackbarOptions: {
      open: false,
      message: '',
      color: '',
    },
    teams: [],
    teamToDelete: null,
  }),

  computed: {
    mapTeams() {
      return this.teams.map((team, index) => ({ ...team, index: index + 1 }));
    },
  },

  methods: {
    deleteTeam(team) {
      this.loading = true;
      this.dialog = false;

      this.$http
        .delete(`teams/${team.id}`)
        .then((teams) => {
          this.teams = teams;
          this.snackbar(`O clube ${team.name} foi excluído com sucesso!`, 'success');
        })
        .catch((error) => this.snackbar(error, 'error'))
        .finally(() => {
          this.loading = false;
        });
    },
    async getTeams() {
      this.loading = true;

      this.teams = await this.$http
        .get('teams')
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

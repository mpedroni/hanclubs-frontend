<template>
  <the-container>
    <v-row>
      <v-col cols="12" md="6">
        <text-input
          v-model="filterByPartner"
          label="Filtrar por Sócio"
          placeholder="Digite o nome do sócio que você deseja encontrar"
        />
      </v-col>
      <v-col cols="12" md="6">
        <text-input
          v-model="filterByTeam"
          label="Filtrar por Clube"
          placeholder="Digite o nome do clube que você deseja encontrar"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-list v-if="loading || !teamPartners.length" two-line color="transparent" subheader>
          <v-list-item>
            <v-list-item-content>
              {{ loading ? 'Buscando os sócios cadastrados...' : 'Nenhum sócio cadastrado.' }}
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list
          v-else
          v-for="team in filteredTeamPartners"
          :key="team.id"
          color="transparent"
          dense
        >
          <span class="text-h6">{{ team.name }}</span>
          <v-subheader v-if="team.partners.length">Sócios</v-subheader>

          <v-list-item v-for="partner in team.partners" :key="partner.id" link>
            <v-list-item-content>
              <v-list-item-title>
                {{ partner.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="red" @click="(partnerToDelete = partner), (dialog = true)">
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item v-if="!team.partners.length">
            <v-list-item-content>
              Nenhum sócio está associado ao clube {{ team.name }}
            </v-list-item-content>
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

  mounted() {
    this.getTeamPartners();
  },

  data: () => ({
    dialog: false,
    filterByPartner: '',
    filterByTeam: '',
    loading: true,
    snackbarOptions: {
      open: false,
      message: '',
      color: '',
    },
    teamPartners: [],
    partnerToDelete: null,
  }),

  computed: {
    filteredTeamPartners() {
      return this.filterByPartner || this.filterByTeam
        ? this.teamPartners.reduce((teams, team) => {
            if (this.filterByTeam && !team.name.toLowerCase().includes(this.filterByTeam))
              return teams;

            const partners = this.filterByPartner
              ? team.partners.filter((partner) =>
                  partner.name.toLowerCase().includes(this.filterByPartner.toLowerCase())
                )
              : team.partners;

            if (this.filterByPartner && !partners.length) return teams;

            return [...teams, { ...team, partners }];
          }, [])
        : this.teamPartners;
    },
  },

  methods: {
    deletePartner(partner) {
      this.loading = true;
      this.dialog = false;

      this.$http
        .delete(`partners/${partner.id}`)
        .then(() => {
          this.snackbar(`O sócio ${partner.name} foi excluído com sucesso!`, 'success');
          this.getTeamPartners();
        })
        .catch((error) => {
          this.snackbar(error, 'error');
          this.loading = false;
        });
    },
    async getTeamPartners() {
      this.teamPartners =
        (await this.$http
          .get('teams-partners')
          .catch((error) => this.snackbar(error, 'error'))
          .finally(() => {
            this.loading = false;
          })) || [];
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

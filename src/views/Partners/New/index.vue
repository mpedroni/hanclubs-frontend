<template>
  <the-container>
    <v-form v-model="valid" ref="form" @submit.prevent="submit" lazy-validation>
      <v-row>
        <v-col cols="12" md="6">
          <text-input
            v-model="partner.name"
            label="Nome Completo"
            clearable
            :rules="[(v) => !!v || 'Você precisa informar o nome do novo sócio']"
          />
        </v-col>

        <v-col>
          <autocomplete
            v-model="partner.teams"
            multiple
            chips
            small-chips
            deletable-chips
            no-data-text="Nenhum clube encontrado"
            clearable
            hint="Selecione todos os clubes associados"
            persistent-hint
            label="Clubes"
            hide-selected
            :rules="[(v) => !!v.length || 'Você deve selecionar pelo menos um clube']"
            return-object
            item-text="name"
            :items="teams"
          />
        </v-col>
      </v-row>

      <v-row justify="end">
        <v-col cols="auto">
          <btn
            label="Cadastrar"
            icon="mdi-content-save"
            type="submit"
            :disabled="!valid"
            :loading="loading"
          />
        </v-col>
      </v-row>
    </v-form>
    <snackbar v-model="snackbarOptions" />
  </the-container>
</template>

<script>
import Autocomplete from '@/components/Autocomplete';
import Btn from '@/components/Btn';
import Snackbar from '@/components/Snackbar';
import TextInput from '@/components/TextInput';
import TheContainer from '@/components/TheContainer';

export default {
  name: 'NewPartner',

  components: {
    Autocomplete,
    Btn,
    Snackbar,
    TextInput,
    TheContainer,
  },

  mounted() {
    this.getTeams();
  },

  data: () => ({
    loading: false,
    partner: {
      name: '',
      teams: [],
    },
    snackbarOptions: {
      open: false,
      message: '',
      color: '',
    },
    teams: [],
    valid: true,
  }),

  methods: {
    async getTeams() {
      this.teams =
        (await this.$http.get('teams').catch((error) => this.snackbar(error, 'error'))) || [];
    },

    snackbar(message, color) {
      this.snackbarOptions = {
        message,
        color,
        open: true,
      };
    },

    submit() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;

      const { partner } = this;

      this.$http
        .post('partners', partner)
        .then((partner) => {
          this.snackbar(`O sócio ${partner.name} foi cadastrado com sucesso!`, 'success');
          this.$refs.form.reset();
        })
        .catch((error) => this.snackbar(error, 'error'))
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

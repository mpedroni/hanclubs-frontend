<template>
  <the-container>
    <v-form v-model="valid" ref="form" @submit.prevent="submit" lazy-validation>
      <v-row>
        <v-col cols="12" md="6">
          <text-input
            v-model="name"
            label="Nome Completo"
            clearable
            :rules="[(v) => !!v || 'Você precisa informar o nome do novo sócio']"
          />
        </v-col>

        <v-col>
          <autocomplete
            v-model="partnerTeams"
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
            item-value="id"
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

  data: () => ({
    loading: false,
    name: '',
    partnerTeams: [],
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
    valid: true,
  }),

  methods: {
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

      const { name, partnerTeams: teams } = this;

      this.$http
        .post('partners', { name: name.trim(), teams })
        .then(() => {
          this.snackbar(`O sócio ${name} foi cadastrado com sucesso!`, 'success');
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

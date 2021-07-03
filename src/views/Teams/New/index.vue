<template>
  <the-container>
    <v-form v-model="valid" ref="form" @submit="submit" lazy-validation>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <text-input
            v-model="name"
            label="Nome do Clube"
            clearable
            :rules="[(v) => !!v || 'Você precisa definir um nome para o clube']"
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
import Btn from '@/components/Btn';
import Snackbar from '@/components/Snackbar';
import TextInput from '@/components/TextInput';
import TheContainer from '@/components/TheContainer';

export default {
  name: 'NewTeam',

  components: {
    Btn,
    Snackbar,
    TextInput,
    TheContainer,
  },

  data: () => ({
    loading: false,
    name: '',
    snackbarOptions: {
      open: false,
      message: '',
      color: '',
    },
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

      const { name } = this;

      this.$http
        .post('teams', { name })
        .then(() => {
          this.snackbar(`O clube ${name} foi cadastrado com sucesso!`, 'success');
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

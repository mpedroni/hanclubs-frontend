<template>
  <v-dialog
    v-model="dialog"
    v-bind="$attrs"
    :width="width"
    :persistent="persistent"
    @click:outside="!persistent && $emit('cancel')"
  >
    <v-card>
      <v-app-bar v-if="title" flat color="accent" dense>
        <v-toolbar-title class="text-weight-medium grey--text text--darken-2">
          {{ title }}
        </v-toolbar-title>
      </v-app-bar>

      <v-card-text v-if="content" class="mt-2">
        {{ content }}
      </v-card-text>

      <v-card-actions v-if="actions">
        <v-spacer />

        <v-btn text color="primary" @click="$emit('confirm')">
          {{ confirmMessage }}
        </v-btn>

        <v-btn text color="primary" @click="$emit('cancel')">
          {{ cancelMessage }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',

  props: {
    actions: {
      type: Boolean,
      default: false,
    },
    cancelMessage: {
      type: String,
      default: 'Não',
    },
    confirmMessage: {
      type: String,
      default: 'Sim',
    },
    content: {
      type: String,
      default: '',
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      required: true,
    },
    width: {
      type: [Number, String],
      default: 700,
    },
  },

  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(status) {
        this.$emit('input', status);
      },
    },
  },
};
</script>

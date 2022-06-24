<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary lighten-2" dark v-bind="attrs" v-on="on">
        New
      </v-btn>
    </template>

    <v-card>
      <form @submit.prevent="save" class="pa-4">
        <v-text-field
          outlined
          name="email"
          label="email"
          required
          v-model="admin.email"
        ></v-text-field>

        <v-text-field
          outlined
          name="phone"
          label="phone"
          required
          v-model="admin.phone"
        ></v-text-field>

        <v-text-field
          outlined
          name="userName"
          label="userName"
          required
          v-model="admin.userName"
        ></v-text-field>

        <v-text-field
          outlined
          name="password"
          label="password"
          required
          v-model="admin.password"
        ></v-text-field>

        <v-text-field
          outlined
          name="confirmPassword"
          label="confirmPassword"
          required
          v-model="admin.confirmPassword"
        ></v-text-field>

        <v-divider></v-divider>
        <v-card-actions class="d-flex">
          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            type="submit"
            color="primary"
            width="200"
            height="50"
            class="mr-3"
          >
            save
          </v-btn>

          <div class="red--text font-weight-bold" v-if="status == 'ERROR'">
            {{ message }}
          </div>

          <div class="green--text font-weight-bold" v-else>
            {{ message }}
          </div>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      admin: {
        email: '',
        phone: '',
        userName: '',
        password: '',
        confirmPassword: '',
      },
      isLoading: false,
      status: '',
      message: '',
    }
  },

  watch: {
    dialog(status) {
      if (status == false) {
        this.status = ''
        this.message = ''
        this.admin = {
          email: '',
          phone: '',
          userName: '',
          password: '',
          confirmPassword: '',
        }
      }
    },
  },

  methods: {
    async save() {
      this.isLoading = true

      try {
        await this.$axios.post('/auth/register', this.admin)

        this.$nuxt.$emit('getUser')
        this.status = 'OK'
        this.message = 'Success'
        this.dialog = false
      } catch (error) {
        this.status = 'ERROR'
        this.message = 'Something went wrong'
      }

      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
  },
}
</script>

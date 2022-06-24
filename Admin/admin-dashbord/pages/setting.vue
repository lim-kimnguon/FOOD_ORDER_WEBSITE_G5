<template>
  <div>
    <form class="pa-10" @submit.prevent="update">
      <div class="d-flex justify-space-between align-center">
        <h1>Setting</h1>
      </div>
      <v-row>
        <v-col>
          <v-text-field
            label="User Name"
            v-model="user.userName"
            outlined
          ></v-text-field>
          <v-text-field
            label="My Email"
            v-model="user.email"
            outlined
          ></v-text-field>
          <v-text-field
            label="My Password"
            v-model="user.password"
            outlined
            type="password"
          ></v-text-field>
        </v-col>
        <v-col class="text-center">
          <h4>Update Profile Picture</h4>
          <v-avatar class="mt-4" size="200">
            <v-img src="/images/pic.png"></v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        userName: '',
        email: '',
        password: '',
      },
      isLoading: false,
    }
  },

  methods: {
    update() {
      this.isLoading = true
      this.$axios.post(`/auth/user/update`, this.user).then((res) => {
        console.log('update', res.data)

        setTimeout(() => {
          this.isLoading = false
          this.getUser()
        }, 2000)
      })
    },

    getUser() {
      this.$axios.get('/auth/me').then((res) => {
        console.log('user', res.data)
        const { userName, email, password } = res.data.data
        this.user = {
          userName: userName,
          email: email,
          password: password,
        }
      })
    },
  },

  created() {
    this.getUser()
  },
}
</script>

<style lang="scss" scoped></style>

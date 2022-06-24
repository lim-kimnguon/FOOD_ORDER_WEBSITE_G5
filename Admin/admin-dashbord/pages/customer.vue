<template>
  <v-data-table
    :headers="headers"
    :items="user"
    sort-by="_id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Customer CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template #[`item.thumbnail`]="{ item }">
      <img width="100" :src="item.thumbnail" :alt="item.name" />
    </template>
    <template #[`item.actions`]="{ item }">
      <Delete :id="item._id" />
    </template>
  </v-data-table>
</template>

<script>
import Add from '~/components/Customer/Add.vue'
import Delete from '~/components/Customer/Delete.vue'

export default {
  components: {
    Add,
    Delete,
  },
  data: () => ({
    user: [],
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: '_id',
      },
      { text: 'userName', value: 'userName' },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'phone' },
      { text: 'Address', value: 'address' },
      { text: 'Actions', value: 'actions' },
    ],
  }),
  created() {
    this.get()
    this.$nuxt.$on('getUser', () => {
      this.get()
    })
  },

  beforeDestroy() {
    this.$nuxt.$off('getUser')
  },

  methods: {
    get() {
      this.$axios.get('/auth/users/all').then((res) => {
        console.log('users', res.data)
        let all_user = []
        all_user = JSON.parse(JSON.stringify(res.data.data.docs))
        let customer = []
        for (let i = 0; i < all_user.length; i++) {
          if (all_user[i].role == 'customer') {
            customer.push(all_user[i])
          }
        }
        this.user = customer
      })
    },
  },
}
</script>

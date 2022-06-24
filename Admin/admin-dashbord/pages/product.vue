<template>
  <v-data-table
    :headers="headers"
    :items="products"
    sort-by="_id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Product CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <Add />
      </v-toolbar>
    </template>
    <template #[`item.imageUrl`]="{ item }">
      <img width="100" :src="item.imageUrl" :alt="item.name" />
    </template>

    <template #[`item.actions`]="{ item }">
      <Edit :id="item._id" />
      <Delete :id="item._id" />
    </template>
  </v-data-table>
</template>

<script>
import Add from '~/components/Product/Add.vue'
import Delete from '~/components/Product/Delete.vue'
import Edit from '~/components/Product/Edit.vue'
export default {
  data: () => ({
    products: [],
    headers: [
      {
        text: 'Thumbnail',
        align: 'start',
        sortable: false,
        value: 'imageUrl',
      },
      { text: 'Name', value: 'name' },
      { text: 'Category', value: 'category.name' },
      { text: 'Price', value: 'price' },
      { text: 'Description', value: 'description' },
      { text: 'Actions', value: 'actions' },
    ],
  }),
  created() {
    this.get()
    this.$nuxt.$on('getProduct', () => {
      this.get()
    })
  },

  beforeDestroy() {
    this.$nuxt.$off('getProduct')
  },

  methods: {
    get() {
      this.$axios.get('/product/all_populate').then((res) => {
        console.log('products', res.data.data)
        this.products = res.data.data
      })
    },
  },
  components: { Add, Delete, Edit },
}
</script>

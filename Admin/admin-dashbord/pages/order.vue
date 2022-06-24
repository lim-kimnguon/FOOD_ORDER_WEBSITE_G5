<template>
  <v-data-table
    :headers="headers"
    :items="orders"
    sort-by="_id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Order CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template #[`item.imageUrl`]="{ item }">
      <img width="100" :src="item.imageUrl" :alt="item.name" />
    </template>

    <template #[`item.items`]="{ item }">
        <div v-for="(i,index) in item.items" :key="index">
            {{ i.item.name }} - {{  i.qty }}pcs
            
        </div>
    </template>

    <template #[`item.actions`]="{ item }">
        <v-btn @click="confirmOrder(item)">
            <v-icon>mdi-check</v-icon>
        </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    orders: [],
    headers: [
      {
        text: 'customerId',
        align: 'start',
        sortable: false,
        value: 'customerId',
      },
      { text: 'items', value: 'items' },
      { text: 'address', value: 'address' },
      { text: 'paymentType', value: 'paymentType' },
      { text: 'status', value: 'status' },
      { text: 'Actions', value: 'actions' },
    ],
  }),
  created() {
    this.get()
    this.$nuxt.$on('getOrder', () => {
      this.get()
    })
  },

  beforeDestroy() {
    this.$nuxt.$off('getOrder')
  },

  methods: {
    get() {
      this.$axios.get('/order/all').then((res) => {
        console.log('order', res.data.data)
        let all_orders = res.data.data

        for(let i=0; i<all_orders.length; i++){
            all_orders[i].items = JSON.parse(all_orders[i].items)
        }
        
        this.orders = all_orders
        console.log('item', this.orders)
      })
    },

    confirmOrder(item){
        this.$axios.post('/order/change', {
            id: item._id,
            status: "order_completed"
        }).then(() => {
            this.get()
        })
    }
  },
}
</script>

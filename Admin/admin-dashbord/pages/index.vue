<template>
  <div>
    <div>
      <h1>Overview</h1>
    </div>

    <v-row>
      <v-col v-for="(item, index) in overview" :key="index">
        <v-sheet
          rounded="xl"
          class="pa-4 d-flex align-center justify-space-between"
        >
          <div class="d-flex align-center">
            <v-icon color="primary" class="mr-2">{{ item.icon }}</v-icon>
            <h4 class="font-weight-light">{{ item.title }}</h4>
          </div>
          <h4 class="font-weight-medium">{{ item.value }}</h4>
        </v-sheet>
      </v-col>
    </v-row>

    <TheChart />
  </div>
</template>

<script>
export default {
  data() {
    return {
      overview: [
        {
          title: 'Products',
          icon: 'mdi-food',
          value: '10',
        },
        {
          title: 'Customer',
          icon: 'mdi-account',
          value: '10',
        },
        {
          title: 'Order',
          icon: 'mdi-cart',
          value: '10',
        },
        // {
        //   title: 'Income',
        //   icon: 'mdi-cash',
        //   value: '10',
        // },
      ],
    }
  },

  created() {
    this.$axios.get('/product/all').then((res) => {
      console.log('products', res.data)
      this.overview[0].value = res.data.data.totalDocs
    })

    this.$axios.get('/auth/users/all?role=customer').then((res) => {
      console.log('users', res.data)
      this.overview[1].value = res.data.data.totalDocs
    })
  },
}
</script>

<style lang="scss" scoped></style>

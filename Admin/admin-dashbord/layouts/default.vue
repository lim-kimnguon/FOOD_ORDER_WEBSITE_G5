<template>
  <v-app dark >
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      width="150"
    >
      <v-sheet >
        <div class="text-center red--text mt-4 mb-4">
          <h2>Turbo</h2>
        </div>

        <v-hover
          v-for="(item, index) in items"
          :key="index"
          v-slot="{ hover }"
          open-delay="200"
        >
          <nuxt-link
            class="text-decoration-none d-flex flex-column justify-center align-center mb-4 pa-1"
            width="100%"
            :class="hover ? 'primary' : ''"
            :to="item.to"
          >
            <div>
              <v-icon :color="hover ? 'white' : 'primary'" size="40">{{
                item.icon
              }}</v-icon>
            </div>
            <div :class="hover ? 'white--text' : 'red--text'">
              {{ item.title }}
            </div>
          </nuxt-link>
        </v-hover>

        <v-hover v-slot="{ hover }" open-delay="200">
          <nuxt-link
            class="text-decoration-none d-flex flex-column justify-center align-center mb-4 pa-1"
            width="100%"
            :class="hover ? 'primary' : ''"
            to="#"
            @click.native="logout"
          >
            <div>
              <v-icon :color="hover ? 'white' : 'primary'" size="40"
                >mdi-logout</v-icon
              >
            </div>
            <div :class="hover ? 'white--text' : 'red--text'">Logout</div>
          </nuxt-link>
        </v-hover>
      </v-sheet>
    </v-navigation-drawer>
    <v-main style="width: 100%; background-color: #eeeeee;">
      <v-container id="wrapper" style="height: 100%;">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-package',
          title: 'Product',
          to: '/product',
        },
        {
          icon: 'mdi-account-group',
          title: 'Customer',
          to: '/customer',
        },

        {
          icon: 'mdi-cart',
          title: 'Order',
          to: '/order',
        },
        {
          icon: 'mdi-account',
          title: 'Administrator',
          to: '/administrator',
        },
        {
          icon: 'mdi-tools',
          title: 'Setting',
          to: '/setting',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Turbo',
    }
  },

  methods: {
    logout() {
      this.$auth.logout()
      location.reload()
    },
  },
}
</script>

<style>
#wrapper {
  height: 100vh;
  width: 100%;
  background: #eee;
  /* border: 2px solid black; */
  
}

</style>

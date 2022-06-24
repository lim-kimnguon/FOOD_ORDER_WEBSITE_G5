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
          name="name"
          label="name"
          required
          v-model="product.name"
        ></v-text-field>

        <v-textarea
          outlined
          name="description"
          label="description"
          required
          v-model="product.description"
        ></v-textarea>

        <v-select
          :items="categories"
          v-model="product.category"
          item-text="name"
          return-object
          label="Category"
        ></v-select>

        <v-text-field
          outlined
          name="shop"
          label="shop"
          required
          v-model="product.shop"
        ></v-text-field>

        <v-text-field
          outlined
          name="price"
          label="price"
          required
          v-model="product.price"
        ></v-text-field>

        <v-file-input
          prepend-icon="mdi-camera"
          accept="image/*"
          label="thumbnail"
          v-model="file"
        ></v-file-input>

        <div v-if="file">
          <img width="200" :src="createImageUrl(file)" />
        </div>

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
      product: {
        name: '',
        description: '',
        category: '',
        imageUrl: '',
        shop: '',
        price: 0,
      },
      categories: [],
      file: null,
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
        this.file = null
        this.product = {
          name: '',
          description: '',
          category: '',
          imageUrl: '',
          shop: '',
          price: 0,
        }
      } else {
        this.$axios
          .get('/category/all')
          .then((res) => (this.categories = res.data.data))
      }
    },
  },

  methods: {
    async save() {
      this.isLoading = true

      let image_url = ''

      try {
        if (this.file) {
          let formData = new FormData()
          formData.append('file', this.file)
          const res = await this.$axios.post('/upload-image', formData)
          image_url = res.data.data
        }

        this.product.imageUrl = image_url
        this.product.category = this.product.category._id

        await this.$axios.post('/product/create', this.product)

        this.$nuxt.$emit('getProduct')
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

    createImageUrl(file) {
      return URL.createObjectURL(file)
    },
  },
}
</script>

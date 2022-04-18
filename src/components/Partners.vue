<template>
  <section class="py-16 bg-gray-100 client-logo-area">
    <div class="container">
      <div class="items-center row">

        <div class="w-1/2 md:w-1/4" v-for="item in getDataLists" :key="item.id">
          <div class="flex justify-center single-client">
            <img :src="item.avatar" :alt="item.name">
          </div> <!-- single client -->
        </div>

      </div> <!-- row -->
    </div> <!-- container -->
  </section>
</template>

<script>
import mixins from '../mixins/main';

export default {
  name: "PartnersV",
  mixins: [mixins],
  data() {
    return {
      getDataLists: [],
    }
  },
  created() {
    this.getContentsLists();
  },
  methods: {
    getContentsLists() {
      let slugUrl = 'partners';
      let idUrl = this.getLocalStorage('siteID');
      let masterContentsUrl = this.getLocalStorage('masterContentsUrl');
      let getPublicUrl = this.getLocalStorage('publicUrl');
      let url = masterContentsUrl + '/' + idUrl + '/' + slugUrl;
      this.axios.get(url)
          .then(function (response) {
            if (response.data['status'] === "success") {
              let items = response.data['data'];
              if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                  let item = items[i];
                  let array = {
                    id: item.id,
                    name: item.name,
                    link: item.primary_link,
                    avatar: getPublicUrl + item.avatar
                  };
                  this.getDataLists.push(array);
                }
              }
            }
          }.bind(this));
    },
  }
}
</script>

<style scoped>

</style>
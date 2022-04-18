<template>
  <section id="testimonial" class="testimonial-area py-120">
    <div class="container">
      <div class="justify-center row">
        <div class="w-full mx-4 lg:w-1/2">
          <div class="pb-10 text-center section-title">
            <h4 class="title">{{ getData.name }}</h4>
            <p class="text">{{ getData.description }}</p>
          </div> <!-- section title -->
        </div>
      </div> <!-- row -->

      <div class="row">
        <div class="w-full">
          <div class="row testimonial-active">

            <div class="w-full lg:w-1/3" v-for="item in getDataLists" :key="item.id">
              <div class="text-center single-testimonial">
                <div class="testimonial-image">
                  <img :src="item.avatar" :alt="item.name">
                </div>
                <div class="testimonial-content">
                  <p class="pb-5 mb-6 border-b border-gray-300" v-html="item.description"></p>
                  <h6 class="text-lg font-semibold text-gray-900">{{ item.name }}</h6>
                  <span class="text-sm text-gray-700">{{ item.bio }}</span>
                </div>
              </div> <!-- single testimonial -->
            </div>

          </div> <!-- row -->
        </div>
      </div> <!-- row -->
    </div> <!-- container -->
  </section>
</template>

<script>
import mixins from '../mixins/main';

export default {
  name: "ServicesVue",
  mixins: [mixins],
  data() {
    return {
      getData: {
        'name': '',
        'description': '',
      },
      getDataLists: [],
    }
  },
  created() {
    this.getContentsTitle();
    this.getContentsLists();
  },
  methods: {
    getContentsTitle() {
      let slugUrl = 'testimonial_title';
      let idUrl = this.getLocalStorage('siteID');
      let masterContentsUrl = this.getLocalStorage('masterContentsUrl');
      let url = masterContentsUrl + '/' + idUrl + '/' + slugUrl;
      this.axios.get(url)
          .then(function (response) {
            if (response.data['status'] === "success") {
              let items = response.data['data'];
              if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                  let item = items[i];
                  this.getData.name = item.name;
                  this.getData.description = item.description;
                }
              }
            }
          }.bind(this));
    },
    getContentsLists() {
      let slugUrl = 'testimonial_list';
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
                    description: item.description,
                    bio: item.bio,
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
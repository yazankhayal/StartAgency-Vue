<template>
  <div id="home" class="relative z-10 header-hero"
       v-bind:style="{ backgroundImage: 'url(' + getDataHome.avatar + ')' }"
      >
    <div class="container">
      <div class="justify-center row">
        <div class="w-full lg:w-5/6 xl:w-2/3">
          <div class="pt-48 pb-64 text-center header-content">
            <h3 class="mb-5 text-3xl font-semibold leading-tight text-gray-900 md:text-5xl">{{ getDataHome.name }}</h3>
            <p class="px-5 mb-10 text-xl text-gray-700">{{ getDataHome.description }}</p>
            <ul class="flex flex-wrap justify-center">
              <li><a class="mx-3 main-btn gradient-btn" :href="getDataHome.primary_link">{{ getDataHome.sub_name }}</a></li>
              <li><a class="mx-3 main-btn video-popup" :href="getDataHome.secondary_link">{{ getDataHome.sub_name_2 }}<i class="ml-2 lni-play"></i></a></li>
            </ul>
          </div> <!-- header content -->
        </div>
      </div> <!-- row -->
    </div> <!-- container -->
    <div class="absolute bottom-0 z-20 w-full h-auto -mb-1 header-shape">
      <img src="assets/images/header-shape.svg" alt="shape">
    </div>
  </div> <!-- header content -->
</template>

<script>
import mixins from '../mixins/main';

export default {
  name: "AppHeader",
  mixins: [mixins],
  data() {
    return {
      getDataHome: {
        'id': 0,
        'slug': '',
        'name': '',
        'sub_name_2': '',
        'avatar': '',
        'primary_link': '',
        'secondary_link': '',
        'description': '',
        'sub_name': '',
      },
    }
  },
  created() {
    this.getContentsHome();
  },
  methods: {
    getContentsHome() {
      let slugUrl = 'slider';
      let idUrl = this.getLocalStorage('siteID');
      let masterContentsUrl = this.getLocalStorage('masterContentsUrl');
      let publicUrl = this.getLocalStorage('publicUrl');
      let url = masterContentsUrl + '/' + idUrl + '/' + slugUrl;
      this.axios.get(url)
          .then(function (response) {
            if (response.data['status'] === "success") {
              let items = response.data['data'];
              if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                  let item = items[i];
                  console.log(item)
                  this.getDataHome.id = item.id;
                  this.getDataHome.slug = item.slug;
                  this.getDataHome.name = item.name;
                  this.getDataHome.sub_name = item.sub_name;
                  this.getDataHome.sub_name_2 = item.sub_name_2;
                  this.getDataHome.avatar = publicUrl + item.avatar;
                  this.getDataHome.primary_link = item.primary_link;
                  this.getDataHome.secondary_link = item.secondary_link;
                  this.getDataHome.description = item.description;
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
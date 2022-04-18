<template>
  <div class="navigation">
    <div class="container">
      <div class="row">
        <div class="w-full">
          <nav class="flex items-center justify-between navbar navbar-expand-md">
            <router-link :to="'/'" class="mr-4 navbar-brand" href="/">
              <img :src="layoutContents.logo_header" :alt="layoutContents.name">
            </router-link>

            <button class="block navbar-toggler focus:outline-none md:hidden" type="button" data-toggle="collapse" data-target="#navbarOne" aria-controls="navbarOne" aria-expanded="false" aria-label="Toggle navigation">
              <span class="toggler-icon"></span>
              <span class="toggler-icon"></span>
              <span class="toggler-icon"></span>
            </button>

            <!-- justify-center hidden md:flex collapse navbar-collapse sub-menu-bar -->
            <div class="absolute left-0 z-30 hidden w-full px-5 py-3 duration-300 bg-white shadow md:opacity-100 md:w-auto collapse navbar-collapse md:block top-100 mt-full md:static md:bg-transparent md:shadow-none" id="navbarOne">
              <ul class="items-center content-start mr-auto lg:justify-center md:justify-end navbar-nav md:flex">
                <!-- flex flex-row mx-auto my-0 navbar-nav -->
                <li class="nav-item active">
                  <a class="page-scroll" href="#home">HOME</a>
                </li>
                <li class="nav-item">
                  <a class="page-scroll" href="#service">SERVICES</a>
                </li>
                <li class="nav-item">
                  <a class="page-scroll" href="#pricing">PRICING</a>
                </li>
                <li class="nav-item">
                  <a class="page-scroll" href="#testimonial">Testimonial</a>
                </li>
                <li class="nav-item">
                  <a class="page-scroll" href="#contact">CONTACT</a>
                </li>
              </ul>
            </div>

            <div class="items-center justify-end hidden navbar-social lg:flex">
              <span class="mr-4 font-bold text-gray-900 uppercase">FOLLOW US</span>
              <ul class="flex footer-social">
                <li class="mr-3" v-for="item in socialList" :key="item.id">
                  <a style="width: 16px;height: 16px;" :href="item.link" target="_blank"><img :src="item.avatar" :alt="item.name"></a>
                </li>
              </ul>
            </div>
          </nav> <!-- navbar -->
        </div>
      </div> <!-- row -->
    </div> <!-- container -->
  </div>
</template>

<script>
import mixins from '../mixins/main';
export default {
  name: "AppHeader",
  mixins: [mixins],
  data() {
    return {
      socialList: [],
    }
  },
  created() {
    this.getContentsSocial();
  },
  methods: {
    getContentsSocial() {
      let slugUrl = 'social';
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
                    link: item.social,
                    description: item.description,
                    avatar: getPublicUrl + item.avatar
                  };
                  this.socialList.push(array);
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
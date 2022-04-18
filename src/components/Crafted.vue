<template>
  <section id="service" class="relative services-area py-120">
    <div class="container">
      <div class="flex">
        <div class="w-full mx-4 lg:w-1/2">
          <div class="pb-10 section-title">
            <h4 class="title">{{ getDataAbout.name }}</h4>
            <p class="text">{{ getDataAbout.description }}</p>
          </div> <!-- section title -->
        </div>
      </div> <!-- row -->
      <div class="flex">
        <div class="w-full lg:w-2/3">
          <div class="row">

            <div class="w-full md:w-1/2" v-for="item in getDataAboutLists" :key="item.id">
              <div class="block mx-4 services-content sm:flex">
                <div class="services-icon">
                  <img :src="item.avatar" :alt="item.name">
                </div>
                <div class="mb-8 ml-0 services-content media-body sm:ml-3">
                  <h4 class="services-title">{{ item.name }}</h4>
                  <p class="text" v-html="item.description"></p>
                </div>
              </div> <!-- services content -->
            </div>

          </div> <!-- row -->
        </div> <!-- row -->
      </div> <!-- row -->
    </div> <!-- container -->
    <div class="services-image">
      <div class="image">
        <img :src="getDataAbout.avatar" :alt="getDataAbout.name">
      </div>
    </div> <!-- services image -->
  </section>
</template>

<script>
import mixins from '../mixins/main';
export default {
  name: "CraftedVue",
  mixins: [mixins],
  data(){
    return{
      getDataAbout: {
        'name' : '',
        'description' : '',
        'avatar' : '',
      },
      getDataAboutLists : [],
    }
  },
  created() {
    this.getContentsAboutTitle();
    this.getContentsAboutLists();
  },
  methods: {
    getContentsAboutTitle() {
      let slugUrl = 'crafted_title';
      let idUrl = this.getLocalStorage('siteID');
      let masterContentsUrl = this.getLocalStorage('masterContentsUrl');
      let url = masterContentsUrl + '/' + idUrl + '/' + slugUrl;
      let publicUrl = this.getLocalStorage('publicUrl');
      this.axios.get(url)
          .then(function (response) {
            if (response.data['status'] === "success") {
              let items = response.data['data'];
              if(items.length > 0){
                for (var i = 0 ; i < items.length; i++){
                  let item = items[i];
                  this.getDataAbout.name = item.name;
                  this.getDataAbout.description = item.description;
                  this.getDataAbout.avatar = publicUrl + item.avatar;
                }
              }
            }
          }.bind(this));
    },
    getContentsAboutLists() {
      let slugUrl = 'crafted_lists';
      let idUrl = this.getLocalStorage('siteID');
      let masterContentsUrl = this.getLocalStorage('masterContentsUrl');
      let publicUrl = this.getLocalStorage('publicUrl');
      let url = masterContentsUrl + '/' + idUrl + '/' + slugUrl;
      this.axios.get(url)
          .then(function (response) {
            if (response.data['status'] === "success") {
              let items = response.data['data'];
              if(items.length > 0){
                for (var i = 0 ; i < items.length; i++){
                  let item = items[i];
                  let array = { id: item.id, name: item.name , description: item.description,avatar : publicUrl + item.avatar};
                  this.getDataAboutLists.push(array);
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
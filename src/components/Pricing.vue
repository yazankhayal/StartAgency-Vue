<template>
  <section id="pricing" class="bg-gray-100 pricing-area py-120">
    <div class="container">
      <div class="justify-center row">
        <div class="w-full mx-4 lg:w-1/2">
          <div class="pb-10 text-center section-title">
            <h4 class="title">{{ getData.name }}</h4>
            <p class="text">{{ getData.description }}</p>
          </div> <!-- section title -->
        </div>
      </div> <!-- row -->
      <div class="justify-center row">

        <div class="w-full sm:w-3/4 md:w-3/4 lg:w-1/3" v-for="item in getDataLists" :key="item.id">
          <div class="single-pricing">
            <div class="text-center pricing-header">
              <h5 class="sub-title">{{ item.name }}</h5>
              <span class="price">{{ item.price }}</span>
              <p class="year">{{ item.year }}</p>
            </div>
            <div class="mb-8 pricing-list" v-html="item.description"></div>
            <div class="text-center pricing-btn">
              <a class="main-btn" :href="item.link" target="_blank">{{ item.start }}</a>
            </div>
          </div> <!-- single pricing -->
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
      let slugUrl = 'pricing_title';
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
      let slugUrl = 'pricing_list';
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
                  let array = {
                    id: item.id,
                    name: item.name,
                    price: item.sub_name,
                    year: item.sub_name_2,
                    start: item.sub_name_3,
                    link: item.primary_link,
                    description: item.description
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
<template>

  <footer id="footer" class="bg-gray-100 footer-area">
    <div class="mb-16 footer-widget">
      <div class="container">
        <div class="row">
          <div class="w-full">
            <div class="items-end justify-between block mb-8 footer-logo-support md:flex">
              <div class="flex items-end footer-logo">
                <router-link class="mt-8" :to="'/'"><img :src="layoutContents.logo_footer" :alt="layoutContents.name">
                </router-link>
                <ul class="flex mt-8 ml-8 footer-social">
                  <li v-for="item in socialList" :key="item.id">
                    <a style="width: 16px;height: 16px;" :href="item.link" target="_blank"><img :src="item.avatar"
                                                                                                :alt="item.name"></a>
                  </li>
                </ul>
              </div> <!-- footer logo -->

            </div> <!-- footer logo support -->
          </div>
        </div> <!-- row -->
        <div class="row">
          <div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
            <div class="mb-8 footer-link">
              <h6 class="footer-title">Company</h6>
              <ul>
                <li v-for="item in footer1List" :key="item.id">
                  <router-link :to="'/page/' + item.id + '/' +  item.slug + '/details'">{{ item.name }}</router-link>
                </li>
              </ul>
            </div> <!-- footer link -->
          </div>
          <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div class="mb-8 footer-link">
              <h6 class="footer-title">Product & Services</h6>
              <ul>
                <li v-for="item in footer2List" :key="item.id">
                  <router-link :to="'/page/' + item.id + '/' +  item.slug + '/details'">{{ item.name }}</router-link>
                </li>
              </ul>
            </div> <!-- footer link -->
          </div>
          <div class="w-full sm:w-5/12 md:w-1/3 lg:w-1/4">
            <div class="mb-8 footer-link">
              <h6 class="footer-title">Help & Suuport</h6>
              <ul>
                <li v-for="item in footer3List" :key="item.id">
                  <router-link :to="'/page/' + item.id + '/' +  item.slug + '/details'">{{ item.name }}</router-link>
                </li>
              </ul>
            </div> <!-- footer link -->
          </div>
          <div class="w-full sm:w-7/12 md:w-1/2 lg:w-1/3">
            <div class="mb-8 footer-newsletter">
              <h6 class="footer-title">{{ subscribe.name }}</h6>
              <div class="newsletter">
                <input v-on:keyup.enter="sendRequest()" type="text" v-model="email" placeholder="Your Email"
                       class="w-full py-3 pl-6 pr-12 duration-300 bg-gray-200 border border-gray-200 rounded-full focus:border-blue-600 focus:outline-none">
                <Errors v-if="errorMessageEmail" :name="this.errorMessageEmail"></Errors>
                <Success v-if="successMessage" :name="this.successMessage"></Success>
              </div>
              <p class="font-medium text-gray-900" v-html="subscribe.description"></p>
            </div> <!-- footer newsletter -->
          </div>
        </div> <!-- row -->
      </div> <!-- container -->
    </div> <!-- footer widget -->

    <div class="bg-blue-900 footer-copyright">
      <div class="container">
        <div class="row">
          <div class="w-full">
            <div class="py-6 text-center">
              <p class="text-white">
                Template Deploy by
                <a :href="link" class="text-blue-500 duration-300 hover:text-blue-700">Yazan Khayal</a>
              </p>
            </div>
          </div>
        </div> <!-- row -->
      </div> <!-- container -->
    </div> <!-- footer copyright -->
  </footer>
</template>

<script>
import mixins from '../mixins/main';
import Errors from "@/components/Errors";
import Success from "@/components/Success";

export default {
  name: "ServicesVue",
  mixins: [mixins],
  components: {
    Errors,
    Success,
  },
  data() {
    return {
      link: "https://yazan-khayal.co.uk",
      email: '',
      errorMessageEmail: '',
      subscribe: {
        'name': '',
        'description': '',
      },
      socialList: [],
      footer1List: [],
      footer2List: [],
      footer3List: [],
    }
  },
  created() {
    this.getContentsSocial();
    this.getContents1List();
    this.getContents2List();
    this.getContents3List();
    this.getSubscribe();
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
    getContents1List() {
      let slugUrl = 'footer_about';
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
                    slug: item.slug,
                  };
                  this.footer1List.push(array);
                }
              }
            }
          }.bind(this));
    },
    getContents2List() {
      let slugUrl = 'footer_products';
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
                    slug: item.slug,
                  };
                  this.footer2List.push(array);
                }
              }
            }
          }.bind(this));
    },
    getContents3List() {
      let slugUrl = 'footer_help';
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
                    slug: item.slug,
                  };
                  this.footer3List.push(array);
                }
              }
            }
          }.bind(this));
    },
    getSubscribe() {
      let slugUrl = 'subscribe';
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
                  this.subscribe.name = item.name;
                  this.subscribe.description = item.description;
                }
              }
            }
          }.bind(this));
    },
    sendRequest() {
      let slugUrl = 'subscribe';
      let idUrl = this.getLocalStorage('siteID');
      let masterContentsUrl = this.getLocalStorage('getMasterUrl');
      let url = masterContentsUrl + idUrl + '/' + slugUrl;
      const dataForm = {email: this.email};
      this.$progress.start();
      this.disabled = true;
      this.axios.post(url, dataForm)
          .then(function (response) {
            if (response.data['status'] === "success") {
              this.successMessage = response.data['data'];
              this.email = '';
              this.errorMessageEmail = '';
              this.$progress.finish();
              this.disabled = false;
            }
          }.bind(this))
          .catch(error => {
            if (error.response['data']['status'] === "error") {
              let errorMessage = error.response['data']['data'];
              if (errorMessage['email']) {
                this.errorMessageEmail = errorMessage['email'][0];
              }
              this.$progress.finish();
              this.disabled = false;
            }
          });
    }
  }
}
</script>

<style scoped>

</style>
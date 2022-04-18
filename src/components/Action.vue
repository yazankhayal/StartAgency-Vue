<template>
  <section id="call-to-action" class="relative overflow-hidden bg-blue-600 call-to-action">
    <div class="absolute top-0 left-0 w-1/2 h-full call-action-image">
      <img :src="getData.avatar" :alt="getData.name">
    </div>
    <div class="container-fluid">
      <div class="justify-end row">
        <div class="w-full lg:w-1/2">
          <div class="py-32 mx-auto text-center call-action-content">
            <h2 class="mb-5 text-5xl font-semibold leading-tight text-white">{{ getData.name }}</h2>
            <p class="mb-6 text-white" v-html="getData.description"></p>
            <form ref="form" class="relative w-5/6 mx-auto md:w-2/3 call-newsletter">
              <i class="absolute top-0 left-0 pt-3 pl-5 text-xl text-blue-600 lni-envelope"></i>
              <input type="email" v-model="email" placeholder="john@email.com" class="w-full py-3 pl-12 pr-40 bg-white rounded-full focus:outline-none">
              <Errors v-if="errorMessageEmail" :name="this.errorMessageEmail"></Errors>
              <button type="button" @click="sendRequest()" class="absolute top-0 right-0 px-6 py-2 mt-1 mr-1 font-bold text-white duration-300 bg-blue-600 rounded-full hover:bg-blue-500">SUBSCRIBE</button>
              <Success v-if="successMessage" :name="this.successMessage"></Success>
            </form>
          </div> <!-- slider-content -->
        </div>
      </div> <!-- row -->
    </div> <!-- container -->
  </section>
</template>

<script>
import mixins from '../mixins/main';
import Errors from "@/components/Errors";
import Success from "@/components/Success";

export default {
  name: "ActionVue",
  mixins: [mixins],
  components:{
    Errors,
    Success,
  },
  data() {
    return {
      email: '',
      errorMessageEmail: '',
      getData: {
        'name': '',
        'sub_name': '',
        'description': '',
      },
    }
  },
  created() {
    this.getContentsWhy();
  },
  methods: {
    getContentsWhy() {
      let slugUrl = 'curious';
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
                  this.getData.name = item.name;
                  this.getData.avatar = publicUrl + item.avatar;
                  this.getData.description = item.description;
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
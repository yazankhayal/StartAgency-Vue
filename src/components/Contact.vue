<template>
  <section id="contact" class="contact-area py-120">
    <div class="container">
      <div class="justify-center row">
        <div class="w-full mx-4 lg:w-1/2">
          <div class="pb-10 text-center section-title">
            <h4 class="title">{{ getData.name }}</h4>
            <p class="text" v-html="getData.description"></p>
          </div> <!-- section title -->
        </div>
      </div> <!-- row -->
      <div class="justify-center row">
        <div class="w-full lg:w-2/3">
          <div class="contact-form">
            <form ref="form">
              <div class="row">
                <div class="w-full md:w-1/2">
                  <div class="mx-4 mb-6 single-form form-group">
                    <input type="text" v-model="name" placeholder="Your Name">
                    <Errors v-if="errorMessageName" :name="this.errorMessageName"></Errors>
                  </div> <!-- single form -->
                </div>
                <div class="w-full md:w-1/2">
                  <div class="mx-4 mb-6 single-form form-group">
                    <input type="text" v-model="email" placeholder="Email">
                    <Errors v-if="errorMessageEmail" :name="this.errorMessageEmail"></Errors>
                  </div> <!-- single form -->
                </div>
                <div class="w-full">
                  <div class="mx-4 mb-6 single-form form-group">
                    <input type="text" v-model="subject" placeholder="Subject">
                    <Errors v-if="errorMessageSubject" :name="this.errorMessageSubject"></Errors>
                  </div> <!-- single form -->
                </div>
                <div class="w-full">
                  <div class="mx-4 mb-6 single-form form-group">
                    <textarea rows="5" placeholder="Your Mesaage" v-model="message"></textarea>
                    <Errors v-if="errorMessageMessage" :name="this.errorMessageMessage"></Errors>
                  </div> <!-- single form -->
                </div>
                <p class="mx-4 form-message"></p>
                <div class="w-full">
                  <div class="mx-4 mt-2 text-center single-form form-group">
                    <button type="button" v-on:click="sendRequest()" class="main-btn gradient-btn focus:outline-none" :disabled="disabled">send message</button>
                    <Success v-if="successMessage" :name="this.successMessage"></Success>
                  </div> <!-- single form -->
                </div>
              </div> <!-- row -->
            </form>
          </div> <!-- row -->
        </div>
      </div> <!-- row -->
    </div> <!-- container -->
  </section>
</template>

<script>
import mixins from '../mixins/main';
import Errors from './Errors';
import Success from './Success';

export default {
  name: "ServicesVue",
  mixins: [mixins],
  components:{
    Errors,
    Success,
  },
  data() {
    return {
      disabled:false,
      errors: [],
      name: '',
      errorMessageName: '',
      email: '',
      errorMessageEmail: '',
      message: '',
      successMessage: '',
      errorMessageSubject: '',
      subject: '',
      errorMessageMessage: '',
      getData: {
        'name': '',
        'description': '',
      },
      getDataLists: [],
    }
  },
  created() {
    this.getContentsTitle();
  },
  methods: {
    getContentsTitle() {
      let slugUrl = 'touch';
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
    sendRequest() {
      let slugUrl = 'contact';
      let idUrl = this.getLocalStorage('siteID');
      let masterContentsUrl = this.getLocalStorage('getMasterUrl');
      let url = masterContentsUrl + idUrl + '/' + slugUrl;
      const dataForm = {name: this.name, message: this.message, subject: this.subject, email: this.email};
      this.$progress.start();
      this.disabled = true;
      this.axios.post(url,dataForm)
          .then(function (response) {
            if (response.data['status'] === "success") {
              this.successMessage = response.data['data'];
              this.name = '';
              this.errorMessageName = '';
              this.email = '';
              this.errorMessageEmail = '';
              this.subject = '';
              this.errorMessageSubject = '';
              this.message = '';
              this.errorMessageMessage = '';
              this.$progress.finish();
              this.disabled = false;
            }
          }.bind(this))
          .catch(error => {
            if (error.response['data']['status'] === "error") {
              let errorMessage = error.response['data']['data'];
              if(errorMessage['name']){
                this.errorMessageName = errorMessage['name'][0];
              }
              if(errorMessage['email']){
                this.errorMessageEmail = errorMessage['email'][0];
              }
              if(errorMessage['subject']){
                this.errorMessageSubject = errorMessage['subject'][0];
              }
              if(errorMessage['message']){
                this.errorMessageMessage = errorMessage['message'][0];
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
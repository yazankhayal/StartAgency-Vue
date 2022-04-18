<template>
  <section id="blog" class="blog_area pt-120">

      <div class="row justify-center lg:justify-start">

        <div class="w-full" v-for="item in getDataLists" :key="item.id">
          <div class="single_blog mx-3 mt-8 rounded-xl bg-white transition-all duration-300 overflow-hidden hover:shadow-lg">
            <div class="blog_image" v-if="item.avatar != null">
              <img :src="item.avatar" :alt="item.name" class="w-full">
            </div>
            <div class="blog_content p-4 md:p-5">
              <ul class="blog_meta flex justify-between">
                <li class="text-body-color text-sm md:text-base">{{ item.created_at }}</li>
              </ul>
              <h3 class="blog_title"><router-link :to="'/blog/' + item.id + '/' +  item.slug + '/details'">{{ item.name }}</router-link></h3>
              <p v-if="item.description" style="margin-top: 10px" v-html="item.description"></p>
            </div>
          </div> <!-- row -->
        </div>

      </div> <!-- row -->
  </section>

</template>

<script>
import mixins from "@/mixins/main";

export default {
  data() {
    return {
      headerContents:[],
      getDataLists: [],
    };
  },
  mixins: [mixins],
  name: "SingleBlogVue",
  created() {
    let id = this.$route.params['id'];
    let slug = this.$route.params['slug'];
    this.getContentsDeatils(id,slug)
  },
  methods:{
    getContentsDeatils(id,slug){
      let idUrl = this.getLocalStorage('siteID');
      let masterContentsUrl = this.getLocalStorage('masterContentsUrl');
      let getPublicUrl = this.getLocalStorage('publicUrl');
      let url = masterContentsUrl + '/' + idUrl + '/' + id + '/' + slug + '/details';
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
                    team_title: item.team_title,
                    description: item.description,
                    created_at: this.dateFormat(item.created_at),
                    avatar: item.avatar != null ? getPublicUrl + item.avatar : null,
                  };
                  this.getDataLists.push(array);
                }
              }
            }
          }.bind(this));
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div id="app">
    <vue3-progress />
    <header class="header-area">
      <app-header/>
    </header>

    <transition>
      <router-view />
    </transition>

    <footer-vue />

    <!--====== BACK TO TOP PART START ======-->

    <a class="back-to-top" href="#"><i class="lni-chevron-up"></i></a>

    <!--====== BACK TO TOP PART ENDS ======-->

  </div>
</template>

<script>
import AppHeader from './shared/AppHeader';
import FooterVue from './shared/Footer';
import mixins from './mixins/main';

export default {
  name: 'App',
  components: {
    AppHeader,
    FooterVue,
  },
  mixins:[mixins],
  data() {
    return {
      headerContents:[],
    };
  },
  mounted() {
    this.$progress.finish();
  },
  created() {
    this.$progress.start();

    this.$router.beforeEach((to, from, next) => {
      this.$progress.start();
      next();
    });

    this.$router.afterEach(() => {
      this.$progress.finish();
    });
  },
}
</script>
<style>
</style>

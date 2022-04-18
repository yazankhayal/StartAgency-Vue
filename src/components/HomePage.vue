<template>
  <div>
    <about-vue />
    <why-vue />
    <services-vue />
    <products-vue />
    <pricing-vue />
    <team-vue />
    <blog-vue />
    <contact-vue />
  </div>
</template>

<script>
import AboutVue from './About';
import ServicesVue from './Services';
import WhyVue from './Why';
import PricingVue from './Pricing';
import ProductsVue from './Products';
import TeamVue from './Team';
import BlogVue from './Blog';
import ContactVue from './Contact';
import mixins from '../mixins/main';

export default {
  components: {
    AboutVue,
    WhyVue,
    PricingVue,
    ProductsVue,
    ServicesVue,
    ContactVue,
    TeamVue,
    BlogVue,
  },
  mixins:[mixins],
  data() {
    return {
      headerContents:[],
    };
  },
  name: 'LayoutVue',
  created(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

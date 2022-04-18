<template>
  <div>
    <slider />
    <crafted-vue />
    <pricing-vue />
    <action-vue />
    <team-vue />
    <partners />
    <contact-vue />
  </div>
</template>

<script>
import CraftedVue from '../components/Crafted';
import PricingVue from '../components/Pricing';
import TeamVue from '../components/Team';
import ContactVue from '../components/Contact';
import mixins from '../mixins/main';
import Slider from '../components/Slider';
import ActionVue from '../components/Action';
import Partners from '../components/Partners';

export default {
  components: {
    CraftedVue,
    PricingVue,
    ContactVue,
    TeamVue,
    ActionVue,
    Slider,
    Partners,
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

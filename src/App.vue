<template>
 <div>
  <app-header/>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
 </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components:{
    appHeader:Header,
  }
}
</script>

<style scoped>
.fade-enter{
opacity: 0;
}
.fade-enter-active{
transition: opacity .5s ease-out;

}
.fade-leave{

}
.fade-leave-active{
transition: opacity .5s ease-out;
opacity:0
}
</style>

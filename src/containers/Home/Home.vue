<template>
  <div class="home">
      <vHeader title="IPCC机构端"  :isSubPage="false"/> 
        <div class="home-header">
            <a href="javascript:;" class="hhbtn-left"></a>
            <a href="javascript:;" class="hhbtn-right"></a>
        </div>
        <PInfo/>
       <Tab/>
  </div>
</template>

<script>

import  vHeader from '../../components/Header.vue'
import  Tab from './Tab.vue'
import  PInfo from '../../components/PInfo.vue'
export default {
  name: 'Home',
  data () {
    return {
      
    }
  },
  components:{
      Tab,vHeader,PInfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/base.scss"; 
.home{
    height:100%;
    background-color:$color-background;
    .home-header{
        padding:0 rem(30px);
        height:rem(120px);
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        align-items:center;
        >a{
          height:rem(60px);
          width:rem(60px);
          background-size:cover;
          background-repeat:no-repeat;
          &.hhbtn-left{
             height:rem(80px);
            width:rem(80px);
             background-image:url('../../assets/images/logo.png');
             border-radius:50%;
          }
          &.hhbtn-right{
              background-image:url('../../assets/images/share.png');
          }
        }
    }
   
    
}
</style>

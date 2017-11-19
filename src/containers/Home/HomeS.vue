<template>
  <div class="home">
      <vHeader title="IPCC教师端" :isFixed="true" :isSubPage="false"/> 
        <div class="container">
           <div class="home-header">
            <a href="javascript:;" class="hhbtn-left"></a>
            <a href="javascript:;" class="hhbtn-right"></a>
            </div>
           <PInfo  url='/MyInfo' :imgUrl="user.pinfoUri" :name="user.pinfoSname"/>
          <Tab :rsmStatus="user.rsmStatus" />
        </div>
  </div>
</template>

<script>

import  vHeader from '../../components/Header.vue'
import  Tab from './Tab2.vue'
import  PInfo from '../../components/PInfo.vue'
import { mapState } from 'vuex'

export default {
  name: 'HomeS',
  data () {
    return {
     
    }
  },
  computed: mapState({
      user:state =>state.user
  }),
  components:{
      Tab,vHeader,PInfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/base.scss"; 
.home{
    min-height:100%;
    background-color:$color-background;
   .container{
    padding-top:rem(120px);
    background-color:$color-background;
    padding-bottom:rem(60px);
    overflow-x: hidden;
    }
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

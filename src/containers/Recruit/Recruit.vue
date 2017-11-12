<template>
  <div class="recruit">
        <vHeader  :isSubPage="false" title="我的发布" :isFixed="true"/>
        <div class="recruit-list">
           <ul>
              <RecruitItem v-for="(v,index) in 20"  :key="index"/>
           </ul>
        </div>
        <div class="fbutton">
            <img src="../../assets/images/hometabItemicon1.png"/>
        </div>
  </div>
</template>

<script>
import  vHeader from '../../components/Header.vue'
import RecruitItem from '../../components/RecruitItem'

export default {
  name: 'Recruit',
  data () {
    return {
    
    }
  },
  components:{
      RecruitItem,
      vHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/base.scss";
.recruit{
    .recruit-list{
    padding-top:rem(180px);
    }
    .fbutton{
       position:fixed;
       bottom:0;
       right:0;
       height:rem(170px);
       width:rem(170px);
       border-radius: 100% 0 0 0;
       background-color: rgb(255, 152, 0);
       border-color: rgb(255, 152, 0);
       img{
           width:80%;
           position:absolute;
           left:50%;
           top:50%;
           transform:translate3d(-40%,-50%,0);
       }
    }
}

</style>

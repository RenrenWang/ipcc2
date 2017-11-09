<template>
  <div class="home">
     <!-- <vHeader title="IPCC机构端"  :isSubPage="false"/>   -->
       <div class="home-header">
            <a href="javascript:;" class="hhbtn-left"></a>
            <a href="javascript:;" class="hhbtn-right"></a>
       </div>
       <div class="home-pInfo">
            <div class="hp-avatar">
                 <img src="/static/images/avatar.jpg"/>
                 <a  href="javascript:;" class="btn-edit">
                   <span class="edit-icon"></span>
                 </a>
            </div>
            <p class="hp-name">IPCC-天洋</p>
       </div>
       <Tab/>
  </div>
</template>

<script>
import  Tab from './Tab.vue'
import  vHeader from '../../components/Header.vue'
export default {
  name: 'Home',
  data () {
    return {
      
    }
  },
  components:{
      Tab,vHeader
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
          height:rem(65px);
          width:rem(65px);
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
    .home-pInfo{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
       .hp-name{
           padding-top:15px;
           font-size:$font-size-medium-x;
           color:$color-theme;
          font-weight: bold;
       }
      .hp-avatar{
          height:rem(210px);
          width:rem(210px);
          border-radius:50%;
            border-color: #FFFFFF;
         box-shadow: 0 0 20px #aaaaaa;
         transform: rotate(0deg);
        border-radius: 55px;
        border-width: 2px;
        border-style: solid;
        position:relative;
        .btn-edit{
        
          width: rem(60px);
          height: rem(60px);
          position:absolute;
          right:rem(-20px);
          bottom:rem(15px);
          background-color: $color-theme;
          border-color: #ffffff;
          border-radius: 45px;
          border-width: 2px;
          border-style: solid;
          .edit-icon{
             position:absolute;
             left:50%;
             top:50%;
             transform:translate3d(-50%,-50%,0);
            display:inline-block;
           width: rem(40px);
            height: rem(40px);      
           background-size:contain;
           background-repeat:no-repeat;
           background-image:url('../../assets/images/edit.png');
          }
        }   
          img{
              height:100%;
              width:100%;
              border-radius:50%;
          }
       }
    }
    
}
</style>

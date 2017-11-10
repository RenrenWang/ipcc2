<template>
    <div class="pInfo">
            <div class="hp-avatar" :style="avaterStyle">
                <img src="/static/images/avatar.jpg" :style="avaterStyle"/>
                 <a  href="javascript:;" class="btn-edit" v-if="isHome">
                   <span class="edit-icon"></span>
                 </a>
            </div>
            <p class="hp-name" :style="nameStyle">IPCC-天洋</p>
    </div>
</template>

<script>
export default {
  name: 'PInfo',
  props:{
    isHome:{
        type:Boolean,
        default:true
    },
    avaterStyle:{
        type:Object,
        default:{}
    },nameStyle:{
        type:Object,
        default:{}
    }
  },
  data () {
    return {
       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/base.scss";
 .pInfo{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
       .hp-name{
         
           font-size:$font-size-medium-x;
           color:$color-theme;
          font-weight: bold;
       }
      .hp-avatar{
         margin-bottom:15px;
          height:rem(190px);
          width:rem(190px);
          border-radius:50%;
            border-color: #FFFFFF;
         box-shadow: 0 0 20px #aaaaaa;
         transform: rotate(0deg);
        border-radius: 55px;
        border-width: 2px;
        border-style: solid;
        position:relative;
        .btn-edit{
        
          width: rem(50px);
          height: rem(50px);
          position:absolute;
          right:rem(-20px);
          bottom:rem(10px);
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
           background-image:url('../assets/images/edit.png');
          }
        }   
          img{
              height:100%;
              width:100%;
              border-radius:50%;
          }
       }
    }
</style>

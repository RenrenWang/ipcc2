<template>
  <div class="recruit-item">
       <h2>滨江需要一位老师</h2>
        <ul class="ri-kinds">
             <li>
               <img src="../assets/images/navIcon.png"/>
               <span>男</span> 
              </li>
             <li>古典舞</li> 
        </ul>
        <p class="ri-rmb">全职：3000元/月</p>
        <div class="ri-time">
            <img src="../assets/images/timeIcon.png"/>
            <span>剩余29天</span>
        </div>
        <img  src="/static/images/avatar.jpg" class="avatar"/>
  </div>
</template>

<script>
export default {
  name: 'RecruitItem',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/base.scss";
.recruit-item{
    margin-top:rem(60px);
    text-align:center;
    background:$color-background;
    display:flex;
     justify-content:'center';
    flex-direction:column ;
    align-items:center;
    padding:rem(35px) 0;
    box-shadow: 0 0 12px #101010;
    position:relative;
    &:first-of-type{
       margin-top:0; 
    }
    .avatar{
        position:absolute;
        top:rem(-50px);
        left:10px;
        height:rem(100px);
        width:rem(100px);
        border:2px  #FFFFFF solid;
       box-shadow: 0 0 20px #aaaaaa;
       border-radius:50%;
    }
    h2{ padding-bottom:rem(45px);
        font-size:$font-size-large;
        font-weight: bold;
        color:#fff;
        border-bottom:1px  $color-theme    dashed;
    }
    .ri-kinds{
          margin-top:rem(40px);
        display:flex;
        justify-content:space-between;
        flex-direction:row;
        align-items:center;
        width:75%;
        >li{
           
            width:45%;
            padding:rem(20px) 0;
            color: #FFFFFF;
            background-color: transparent;
            border-color: #FFFFFF;
            font-size: $font-size-medium-x;
            border-radius: 10px;
            border-width: 2px;
            border-style: solid;
            font-weight: bold;
            position:relative;
           img{
               position:absolute;
               left:rem(50px);
               height:rem(40px);
               width:rem(40px);
           }
       }
    }
    .ri-rmb{
         margin-top:rem(40px);
        width:75%;
        color: #FF9800;
            background-color: transparent;
            border-color: #ffc800;
           
            font-size: $font-size-medium-x;
            padding: rem(20px) 0;
            border-radius: 10px;
            border-width: 2px;
            border-style: solid;
            text-align: center;
            line-height: 23px;
            font-weight: bold;
            font-style: normal;
    }
    .ri-time{
          margin-top:rem(40px);
            display:flex;
        justify-content:space-between;
        flex-direction:row;
        align-items:center;
        width:30%;
        span{
              font-size: $font-size-medium ;
                font-weight: bold;
                color:#fff;
        }
        img{
            height:rem(45px);
            width:rem(45px);
        }
    }
}
</style>
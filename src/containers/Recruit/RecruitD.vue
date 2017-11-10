<template>
  <div class="recruitD">
        <vHeader  :isSubPage="false" title="详情" :isFixed="true"/>  
        <div class="rd-content">
            <div class="rd-top">
                <img class="xql" src="../../assets/images/xql.png"/>
                <PInfo :isHome="false" :nameStyle="{'font-size':'14px'}" :avaterStyle="{height:'75px',width:'75px','margin-bottom':'15px'}"/>
                <div class="line-h"></div>
                <img class="timeicon" src="../../assets/images/timeIcon.png"/>
                <p class="time">剩余29天</p>
             </div>
             <h2>滨江需要一位老师</h2>
             <ul class="text-list">
                <li v-for="v in tList">
                    <img :src="v.icon"/>
                     <div>
                       <span class="text-name">{{v.name}}</span>
                       <span class="text-value">{{v.value}}</span>
                    </div>
                </li>
             </ul>
        </div>
  </div>
</template>

<script>
import  vHeader from '../../components/Header.vue'
import  PInfo from '../../components/PInfo.vue'
export default {
  name: 'RecruitD',
  data () {
    return {
     tList:[
         {"icon":require('../../assets/images/tlisticon1.png'),"name":'工作性质：',"value":'全职'},
         {"icon":require('../../assets/images/tlisticon2.png'),"name":'性别：',"value":'男老师'},
         {"icon":require('../../assets/images/tlisticon3.png'),"name":'技能：',"value":'古典舞'},
         {"icon":require('../../assets/images/tlisticon4.png'),"name":'薪资：',"value":'800元/月'}
           
     ]
    }
  },
   components:{
     
      vHeader,
      PInfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/base.scss";
.recruitD{
 background-color:$color-background;
   min-height:100%;
    .rd-content{
        padding-top:rem(100px);
        text-align:center;
        .rd-top{
         
        
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            align-items:center;
            padding:rem(50px) rem(50px) rem(70px) 0 ;
            border-bottom:1px  $color-theme    dashed;
            .xql{
               
                width:rem(110px);

            }
            .line-h{
              
               width:3px;
               height:rem(120px);
               background:$color-theme;
            }
            .timeicon{
               
                width:rem(80px);

            }
            .time{
               
                color:$color-theme;
                font-size:$font-size-medium-x;
            }
        }
        h2{
            margin-top:rem(50px);
            font-size:$font-size-large-x;
            font-weight:bold;
            color:#fff;
        }
      .text-list{
         display:flex;
         flex-direction:column;
          justify-content:center;
          align-items:center;
          width:50%;
          margin:0 auto;
          border-bottom:1px  $color-theme    dashed;
          padding-bottom:rem(30px);
          >li{
              padding:0 rem(10px);
              width:100%;
              margin-top:rem(40px);
              display:flex;
              flex-direction:row;
              position:relative;
              left:rem(-15px);
              align-items:center;
              justify-content:space-between;
              color:#fff;
              font-weight:bold;
              font-size:$font-size-medium-x;
              box-sizing:border-box;
              &:last-of-type{
                 >img{
                  height:rem(60px);
                   
                 }
              }
              >img{
                  height:rem(100px);
                
              }
             .text-name{
                  color:$color-theme;
                  
                 
              }
              .text-value{
                  color:$color-text;
              }
          }
          
      }

    }
}
</style>
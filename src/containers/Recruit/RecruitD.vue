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
             <div class="rd-section">
                   <h3><img src='../../assets/images/rdtext.png'/>工作内容与补充</h3>
                   <div class="text-content">
                         <p class="">哈三季度哈斯就会打架啊可是贷款计划</p>
                   </div>
                  
             </div>
             <div class="rd-address">
                  <div class="rd-ad-left">
                        <div class="btn-click">
                            <img src='../../assets/images/address.png'/>
                            <span>点击查看</span>
                        </div>
                        <p>详细地址：滨江区什么什么什么圣诞节</p>
                  </div>
                  <img src="../../assets/images/righticon.png" class="rd-ad-right"/>
              </div>
             <div class="rd-section rd-section-imgs">
                   <h3><img src='../../assets/images/zpicon.png'/>工作环境</h3>
                   <ul class="img-list">
                       <li  v-for="v in  3">
                           <img  src="https://pro.modao.cc/uploads3/images/1202/12026217/raw_1503314459.jpeg"/>
                       </li>
                   </ul>
                  
             </div>
        </div>
         <div class="fbutton">
            <img src="../../assets/images/deleteIcon.png"/>
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
              >div{
                  width: rem(300px);
                  text-align: left;
              }
              &:last-of-type{
                 >img{
                  height:rem(60px);
                   padding: 0 rem(20px) ;
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
    .rd-section{
        margin-top:rem(40px);
        padding: 0 rem(30px);
        >h3{
           display: flex;
           align-items: center;
            color: $color-theme ;
            font-size:$font-size-medium-x ;
            img{
                margin-right: 10px;
                height: rem(60px);
                
            }
        }
        .text-content{
            margin-top:rem(25px);
            border:1px  solid $color-theme ;
            border-radius: rem(20px);
            min-height: rem(250px);
            color: $color-theme ;
            font-size:$font-size-medium-x;
            padding: rem(20px);
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
        }
    }
    .rd-address{
      margin: rem(50px) rem(30px) 0 rem(30px);
      color: $color-theme ;
      
       border:1px  solid $color-theme ;
       border-radius: rem(20px);
       min-height: rem(250px);
       display: flex;
       flex-direction: row;
       align-items: center;
         
       .rd-ad-left{
            flex: 1;
            display: flex;
            align-items: center;
           flex-direction: column;
           justify-content: center;
           text-align: center;
           font-size: $font-size-medium-x ;
           img{
               height: rem(70px);
               
           }
           .btn-click{
               margin-bottom:rem(50px);
               display: flex;
               align-items: center;
               flex-direction: row;
             
               font-size: $font-size-large-x ;
           }
       }
       .rd-ad-right{
           height: rem(60px);
       }
    }
    .rd-section-imgs{
        padding-bottom:rem(190px);
        h3{
            justify-content: center;
            img{
                height: rem(50px); 
            }
        }
        .img-list{
             margin-top:rem(25px);
            border:1px  solid $color-theme ;
            border-radius: rem(20px);
            min-height: rem(250px);
            display: flex;
            align-items: center;
            justify-content: center;
            >li{
                width:28%;
                margin:0 1.5%;
                img{
                    width: 100%;
                }
            }
        }
    }

     .fbutton{
       position:fixed;
       bottom:0;
       right:0;
       height:rem(170px);
       width:rem(170px);
       border-radius: 100% 0 0 0;
       background-color: rgb(255, 69, 69);;
       border-color: rgb(255, 69, 69);
       img{
           width:45%;
           position:absolute;
           left:50%;
           top:50%;
           transform:translate3d(-30%,-40%,0);
       }
    }
}
</style>
<template>
  <div class="recruitD">
        <VHeader  :isSubPage="false" title="详情" :isFixed="true"/>  
        <div class="rd-content">
            <div class="rd-top">
                <img class="xql" src="../../assets/images/xql.png"/>
                <PInfo :isHome="false" :name="data.pinfoPname" :imgUrl="data.pinfoUri" :nameStyle="{'font-size':'14px'}" :avaterStyle="{height:'75px',width:'75px','margin-bottom':'15px'}" />
                <div class="line-h"></div>
                <img class="timeicon" src="../../assets/images/timeIcon.png"/>
                <p class="time">剩余{{data.timeDays}}天</p>
             </div>
             <h2>{{data.infoTitle}}</h2>
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
                         <p class="">{{data.titleSimdesc}}</p>
                   </div>
                  
             </div>
             <div class="rd-address">
                  <div class="rd-ad-left">
                        <div class="btn-click" @click="showMapBig">
                            <img src='../../assets/images/address.png'/>
                            <span>点击查看</span>
                        </div>
                        <p>详细地址：{{data.mapAddr+data.infoAddr}}</p>
                  </div>
                  <img src="../../assets/images/righticon.png" class="rd-ad-right"/>
              </div>
             <div class="rd-section rd-section-imgs">
                   <h3><img src='../../assets/images/zpicon.png'/>工作环境</h3>
                   <ul class="img-list">
                      <li v-for="(v,index) in list">
                          <img class="preview-img"  :src="v.src"  @click="$preview.open(index, list)">
                       </li>
                   </ul>
              </div>
        </div>
         <div class="fbutton" @click="showAlertConfirm()">
            <img src="../../assets/images/deleteIcon.png"/>
        </div>
         <MapBig  v-if="isMapBig" :xy="mapXY" @hMap="showMapBig"/>
         <BottomPlay  v-show="isShowbp"  :isPay="true" :phoneNumber="data.pinfoPhone"/>
         <FooterButton  v-if="($route.query.type&&applClass=='T')" btnName="与他联系" @fBtnAction="showPhone()"/>
         <AlertConfirm  v-show="isShowAlertConfirm"  alertTitle="删除" alertContent="删除后，该信息将无法被老师所看到。" @cancelActive="AlertCancelActive" @confirmActive="AlertConfirmActive"/>
         <Prompt v-show="isPrompt"  :content="pContent" @actionPrompt="pAction()"/>
  </div>
</template>

<script>

import  PInfo from '../../components/PInfo.vue'


import VHeader from '../../components/Header.vue'

import Loading from '../../components/Loading.vue'
import BottomPlay from '../../components/BottomPlay.vue'

import AlertConfirm from '../../components/AlertConfirm.vue'
import MapBig from '../../components/MapBig.vue'


import Prompt from '../../components/Prompt.vue'
export default {
    name: 'recruitD',
    data() {
        return {
           isLoading:true,
           data:{},
           imgList:[],
           list: [],
           isError:false,
           imgUrl:api.imgUrl,
           isShowAlertConfirm:false,
           address:api.address,
           isMapBig:false,
           mapXY:{x:0,y:0},
           isJS:false,
           isShowbp:false,
           applClass:'',
           isPrompt:false,
           pContent:'',
            tList:[
         {"icon":require('../../assets/images/tlisticon1.png'),"name":'工作性质：',"value":''},
         {"icon":require('../../assets/images/tlisticon2.png'),"name":'性别：',"value":''},
         {"icon":require('../../assets/images/tlisticon3.png'),"name":'技能：',"value":''},
         {"icon":require('../../assets/images/tlisticon4.png'),"name":'薪资：',"value":''}
           
     ]
        }
    },
    created(){
      
       this.getData();
    },
    methods:{
    getData(){
     
      this.applClass=GetQueryString('applClass')?GetQueryString('applClass'):'';
      
    //   console.log(this.$route.query.type);
       this.$http.get(api.recruitD+this.$route.query.id)//this.$route.params.id
       .then(response=>{
          
          this.isLoading=false;
          let data=response.data;
          if(data.result!='success'){
             this.promptCommon('数据不存在');
             this.isError=true;
             return;
          }
          this.data=data.data[0];
          this.imgList=data.imgData;
          this.isError=false;
          this.tList[0].value= this.data.titleClassname;
          this.tList[1].value= this.data.titleSex;
          this.tList[2].value=this.data.titleExt1name;
          this.tList[3].value=this.setDy();
          if(!this.isLoading){
             this.mapXY={
                x:this.data.mapAxis,
                y:this.data.mapAyis
            }
             setTimeout(()=>{
                 this.showMap(this.data.mapAxis, this.data.mapAyis);
             },0)
          }
          
          
           data.imgData.map((item,index)=>{
              
              this.list.push({
                  src:this.imgUrl+item.lidFileuri,
                  w: document.body.clientWidth ,
                  h: document.body.clientHeight-88
              });
           });
           this.isJS=GetQueryString('pinfoId')==this.data.pinfoId?true:false;
            
          
       }).catch(error=>{
           console.log(error);
           this.isError=true;
          // this.isLoading=false;
       })
        },
    pay(){
        location.href=api.pay+"&feeClass=A&pinfoId="+GetQueryString('pinfoId')+"&msgId="+this.data.infoIds;
      },
        setDy(){
          return  this.data.titleClassname=='全职'?this.data.salaryClassname+"元/月":this.data.salaryClassname+"元/小时";
        },
       showPhone(){
            this.isShowbp=!this.isShowbp;
        },
        nrAction(){
              this.$router.push({path:'/recruitPost',query:{id:this.$route.query.id}});
        },
        showMapBig(){
        this.isMapBig=!this.isMapBig;
        },
     showMap(x,y){
        var map = new AMap.Map('map', {
        resizeEnable: false,
        center: [x, y],
        zoom: 13
      });
      var marker = new AMap.Marker({
        position: map.getCenter()
        });
        marker.setMap(map);
        },
      AlertCancelActive(){
         this.isShowAlertConfirm=false;
      },
     promptCommon(str){
      this.isPrompt=true;
       this.pContent=str;
    },
    pAction(){
   
     this.isPrompt=!this.isPrompt;
    },
      AlertConfirmActive(){
         
          this.$http.get(api.recruitDelete+this.$route.query.id)
          .then((response)=>{
               this.isShowAlertConfirm=false;
              console.log(JSON.stringify(response.data));
               if(response.data.result=='success'){
                  this.promptCommon('删除成功');
               }else{
                   this.promptCommon('删除失败');
               }
              
          });
        
      },
      showAlertConfirm(){
         this.isShowAlertConfirm=true;
      }
    },
    components: {
        VHeader,
        PInfo,
        AlertConfirm,
        MapBig,
        BottomPlay,
        Loading,
        Prompt,
        
       
        
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
                  font-size:$font-size-medium;
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
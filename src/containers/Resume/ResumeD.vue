<template>
    <div class="recruit-d"><!--iconRight="icon-bianji2"  @rightAction="nrAction"-->
        <VHeader :isSubPage="false"   title="详细" :isFixed="true" />
         <div class="container">
              <div class="address">
                  <span class="iconfont  icon-dizhi"></span>
                   <span class="ad-text">杭州</span>
              </div>
              
              <div class="info-box">
                   <div class="ib-l">
                       <span class="iconfont  icon-nan3" style="color:#1296db" v-if="data.pinfoSex=='男'"></span>
                       <span class="iconfont  icon-nv2" style="color:#ff69c2" v-if="data.pinfoSex=='女'"></span>
                       <span class="age">55岁</span>
                   </div>
                    <div class="ib-c">
                          <PInfo :isHome="false" :name="data.pinfoPname" :imgUrl="data.pinfoUri"   />
                   </div>
                    <div class="ib-r">
                          <span>{{data.titleClassname}}</span>
                   </div>
              </div>
              <div class="line"></div>
              <div class="x-box">
                  <ul class="info-text">
                    <li>
                       <span class="iconfont icon-geren"></span>
                       <p>真实姓名：{{data.pinfoPname}}</p>
                    </li>
                    <li>
                       <span class="iconfont icon-xuexiao-copy"></span>
                       <p>毕业院校：{{data.collName}}</p>
                    </li>
                    <li>
                       <span class="iconfont icon-jingyan"></span>
                       <p>教学经验：{{data.teacherYear}}</p>
                    </li>
                 </ul>
              </div>
              <div class="line"></div>
              <div class="section">
                   <div class="top">
                        <span class="iconfont icon-logo"></span>
                        <p>擅长</p>
                   </div>
                   <ul class="sc">
                       
                    
                       <li v-if="data.titleExt1name!=''&&data.titleExt1name">{{data.titleExt1name}}</li>
                        <li v-if="data.titleExt2name!=''&&data.titleExt2name">{{data.titleExt2name}}</li>
                        <li v-if="data.titleExt3name!=''&&data.titleExt3name">{{data.titleExt3name}}</li>
                       <li v-if="data.titleExt4name!=''&&data.titleExt4name">{{data.titleExt4name}}</li>
                       <li v-if="data.titleExt5name!=''&&data.titleExt5name">{{data.titleExt5name}}</li>
                   </ul>
              </div>
              <div class="line"></div>
               <div class="section">
                   <div class="top">
                        <span class="iconfont icon-wenjian"></span>
                        <p>个人简介</p>
                   </div>
                   <div class="grcontent">
                       <p >{{data.pinfoNote}}</p>
                   </div>
              </div>
              <div class="line"></div>
              <div class="section">
                   <div class="top">
                        <span class="iconfont icon-zhaoxiang"></span>
                        <p>艺术照</p>
                   </div>
                    <ul class="img-list">
                       <li v-for="(v,index) in list">
                         <img class="preview-img"  :src="v.src" height="100" @click="$preview.open(index, list)">
                       </li>
                   </ul>
              </div>
         </div>
        
       <div   v-if="!applClass||applClass!='T'"  class="fbutton" @click="play()" >
           <span class="iconfont icon-dianhua"></span>
           <!-- <p  v-if="applClass=='T'" class="text">编辑</p> -->
        </div>
      
        <BottomPlay  v-show="isShowbp"  @cancelActive="paycancelActive" :isPay="ispay" :phoneNumber="pinfoPhone" :msgId="rsmIds"/>
    </div>
</template>

<script>
import VHeader from '../../components/Header.vue'

import Loading from '../../components/Loading.vue'
import BottomPlay from '../../components/BottomPlay.vue'
import  PInfo from '../../components/PInfo.vue'
export default {
    name: 'redumeD',
    data() {
        return {
           isLoading:true,
           data:{},
           imgList:[],
            list: [],
           isError:false,
           imgUrl:api.imgUrl,
           isShowbp:false,
           ispay:true,
           pinfoPhone:'',
           rsmIds:0,
           applClass:''
        }
    },
    created(){
       this.applClass=GetQueryString('applClass')?GetQueryString('applClass'):'';
        let url="";
       if(this.$route.query.isP){
          url=api.presumeD+this.$route.query.id;
       }else{
           url=api.resumeD+this.$route.query.id+'&pinfoId='+GetQueryString('pinfoId');
       }
       this.$http.get(url)
       .then(response=>{
         let data=response.data;
         console.log(data);
          this.data=data.data[0];
          
          this.ispay=(data.ispay=='Y'?true:false);
          this.pinfoPhone=data.data[0].pinfoPhone;
          this.rsmIds=data.data[0].rsmIds;
          this.imgList=data.imgData;

          data.imgData.map((item,index)=>{
              
              this.list.push({
                  src:this.imgUrl+item.lidFileuri,
                  w: document.body.clientWidth ,
                  h: document.body.clientHeight-88
              });
           });
         this.isLoading=false;
          this.isError=false;
       }).catch(error=>{
          this.isError=true;
          
       })
    },

    methods:{
     paycancelActive(){
       this.isShowbp=!this.isShowbp;
     },
    setAge(date){
          return Math.abs(Number(new Date(date).getFullYear()) - Number(new Date().getFullYear())+1)+'岁';
      },
        play(){
               
            if(this.$route.query.isP){
          
               this.$router.push({path:'/resumePost',query:{id:this.$route.query.id,rsmIds:this.rsmIds}});
            }else{
               this.isShowbp=!this.isShowbp;
            }
           
        }
    },
    components: {
        VHeader,
        PInfo,
        BottomPlay,
        Loading
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/base.scss";
.container{
    padding-top:rem(120px);
    background:$color-background;
    min-height:100%;
    overflow-x: hidden;
    padding: rem(120px) 0 rem(190px) 0;
    .line{
      margin:rem(60px) auto 0 auto;
      width: 50%;
      border-bottom:1px  $color-theme    dashed;
    }
    .address{
        padding: 0  rem(15px);
        color:#fff;
        .icon-dizhi{
           font-size:rem(50px);
        }
        .ad-text{
            font-size:14px;
        }
    }
    .info-box{
        display:flex;
        align-items:center;
        justify-content:space-between;
        text:center;
        .ib-l,.ib-r{
           position: relative;
           top: rem(-40px);
            flex:1;
              display:flex;
        align-items:center;
        justify-content:center;
         }
        .ib-l{
            color:#fff;
          .iconfont{
              font-size:rem(60px);
          }
          .age{
              font-size:18px;
              margin-left:5px;
          }
        }
        .ib-c{
          
            width:45%;
          
        }
        .ib-r{
           span{
           font-size:rem(45px); 
            color:#FF9800; 
           }
        }
    }
    .x-box{
        width:45%;
        margin: 0 auto;
         
        .info-text{
        color:#7ACD85;
          display:flex;
        
           flex-direction:column;
           justify-content:space-around;
          margin:0 auto;
         width:200%;
        li{
             display:flex;
        
           flex-direction:row;
          align-items: center;
            margin-top:rem(50px);
          .iconfont{
             font-size: rem(55px);
            margin-right: rem(15px);
           }
          p{
              font-size:16px;
              display:inline-block;
          }
        }
      }
    }
   .section{
       
       color:$color-theme;
       font-size:16px;
       margin: 0 auto;
       .top{
           margin-top:rem(40px);
            display:flex;
          
           flex-direction:row;
           justify-content:center;
           align-items: center;
           font-size: 16px;
            .iconfont{
                margin-right: 5px;
                font-size: rem(60px);
           }
           .icon-logo{
               
               font-size: rem(90px);
           }
          
       }
       .sc{
      
          display:flex;
          width: 60%;
           flex-direction:row;
            margin:0 auto;
           flex-wrap: wrap;
            justify-content:center;
           li{
              border:1px solid  $color-theme;
              border-radius: rem(15px);
               width: 33%;
              padding: rem(14px) 0;
              text-align: center;
              margin: 3px;
               overflow : hidden;
               text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                white-space:nowrap; 
           }
       }
       .grcontent{

            width: 75%;
           border:1px solid  $color-theme;
           min-height: rem(200px);
           border-radius: rem(20px);
           margin: rem(40px) auto 0 auto;
           padding: 10px;
           display: flex;
           align-items: center;
           justify-content: center;
           p{
           display: table-cell;
           vertical-align:middle;
           text-align: center;

           }
       }
   }
     .img-list{
            width: 75%;
            margin:rem(25px) auto 0 auto;
            border:1px  solid $color-theme ;
            border-radius: rem(20px);
            min-height: rem(200px);
            display: flex;
            align-items: center;
            justify-content: center;
             padding: 10px;
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
       .text{
           width:45%;
           position:absolute;
           left:50%;
           top:50%;
           transform:translate3d(-30%,-30%,0);
           color:#fff;
           font-size:rem(40px);
           font-weight:bold;
           white-space:nowrap;
       }
       .iconfont{
          font-size: rem(70px);
           position:absolute;
           left:50%;
           top:50%;
           transform:translate3d(-30%,-40%,0);
           color:#fff;
       }
    }
</style>
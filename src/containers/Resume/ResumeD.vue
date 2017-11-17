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
              <div class="x-box">
                  <ul class="info-text">
                    <li>
                       <span class="iconfont icon-geren"></span>
                       <p>真实姓名：陈天洋</p>
                    </li>
                    <li>
                       <span class="iconfont icon-xuexiao-copy"></span>
                       <p>毕业院校：浙江艺术职业学院</p>
                    </li>
                    <li>
                       <span class="iconfont icon-jingyan"></span>
                       <p>教学经验：5年以上</p>
                    </li>
                 </ul>
              </div>
         </div>
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
    .address{
        color:#fff;
        .icon-dizhi{
           font-size:rem(75px);
        }
        .ad-text{
            font-size:18px;
        }
    }
    .info-box{
        display:flex;
        align-items:center;
        justify-content:space-between;
        text:center;
        .ib-l,.ib-r{
            flex:1;
              display:flex;
        align-items:center;
        justify-content:center;
         }
        .ib-l{
            color:#fff;
          .iconfont{
              font-size:rem(70px);
          }
          .age{
              font-size:18px;
              margin-left:5px;
          }
        }
        .ib-c{
            width:40%;
            padding-bottom:rem(40px);
            border-bottom:1px  $color-theme    dashed;
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
        .info-text{
        color:#7ACD85;
          display:flex;
        
           flex-direction:column;
           justify-content:space-around;
          margin:0 auto;
         width:200%;
        li{
            
          .iconfont{
             font-size:rem(60px);
           }
          p{
              font-size:16px;
              display:inline-block;
          }
        }
      }
    }
   
}
</style>
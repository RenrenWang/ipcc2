<template>
  <div class="home-tab">
       <ul class="tab-controller">
           <li v-for="(v,index) in  tabs" :class="{active:v.isActive}" @click="changItem(index)">{{v.name}}</li>
        
       </ul>
       <div class="tab-content">
           <div class="tab-content-item" v-for="(item,index) in  tabContents" v-show="tabs[index]['isActive']">
                <img :src="item.imgurl" class="tabitem-icon" v-if="index!=0"/>
                <div class="state-box" v-if="index==0">
                      状态：{{restatus()}}
                </div>
                <p class="tabitem-text">{{item.text}}</p>

                <router-link v-if="index!=0" class="tab-item-btn" :to="{path:item.toUrl,query: { type:'T'}}" tag="div">
                    <span>{{item.btnName}}</span>
                    <img :src="item.btnIcon" class="btnIcon"/>
                </router-link>
                <div class="btn2" v-if="index==0">
                    <div class="tab-item-btn" @click="xqAction">
                      <span>详情</span>
                      
                    </div>
                      <div class="tab-item-btn" @click="scAction">
                      <span>上传</span>
                    
                    </div>
                </div>
           </div>
       </div>
       <Prompt v-show="isPrompt"  :content="pContent" @actionPrompt="pAction"/>
  </div>
</template>

<script>
import  Prompt   from '../../components/Prompt.vue'
export default {
  name: 'HomeTab',
  props:{
    rsmStatus:{
      type:String,
      default:''
    }
  },
  data () {
    return {
       tabs:[
         {name:'发布',isActive:true},
         {name:'招聘',isActive:false},
         {name:'专属',isActive:false}
         ],
        tabContents:[
          {toUrl:'/recruit',imgurl:require('../../assets/images/hometabItemicon1.png'),text:'您可以通过填写招聘信息来发布您的招聘需求，发布的信息可以让更多教师看到。',"btnName":'点击发布',btnIcon:require('../../assets/images/toRight.png')},
          {toUrl:'/RecruitShow',imgurl:require('../../assets/images/hometabItemicon2.png'),text:'里面有很多求职教师的简历哦~，每一份简历都是经过IPCC严格审核。',"btnName":'点击前往',btnIcon:require('../../assets/images/toRight.png')},
          {toUrl:'',imgurl:require('../../assets/images/hometabItemicon3.png'),text:'IPCC专属教师，功能正在努力完善，详情请点击下方查看',"btnName":'了解详情',btnIcon:require('../../assets/images/zhiIcon.png')}
        ],
       
         isPrompt:false,
       pContent:'',
    }
  },

  methods:{
  activePrompt(str){
      this.pContent=str;
      this.pAction();
   },
    pAction(){
        this.isPrompt=!this.isPrompt;
    },
     xqAction(){//applClass=T
      if(this.rsmStatus==null||this.rsmStatus==''){
        return this.activePrompt("未提交简历，请先提交简历");
      }
      this.$router.push({ path:'/resumeD',query:{id:GetQueryString('pinfoId'),isP:true}})
   },
   scAction(){//applClass=T
      if( this.rsmStatus=="N"|| this.rsmStatus=="Y"){
        return  this.activePrompt("简历已提交");
      }
      this.$router.push({ path:'/resumePost'})
   },
 
       restatus(){
     
      if( this.rsmStatus=="N"){
          return '审核中';
      }else if( this.rsmStatus=="Y"){
          return '已通过';
      }else{
         return '未提交';
      }
   },
    changItem(index){

       this.initTab(this.tabs);
     
       this.tabs[index]['isActive']=!this.tabs[index]['isActive'];
     
    },
    initTab(arr){
       arr.map((item,index)=>{
         item.isActive=false;
       }) 
    }
  },
  components:{
    Prompt
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/base.scss";
.home-tab{
    margin-top:rem(40px);
    padding:0 rem(45px);
    .tab-controller{
      border:2px  solid $color-theme;
      border-radius:rem(40px);
      height:rem(95px);
      line-height:rem(95px);
      display:flex;
      align-items:center;
      justify-content:center;
      
      >li{
        height:100%;
        flex:1;
        font-size:$font-size-large;
        color: $color-theme;
        text-align:center;
        font-weight: bold;
        border-right:1px  solid $color-theme;
      
        &:first-of-type{
         
          border-top-left-radius:rem(35px);
          border-bottom-left-radius:rem(35px);
        }
        &:last-of-type{
          border:none;
          border-top-right-radius:rem(35px);
          border-bottom-right-radius:rem(35px);
        }
         &.active{
          background-color: $color-theme;
           color: #fff;
        }
      }
    }
    .tab-content{
      margin-top:rem(70px);
      .tab-content-item{
        &:last-of-type{
           .tab-item-btn{
              background-color:$color-sub-theme;
              span{
                color:#444;
              }
              .btnIcon{
                height:rem(75px);
                width:rem(75px);
              }
           }
        }
        text-align:center;
         display:flex;
         flex-direction:column;
         justify-content:center;
         align-items:center;
       .tabitem-icon{
          height:rem(160px);
        }
        .tabitem-text{
          margin-top:rem(40px);
          font-size:$font-size-medium-x;
          color:#fff;
          line-height:30px;
        }
        .tab-item-btn{
          margin-top:rem(40px);
          padding:0 rem(30px);
          height:rem(90px);
          border-radius:rem(25px);
          width:50%;
          border:1px  solid  $color-sub-theme;
           display:flex;
            justify-content:center;
            align-items:center;
             flex-direction:row;
              position:relative;
              
          span{
            font-size:$font-size-large;
            color: $color-sub-theme;
            font-weight: bold;
          }
          img{
           position:absolute;
            top:50%;
            right:rem(30px);
            transform:translate3d(0,-50%,0);
            height:rem(40px);
            width:rem(40px);

          }
        }
      }
    }
    .state-box{
      margin:rem(45px) 0;
      width: 70%;
      height: rem(80px);
      line-height: rem(80px);
      color: #ff9800;
      background-color: transparent;
     font-size: 18px;
      border: 3px solid #ff9800;
      border-radius: rem(20px);
    }
    .btn2{
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 100%;
      .tab-item-btn{
        margin: 0 rem(30px);
        width:30% !important;
      }

    }
}
</style>
<template>
  <div class="home-tab">
       <ul class="tab-controller">
           <li v-for="(v,index) in  tabs" :class="{active:v.isActive}" @click="changItem(index)">{{v.name}}</li>
        
       </ul>
       <div class="tab-content">
           <div class="tab-content-item" v-for="(item,index) in  tabContents" v-show="tabs[index]['isActive']">
                <img :src="item.imgurl" class="tabitem-icon"/>
                <p class="tabitem-text">{{item.text}}</p>
                <div class="tab-item-btn">
                    <span>{{item.btnName}}</span>
                    <img :src="item.btnIcon" class="btnIcon"/>
                </div>
           </div>
       </div>
  </div>
</template>

<script>
export default {
  name: 'HomeTab',
  data () {
    return {
       tabs:[
         {name:'发布',isActive:true},
         {name:'简历',isActive:false},
         {name:'专属',isActive:false}
         ],
        tabContents:[
          {toUrl:'',imgurl:require('../../assets/images/hometabItemicon1.png'),text:'您可以通过填写招聘信息来发布您的招聘需求，发布的信息可以让更多教师看到。',"btnName":'点击发布',btnIcon:require('../../assets/images/toRight.png')},
          {toUrl:'',imgurl:require('../../assets/images/hometabItemicon2.png'),text:'里面有很多求职教师的简历哦~，每一份简历都是经过IPCC严格审核。',"btnName":'点击前往',btnIcon:require('../../assets/images/toRight.png')},
          {toUrl:'',imgurl:require('../../assets/images/hometabItemicon3.png'),text:'IPCC专属教师，功能正在努力完善，详情请点击下方查看',"btnName":'了解详情',btnIcon:require('../../assets/images/zhiIcon.png')}
        ] 
    }
  },
  methods:{
    changItem(index){

       this.initTab(this.tabs);
     
       this.tabs[index]['isActive']=!this.tabs[index]['isActive'];
     
    },
    initTab(arr){
       arr.map((item,index)=>{
         item.isActive=false;
       }) 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/base.scss";
.home-tab{
    margin-top:rem(50px);
    padding:0 rem(30px);
    .tab-controller{
      border:2px  solid $color-theme;
      border-radius:rem(50px);
      height:rem(110px);
      line-height:rem(110px);
      display:flex;
      align-items:center;
      justify-content:center;
      >li{
        height:100%;
        flex:1;
        font-size:$font-size-large;
        color:#fff;
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
        }
      }
    }
    .tab-content{
      margin-top:rem(50px);
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
        height:rem(180px);
      
        }
        .tabitem-text{
          margin-top:rem(50px);
          font-size:$font-size-medium-x;
          color:#fff;
          line-height:30px;
        }
        .tab-item-btn{
         margin-top:rem(50px);
          padding:0 rem(30px);
          height:rem(110px);
          border-radius:rem(30px);
          width:60%;
          border:1px  solid  $color-sub-theme;
           display:flex;
            justify-content:center;
            align-items:center;
             flex-direction:row;
              position:relative;
              
          span{
            font-size:$font-size-large-x;
            color: $color-sub-theme;
            font-weight: bold;
          }
          img{
           position:absolute;
            top:50%;
            right:rem(30px);
            transform:translate3d(0,-50%,0);
            height:rem(50px);
            width:rem(50px);

          }
        }
      }
    }
}
</style>
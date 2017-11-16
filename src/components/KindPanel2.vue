<template>
  <div class="kind-panel">
    
        <div class="list-content">
           <div class="top">
                    <img  src="../assets/images/gtIcon.png"/>
                    <p>填写简历可以选择5项技能，其他都只能单选！</p>
            </div>
            <div class="number">{{selectSize}}/{{maxSize}}</div>
            <div class="kind-list" v-for="(v,index) in kindList" :key="index">

                  <div v-if="(index==1)"  class="list-item">
                        <div :class="['btn',{active:v.isShow}]"  @click="selectList(index)"><span>乐器</span><span class="iconfont  icon-xiangxia2"></span></div>
                        <ul class="zx-select" v-show="v.isShow">
                            <li :class="['btn',{active:xzStr=='Z'}]" @click="selectzx('Z')"><span>中</span></li>
                            <li :class="['btn',{active:xzStr=='X'}]" @click="selectzx('X')"><span>西</span></li>
                        </ul>
                        <ul class="zx-list" v-show="v.isShow">
                            <li :class="{active:sv.isSelect}" v-for="(sv,sindex) in  zxList"  @click="selectItem(index,sindex,xzStr)">{{sv.codeValue}}</li>
                        </ul>
                  </div>
                  <div v-else-if="index!=1&&index!=2" class="list-item" >
                        <div :class="['btn',{active:v.isShow}]"  @click="selectList(index)"><span>{{v.title}}</span><span class="iconfont  icon-xiangxia2"></span></div>
                        <ul class="zx-list" v-show="v.isShow">
                            <li :class="{active:sv.isSelect}" v-for="(sv,sindex) in  v['classData']"  @click="selectItem(index,sindex)">{{sv.codeValue}}</li>
                        </ul>
                  </div>
                   <div v-if="index!=2" style="margin:0 auto;width:60%;height:1px;borderBottom:1px dotted   #fff;"></div>
            </diV>
          
                
          
        </div>
     <!-- <div class="kind-list zx-list">
            <div class="list-item">
                  <div class="btn active"><span>乐器</span><span class="iconfont  icon-xiangxia2"></span></div>
                  <ul class="zx-select">
                     <li :class="['btn',{active:xzStr=='Z'}]" @click="selectzx('Z')"><span>中</span></li>
                     <li :class="['btn',{active:xzStr=='X'}]" @click="selectzx('X')"><span>西</span></li>
                  </ul>
                  <ul class="zx-list">
                      <li :class="{active:v.isSelect}" v-for="(v,index) in  zxList">{{v.codeValue}}</li>
                  </ul>
            </div>
       </diV>
            <div class="kind-list">
            <div class="list-item">
                  <div class="btn"><span>乐声</span><span class="iconfont  icon-xiangxia2"></span></div>
                  <ul class="kinds" v-show="false">
                      <li>现代舞</li>
                      <li>现代舞</li> 
                      <li>现代舞</li>        
                      <li>现代舞</li> 
                      <li>现代舞</li> 
                  </ul>
            </div>
       </diV>
        <div class="kind-list">
            <div class="list-item">
                  <div class="btn"><span>主持</span><span class="iconfont  icon-xiangxia2"></span></div>
                  <ul class="kinds" v-show="false">
                      <li>现代舞</li>
                      <li>现代舞</li> 
                      <li>现代舞</li>        
                      <li>现代舞</li> 
                      <li>现代舞</li> 
                  </ul>
            </div>
       </diV>-->
           
       
       <ul class="btns">
         
           <li  class="save" @click="kindsave()"> 
            保存
           </li>
       </ul>
  </div>
</template>

<script>
import  KindItems from './KindItems'
export default {
  name: 'KindPanel2',
  props:{
      showHid:{

      },
      kindList:{
          type:Array
      },
      maxSize:{
          type:Number,
          default:1
      },
     
  },
  data () {
    return {
     xzStr:'Z',
     listZx:[],
     isWdShowKind:false,
     selectAarray:[],
     selectSize:0
    }
  },
  computed:{
      zxList(){
        if(this.kindList.length>0){
           return this.listZx.length<=0?this.kindList[1]['classData']:this.listZx;
        }
        
      }
  },
  methods:{
    selectList(index){
         this.kindList[index].isShow=!this.kindList[index].isShow;
    //   this.kindList.map((item,index)=>{
    //       if(item.isShow=)
    //   })     
    },
    selectItem(index,sindex,xzStr){
        if(this.selectSize<this.maxSize){
           if(!xzStr||xzStr=='Z'){
            this.kindList[index]['classData'][sindex].isSelect=!this.kindList[index]['classData'][sindex].isSelect;
            }else if(xzStr&&xzStr=='X'){
                this.kindList[2]['classData'][sindex].isSelect=!this.kindList[2]['classData'][sindex].isSelect;     
            }
          
        }else{
             if(!xzStr||xzStr=='Z'){
            this.kindList[index]['classData'][sindex].isSelect=false;
            }else if(xzStr&&xzStr=='X'){
                this.kindList[2]['classData'][sindex].isSelect=false;     
            } 
        }
        this.selectTrue();
    },
    selectTrue(){
      let arr=[];
       this.kindList.map((item,idnex)=>{
           item.classData.map((sitem,sindex)=>{
              if(sitem.isSelect){
                 arr.push({"codeName":sitem.codeName,"codeValue":sitem.codeValue});
              }
           })
       })
       this.selectAarray=arr;
       this.selectSize=this.selectAarray.length;
    },
    wdShowKind(){
      this.isWdShowKind=!this.isWdShowKind;
     },
      selectzx(str){
        this.xzStr=str;
        this.listZx=this.kindList[(str=="Z"?1:2)]['classData'];
      },
      kindsave(){
        this.$emit('showHid',this.selectAarray);
      }
  },
  components:{
      KindItems
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/base.scss";
.kind-panel{
  height:100%;
  width:100%;
  background-color:$color-background;
  position:absolute;
  top:0;//rem(110px);
 
   z-index:999;
    overflow-y:auto;

    .number{
        padding:rem(20px);
        font-size:16px;
        color:#fff;
        text-align:right;
     }
  .top{
      display:flex;
      flex-direction:row;
      justify-content:center;
      align-items:center;
      text-align:center;
      padding:rem(30px) 0px;
      //margin:0 5px;
      img{
          height:rem(65px);
          margin-right:10px;
      }
      font-size:14px;
      color:$color-theme;
      border-bottom:1px  solid #fff;
  }

  .kind-list{
  
     display:flex;
     justify-content:center;
    flex-direction:column;
 
    
     
     margin:0 auto;
    //  border-bottom:1px dotted   #fff;
  
    .zx-select{
         display:flex;
         flex-direction:row;
         justify-content:center;
         align-items:center;
           margin-top:rem(40px);
         .btn{
            width:rem(220px);
            margin:rem(30px) rem(20px);
         }
       }
     .zx-list{
           display:flex;
           flex-wrap:wrap;
         
           align-items:center;
          margin-top:rem(40px);
          li{
             width:21%;
             border:2px solid $color-theme;
             font-size:16px;
             color:$color-theme;
             padding:rem(15px) 0;
             text-align:center;
             border-radius:rem(15px);
             margin:rem(15px) 2%;
             box-sizing:border-box;
             &.active{
                background:$color-theme;
               
                    color:#fff;
               
             }
           
          }
       }
     .list-item{
      position:relative;
      margin:rem(40px) 0;
      
      .btn{
         margin:0 auto;
        font-size:20px;
        font-weight:bold;
        color: $color-text;
        border:2px solid $color-text;
        height:rem(80px);
        width:rem(270px);
        border-radius:rem(20px);
        display:flex;
        align-items:center;
        text-align:center;
        position:relative;
        &.active{
            background:$color-text;
            span{
                color:#fff;
            }
        }
       span{
              color: $color-text;
        }
        span:first-of-type{
               flex:1; 
          }
         .iconfont{
           position:absolute;
           right:10px;
           font-size:rem(50px);
          
          }
        }

     }
    
  }
  .btns{
      display:flex;
      justify-content:center;
      padding:rem(70px) 0 rem(30px) 0;
  }
    .save{
        width:35%;
        color: #FFFFFF;
        background-color: #FF4545;
        border-color: #FF4545;
        padding:rem(30px) 0;
        text-align:center;
        border-radius:rem(20px);
        font-size:16px;
    }
}
</style>
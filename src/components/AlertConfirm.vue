<template>
  <div class="alert-confirm">
     <div class="alert-bg"></div>
      <div v-if="!phoneNumber&&phoneNumber==''" class="alert-box">
        <h2 class="alert-title"><img src="../assets/images/gtIcon.png"/></h2>   
        <p class="alert-content">{{alertContent}}</p>
        <div class="alert-btns">
            <a href="javascript:;" @click="cancelActive">取消</a>
            <a href="javascript:;" @click="confirmActive">确定</a>
        </div>
      </div> 
       <div v-else class="alert-box">
        <h2 class="alert-title jsalert-title">{{phoneNumber}}</h2>   
        <p class="alert-content jsalert-content">接通请说明是从IPCC上看到的信息</p>
        <div class="alert-btns">
            <a href="javascript:;" style="color:#1C74D9" @click="cancelActive">取消</a>
            <a :href="'tel:'+phoneNumber" style="color:#1C74D9" >拨打</a>
        </div>
      </div> 
  </div>
</template>

<script>
export default {
  name: 'AlertConfirm',
  props:{
     alertTitle:{
       type:String,
       required:true
     },
     alertContent:{
        type:String,
       required:true
     },
     phoneNumber:{
        type:String,
        default:''
     }
  },
  data () {
    return {
      
    }
  },
  methods:{
   cancelActive(){
      this.$emit('cancelActive');
   },
   confirmActive(){
    this.$emit('confirmActive');
   }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/base.scss";
.alert-confirm{
  position:fixed;
 top:0;
 height:100%;
 width:100%;
 overflow:hidden;
 z-index: 99999;
 .alert-bg{
   height:100%;
   width:100%;
   background:#000;
   opacity:.5;
  
 }

 .alert-box{
   position:fixed;
   top:50%;
   left:50%;
   transform:translate(-50%,-50%);
   width:80%;
   height:rem(350px);
   background:#fff;
   border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    text-align: center;
    line-height: 20px;
    font-weight: normal;
    font-style: normal;
    z-index: 5;
    opacity: 1;
    pointer-events: auto;
     color: #101010;
    overflow: hidden;
    border-color: #bbbbbb;

 .alert-title{
   
 
   font-size:20px;
   font-weight:bold;
   img{
      height:rem(150px);
   }
 }
 .jsalert-title{
   padding: rem(40px) 0;
    font-size:25px;
    color: #1C74D9;
 }
 .alert-content{
  padding:rem(30px);
  height:rem(150px);
  box-sizing:border-box; 
  font-size:18px;
 }
 .jsalert-content{
     border-top:1px solid  #bbbbbb;
     height:rem(130px);
     padding: 0;
     line-height: rem(130px);
 }

 .alert-btns{
   position:absolute;
   bottom:0;
   width:100%;
   height:rem(90px);
  
   border-top:1px solid  #bbb;
   display:flex;
    
    a{
      flex:1;
      text-align:center;
       line-height:rem(100px);
         color:#1c74d9;
         font-size: 18px;
      &:nth-of-type(2){
        border-left:1px solid #bbb;
        color:#1c74d9;
      }
    }
   }
 }

}
</style>

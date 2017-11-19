<template>
  <div class="bottom-play">
     <div class="bp-bg"></div>
         
    <div  v-if="isPay" class="alert-confirm">
      <div class="alert-bg"></div>
        <div class="alert-box">
        
          <p class="alert-content"><span class="bp-btn-number bp-content bp-btn"> {{returnPhoneNumber()}}</span></p>
          <div class="alert-btns">
              <a href="javascript:;" @click="AlertCancelActive">取消</a>
              <a :href="'tel:'+returnPhoneNumber()" >拨打</a>
          </div>
        </div>
    </div> 
  
     <!-- <div class="bp-content" v-else>
       <a  class="bp-btn bp-btn-tip" href="javascript:;">
            付费后可获取教师联系方式！
        </a>
        <a  class="bp-btn" :href="'http://www.ipengcaca.com/appsrv/weixinPaycontrollerAction.action?applType=WXPAY&feeClass=B&pinfoId='+pId+'&msgId='+msgId">
            微信支付
        </a>
     </div> -->
     <div v-if="!isPay"  class="alert-confirm">
      <div class="alert-bg"></div>
        <div class="alert-box">
        
          <p class="alert-content">支付成功后得到该教师联系方式，永久有效！</p>
          <div class="alert-btns">
              <a href="javascript:;" @click="AlertCancelActive">取消</a>
              <a href="javascript:;" @click="AlertConfirmActive">确定</a>
          </div>
        </div>
    </div>
        
 </div>
</template>

<script>

export default {
  name: 'BottomPlay',
  props:{
    isPay:{
      type:Boolean,
      default:false
      },
    phoneNumber:{
      type:String,
      phoneNumber:''
    },
    msgId:{
          
    },
  },
  data () {
    return {
      pId:'',
      isShowAlertConfirm:false
    }
  },
  mounted(){
    this.pId=GetQueryString('pinfoId');
    this.isShowAlertConfirm=this.isPay;
  },
  methods:{
     returnPhoneNumber(){
       return (this.phoneNumber==""||!this.phoneNumber)?"号码为空":this.phoneNumber;
     },
    AlertCancelActive(){
      this.$emit('cancelActive');
     },
   AlertConfirmActive(){
     //alert(api.pay+"&feeClass=B&pinfoId="+GetQueryString('pinfoId')+"&msgId="+this.msgId);
     location.href=api.pay+"&feeClass=B&pinfoId="+GetQueryString('pinfoId')+"&msgId="+this.msgId;
    }
  
  }
    
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/base.scss";
.bottom-play{
//  position:fixed;
//  top:0;
//  height:100%;
//  width:100%;
//  overflow:hidden;
  // .bp-bg{
  //    height:100%;
  //  width:100%;
  //  background:#000;
  //  opacity:.5;
  // }
}

.bp-btn{
  display:block;
  background: rgba(255,255,255,.8);
  border-color: #bbbbbb;
   border-radius: 10px;
   width:100%;
  height: rem(90px);
  line-height:  rem(90px);
}
.bp-btn.bp-btn-tip{
  margin-bottom:15px;
   border-radius: 0px;
}

.bp-content{
  width:70%;
  text-align: center;
  position: fixed;
  bottom: rem(20px);
  left: 50%;
  transform: translate(-50%, -50%);
   color: #555;
   z-index:9999;
}

.bp-btn-number {
    bottom: rem(80px);
    color:#6694ff;
}
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
   width:70%;
   height:rem(250px);
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
 .alert-content{
  padding:rem(25px);
  height:rem(90px);
  box-sizing:border-box; 
     color: rgb(122, 205, 133);
   
    font-size: 18px;
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
      &:nth-of-type(2){
        border-left:1px solid #bbb;
        color:#1c74d9;
      }
    }
   }
 }

}
</style>

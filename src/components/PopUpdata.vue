<template>
  <div class="popupdata">
        <div class="bg"></div>
 
        <div class="pop-content" v-if="showType=='typePhoneNumber'">
              <span class="iconfont  icon-guanbi"  @click="active('typePhoneNumber',phoneNumber)"></span>
              <div class="alert-content" v-show="!success">
                <h2>更换手机号码</h2>
                <span  v-show="isError" :class="['msg',{error:isError},{success:!isError}]">{{msg}}</span>
                <div class="group-input">
                        <input type="text"  v-model="phoneNumber" placeholder="请输入未注册的手机号"/>
                </div>
                <p class="save" v-show="!isShowT" @click="getcode()">获取验证码</p>
                <p class="save time" v-show="isShowT">{{time}}秒后重新获取</p>
                <div class="group-input">
                        <input type="text"  v-model="code" placeholder="请输入验证码"/>
                </div>
                <p class="save" @click="savephn()">确定</p>
              </div>
              <div  v-show="success" class="alert-content">
                  <p style="font-size:18px;color:#7ACD85">号码修改成功！</p>
              </div>
        </div> 
        <!-- <div class="pop-content pop-content-sex" v-if="showType=='typeSex'">
              <span class="iconfont  icon-guanbi"  @click="active('typeSex',sex)"></span>
              <h2>选择性别</h2>
              <div class="group-input">
                  <label>男  </label>
                  <input type="radio" v-model="sex" value="男" placeholder="请输入未注册的手机号"/>
                
                  <label>女</label>
                  <input type="radio" v-model="sex"   value="女"  placeholder="请输入未注册的手机号"/>
                  
              </div>
             
        </div>  -->
        <Prompt v-show="isPrompt"  :content="pContent" @actionPrompt="pAction"/>
  </div>
</template>

<script> 
import  Prompt   from './Prompt.vue'
export default {
  name: 'PopUpdata',
  props:{
    popActive:{
        type:Function,
       
    },
    showType:{
    type:String
 
    },
    user:{
        type:Object
    },
    phoneN:{
        default:''
    }
  },
  data () {
    return {
       phoneNumber:'',
       pContent:'',
       sex:'男',
       isPrompt:false,
       isError:false,
       msg:'',
       code:'',
       time:0,
       isShowT:false,
       success:false
    }
  },

  methods:{
     pAction(){
        this.isPrompt=false;
     },
     setTime(){
        this.isShowT=true;
        this.time=60;
         if (!this.timer) {
                this.timer = setInterval(() => {
                        if (this.time >0 && this.time <= 60) {
                            this.time--;
                        } else {
                            this.isShowT= false;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
            },1000) 
            }
     },
     getcode(){
      if(this.phoneN==this.phoneNumber){
            this.msg='该号码已被注册，请重新输入';
            this.isError=true;
            return;
       }
       if(this.phoneNumber.length!=11){
            //   this.isPrompt=true;
            //   this.pContent="输入的手机号格式有误，请重新输入";
            this.msg='输入的手机号格式有误，请重新输入';
            this.isError=true;
              
         }else{
               this.isError=false;//GetQueryString('pinfoId')+'&pinfoPhone='
               this.$http.get(api.getCode+this.phoneNumber)
               .then(response=>{
                   let data=response.data;
                
                   if(data.result=='success'){
                     //this.msg='号码修改成功';
                    // this.user.pinfoPhone=this.phoneNumber;
                     // console.log(this.user);
                     this.setTime();
                     
                   }
                  
                   //console.log(data);
               })
         }
     },
      savephn(){
       if(this.phoneNumber.length!=11){
            //   this.isPrompt=true;
            //   this.pContent="输入的手机号格式有误，请重新输入";
            this.msg='输入的手机号格式有误，请重新输入';
            this.isError=true;
            return;
         }
         if(this.code.length<=0){
            //   this.isPrompt=true;
            //   this.pContent="输入的手机号格式有误，请重新输入";
            this.msg='验证码不能为空';
            this.isError=true;
              
         }else{
               this.isError=false;//GetQueryString('pinfoId')+'&pinfoPhone='
               this.$http.get(api.checkCode+'mobileNumber='+this.phoneNumber+'&checkCode='+this.code)
               .then(response=>{
                   let data=response.data;
                  
                   if(data.result=='success'){
                     //this.msg='号码修改成功';
                    // this.user.pinfoPhone=this.phoneNumber;
                     // console.log(this.user);
                       this.setPhoneNumber();
                   }else{
                       this.msg='输入的验证码有误';
                       this.isError=true;
                   }
                 
                   console.log(data);
               })
         }
        
      },
      setPhoneNumber(){
           this.$http.get(api.pUpdata+GetQueryString('pinfoId')+'&pinfoPhone='+this.phoneNumber)
               .then(response=>{
                   let data=response.data;
                   if(data.result=='success'){
                     
                       this.success=true;
                    //    this.user.pinfoPhone=this.phoneNumber;
                     //  console.log(this.user);
                      this.$store.commit('changePhoenNumber',this.phoneNumber);
                   }
                   //console.log(data);
                   this.isShowT= false;
                   clearInterval(this.timer);
                   this.timer = null;
               })
      },
      active(str,data){
          this.$emit('popActive',[str,data]);
      }
  },
  components:{
      Prompt
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/base.scss";
.popupdata{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    .bg{
       background: rgba(0,0,0,.3);
       height: 100%;
       width: 100%; 
       z-index: 999;
    }
    .pop-content,.alert-content{
        position: fixed;
        top: 50%;
        left: 50%;
        width: 80%;
        height: rem(500px);
        background: #fff;
        transform: translate3d(-50%,-50%,0);
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        h2{
            font-size: 16px;
            padding: 10px 0;
            color: #000;
        }
        &.pop-content-sex{
             height: rem(300px);
             label{
               font-size: 16px;
             }
            .group-input{
                display: flex;
                justify-content: space-between;
                align-items: center;
                 width:50%; 
             
                input{
                    
                    border: 1px solid #bbb;
                    height:rem(50px);
                    width: rem(50px);
                 
              }
             
            }
           
        }
    }
    .group-input{
        width:70%; 
        input{
            padding-left:3px;
            border: 1px solid #bbb;
            height:rem(60px);
            width: 100%;
        }
    }
    .icon-guanbi{

          position: absolute;
          right: 10px;
          top:10px;
    }
     .save{
        
        
            margin:15px auto;
            width:50%;
            padding:8px 0;
            font-size:16px;
            color:#fff;
            background:#7ACD85;
            text-align:center;
            border-radius:5px;
      }
      .time{
           background:#a5a5a5; 
           font-size:14px;
      }
      .msg{
          margin: 3px 0 5px 0;
      }
      .success{
          color: #5cb85c ;
      }
      .error{
          color: #f00 ;
        }
}
</style>
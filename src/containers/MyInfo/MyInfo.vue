<template>
  <div class="MyInfo">
       <VHeader :isSubPage="false"   title="个人信息" :isFixed="true" />
       <div class="container">
           <ul class="top-list">
                <li>
                    <span class="name">头像</span>
                    <div class="fr">
                         <img class="avater" :src="user.pinfoUri"/>
                         <span class="iconfont   icon-xiangyou"></span>
                        <form id="upload_avatar" class="upload_avatar"   name="upload_avatar" method="post" enctype="multipart/form-data" >
                            <input type="file" name="filegCollImguri" id="filegCollImguri"  @change="postImg($event)"  accept="image/*" >
                            
                         </form>
                    </div>
                </li>
                 <li>
                    <span class="name">昵称</span>
                    <div class="fr">
                         <span  v-show="!isEdit"  class="value">{{user.pinfoSname}}</span>
                         <input  v-show="isEdit" type="text" class="changinput"  v-model="user.pinfoSname"/>
                         <span class="iconfont   icon-xiangyou"></span>
                    </div>
                </li>
                   <li>
                    <span class="name">性别</span>
                    <div class="fr">
                         <span v-show="!isEdit" class="value">{{user.pinfoSex}}</span>
                       
                            <div  v-show="isEdit" class="group-input">
                                <label>男  </label>
                                <input type="radio" v-model="user.pinfoSex" value="男" placeholder="请输入未注册的手机号"/>
                                
                                <label>女</label>
                                <input type="radio" v-model="user.pinfoSex"   value="女"  placeholder="请输入未注册的手机号"/>
                  
                           </div>
                         <span class="iconfont   icon-xiangyou"></span>
                    </div>
                </li>
           </ul> 
           <ul class="bottom-list">
                 <router-link :to="{name:'PhoneNumber'}" tag="li">
                     <span class="iconfont   icon-shouji-copy"></span>
                     <p>修改手机</p>
                 </router-link>
                 <router-link :to="{name:'TradeList'}" tag="li">
                     <span class="iconfont  icon-qian"></span>
                     <p>交易记录</p>
                </router-link>
                 <router-link :to="{name:'About'}" tag="li">
                     <span class="iconfont   icon-jinggao"></span>
                     <p>关于我们</p>
                </router-link>

           </ul>
       </div>
        <div class="fbutton" @click="edit()">
           <p class="text" v-show="!isEdit">编辑</p>
           <p class="text" v-show="isEdit">保存</p>
        </div>
       <Prompt v-show="isPrompt"  :content="pContent" @actionPrompt="pAction"/>
  </div>
</template>

<script>
import VHeader from "../../components/Header.vue";
import  Prompt   from '../../components/Prompt.vue'
import { mapState } from 'vuex'
export default {
  name: 'MyInfo',
  data () {
    return {
      isPrompt:false,
      pContent:'',
      pinfoUri:'',
      isEdit:false
    }
  },
    computed: mapState({
      user:state =>state.user
  }),

  methods:{
  edit(){
     this.isEdit=!this.isEdit;
     if(!this.isEdit){
         this.save();
     }
   },
    save(){  
    if(this.user.pinfoSex==''||this.user.pinfoSname==''){
       return  this.promptCommon("信息不能为空");
    }
      this.$http.get(api.pUpdata+GetQueryString('pinfoId')+(this.user.pinfoSex!=''?('&pinfoSex='+this.user.pinfoSex):'')+(this.user.pinfoSname!=''?('&pinfoSname='+this.user.pinfoSname):''))
            .then(response=>{
                let data=response.data;
                console.log(data);
                if(data.result=='success'){
                  this.promptCommon("信息修改成功");
                  this.$store.commit('changePinfoSex',this.user.pinfoSex);
                  this.$store.commit('changePinfoSname',this.user.pinfoSname);
                }
            })
     
   },
   promptCommon(str){
       this.pAction();
       this.pContent=str;
    }, 
   pAction(){
    this.isPrompt=!this.isPrompt;
   },
    postImg(e){
       let form= document.getElementById("upload_avatar");  
       
        let fData=new FormData(form);
        fData.append("prdImgtype",'P');
        fData.append("msgId",GetQueryString('pinfoId'));
        this.$http.post(baseUrl+'/servlet/fileUploadServlet?appType=PIMGE',fData,{headers:{'Content-Type':'multipart/form-data'}})
        .then(response=>{
           let data=response.data;
           if(data.result=="success"){
             this.$store.commit('changeImage',URL.createObjectURL(e.target.files[0]));
             this.promptCommon("头像修改成功");
           }else
           this.promptCommon("头像上传失败，请稍后重试");

      })
    }
  },
  components:{
      VHeader,
      Prompt
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/base.scss";
.MyInfo{
  min-height:100%;
  overflow-x: hidden;
  .container{
     padding-top:rem(150px);
     .top-list{
     
        background-color: $color-background;
      
        li{
           padding: 0 rem(30px);
            height: rem(180px);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #bbbbbb;
            position: relative;
            .fr{
                #upload_avatar{
                width: 100%;
                height: 100%;
                position: absolute;
                opacity: 0;
                input{
                   width: 100%;
                   height: 100%;
                 }
                }
                .changinput{
                    border: none;
                    border-bottom: 1px solid #bbb;
                    height: rem(60px);
                     font-size: 18px;
                    background:none;
                    color: #fff;
                    text-align: center;
                    
                }
                .group-input{
                    color: #fff;
                     font-size: 18px;
                }
                display: flex;
                    flex-direction: row;
                    
                    align-items: center;
               .avater{
               height: rem(120px);
               width: rem(120px);
               border-radius: 50%;
                  border-color: #FFFFFF;
               box-shadow: 0 0 20px #aaaaaa;
               }
             .icon-xiangyou{
                margin-left: rem(15px);
                font-size: rem(50px);
                 color: #7ACD85;
               }
             }
           
            .name{
                font-size: 18px;
                font-weight: bold;
                color: #7ACD85;
            }
            .value{
              font-size: 18px;
                font-weight: bold;
                color: #fff;
            }
           
        }
     }
     .bottom-list{
         margin-top:rem(40px);
         display: flex;
         flex-direction: row;
          align-items: center;
          flex-wrap: wrap;
         li{
             display: flex;
             align-items: center;
             flex-direction: column;
             justify-content: center;
             height: rem(280px);
             margin:rem(20px) 7.5%;
             width: 35%;
             border: 1px solid #bbbbbb;
             box-sizing: border-box;
             text-align: center;
             border-radius: rem(15px);
             position: relative;

             .iconfont{
                 font-size: rem(140px);
             }
           p{
               padding: rem(15px) 0;
               font-size: 16px;
           }
         }
     }
  }
  .fbutton{
       position: fixed;;
       bottom:0;
       right:0;
       height:rem(170px);
       width:rem(170px);
       border-radius: 100% 0 0 0;
       background-color:$color-theme;
       border-color:$color-theme;
   
       .text{
           width:45%;
           position:absolute;
           left:50%;
           top:50%;
           transform:translate3d(-30%,-30%,0);
           color:#222;
           font-size:rem(40px);
           font-weight:bold;
           white-space:nowrap;
       }
    }
}
</style>
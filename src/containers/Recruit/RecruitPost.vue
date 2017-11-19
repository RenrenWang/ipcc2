<template>
  <div class="recruit-post">
   <VHeader  :isSubPage="false" title="发布" :isFixed="true"/>  
       <div class="section-content">
            <div class="section">
              <h2 class="title">
                 <img src="../../assets/images/postsectionicon1.png"/>
                 <span>标题（简单明了）</span>
              </h2>    
              <input type="text" v-model="rTitle" class="input-post" placeholder="不超过10字"/>
       </div>
        <div class="section">
              <h2 class="title">
                 <img src="../../assets/images/tlisticon3.png" class="wdicon"/>
                 <span>艺术种类（您需要哪项技能的教师）</span>
              </h2>    
              <p  v-if="selectKinds.length<=0" class="input-post input-button" @click="showPanel">点击选择（该项为单选）</p>
              <p v-else class="input-post input-button" @click="showPanel">{{selectKinds[0].codeValue}}</p>
       </div> 
       <div class="section">
              <h2 class="title">
                 <img src="../../assets/images/postsectionicon3.png" />
                 <span>地址（请选择该招聘信息的工作地点）</span>
              </h2> 
              <p  class="input-post input-button"@click="isShowMap">{{rMapAddress?rMapAddress:'点击选择地址'}}</p>
     
             <!-- <input type="text"  class="input-post" @click="isShowMap" v-model="rMapAddress" placeholder="点击选择地址" />-->
              <input type="text" class="xxdz input-post" v-model="rAddress" placeholder="详细地址：8015室" />
       </div>
        <div class="section">
              <h2 class="title">
                 <img src="../../assets/images/postsectionicon2.png" />
                 <span>性别（您需要男老师还是女老师）</span>
              </h2>    
              <ul class="select-box">
                <!-- <li v-show="this.rSex=='男'" @click="selectSex('男')">
                      <img src="../../assets/images/navIcon.png"/>
                 </li>
                 <li v-show="this.rSex=='女'" @click="selectSex('男')">
                    <img src="../../assets/images/navIcon2.png"/>
                 </li>
                 <li v-show="this.rSex=='女'" @click="selectSex('女')">
                     <img src="../../assets/images/nvIcon.png"/></li>
                 <li v-show="this.rSex=='男'" @click="selectSex('女')">
                    <img src="../../assets/images/nvIcon2.png"/>
                 </li>-->
                  <li :class="{active:rSex=='男'}"  @click="selectSex('男')">
                     <span class="iconfont icon-nan5"></span>
                  </li>
                  <li :class="{active:rSex=='女'}"  @click="selectSex('女')">
                     <span class="iconfont icon-i-nv"></span>
                  </li>
              </ul>
       </div>
        <div class="section">
              <h2 class="title">
                 <img src="../../assets/images/postsectionicon4.png"/>
                 <span>工作性质（您需要兼职还是全职）</span>
              </h2>    
              <ul class="select-box gzxz">
                
                  <li :class="{active:rZKind=='C'}"  @click="selectJqz('C')">
                    <span class="iconfont   icon-quanzhirenyuan"></span>
                    <p>全职</p>
                  </li>
                  <li :class="{active:rZKind=='J'}"  @click="selectJqz('J')">
                   <span class="iconfont   icon-jianzhi"></span>
                   <p>兼职</p>
                 </li>
              </ul>
       </div>
      <div class="section" >
              <h2 class="title">
                 <img src="../../assets/images/postsectionicon5.png" />
                 <span>薪资待遇（如填写虚假薪资，IPCC将不欢迎您）</span>
              </h2>   
              <div class="xz-box" @click="showPlaceholder">
                   <textarea  class="input-post input-textarea" v-model="rmb"  placeholder="全职：2000-3000/月  兼职：200/小时   PS：特殊情况请写详细（如发现虚假信息等，该信息将会被删除）"/>
                 <!--<div class="text" v-show="isshowPlaceholder"><p>全职：2000-3000/月</p><p>兼职：200/小时</p><p>PS：特殊情况请写详细（如发现虚假信息等，该信息将会被删除）</p></div>-->
              </div> 
              
            
       </div>
         <div class="section">
              <h2 class="title">
                 <img src="../../assets/images/postsectionicon6.png"/>
                 <span>您对教师的要求与补充（请仔细填写）</span>
              </h2>    
              <textarea   v-model="workDemand" class="input-post input-textarea" placeholder="不超过100字" />
            
       </div>
         <div class="section">
              <h2 class="title">
                 <img src="../../assets/images/postsectionicon7.png"/>
                 <span>机构照片（请上传真实有效的照片）</span>
              </h2>
              <div class="img-list"> 
                   <Upload   v-show="isUpload"  @uploadFile="uploadResult"/>
              </div>
               
             <!-- <ul class="img-list">
                //    <li v-for="(v,index) in srcImgs">
                         
                   </li>
              </ul>
             <a href="javascript:;" class="postimg">点击上传</a>-->
       </div>

       </div>
        <div class="fbutton" @click="btnAction()">
           <p class="text">发布</p>
        </div>
         <Loading v-show="isLoading" :loaderNumber=1  bgColor="rgb(0, 0, .2)"/>
    <selectMapAddress v-show="isShowSelectMap" @closeSelectMap="showMap" />
  
    <KindPanel   v-show="isShowKindList" @showHid="showKindList" :kindList="kinds"/>
    <Prompt v-show="isPrompt"  :content="pContent" @actionPrompt="pAction"/>
    <BottomPlay v-show="isShowPlay"/>
    <AlertConfirm  v-show="isShowAlertConfirm"  alertTitle="提示" alertContent="招聘信息已上传，支付后教师才能看到招聘信息" @cancelActive="AlertCancelActive" @confirmActive="AlertConfirmActive"/>
    
  </div>
</template>

<script>

import VHeader from '../../components/Header.vue'

import KindPanel from '../../components/KindPanel2.vue'
import selectMapAddress from '../../components/selectMapAddress.vue'
import Prompt from '../../components/Prompt.vue'

import BottomPlay from '../../components/BottomPlay'
import Upload from '../../components/Upload'
import AlertConfirm from '../../components/AlertConfirm'
import Loading from '../../components/Loading.vue'
export default {
  name: 'recruitPost',
  data() {
    return {
      isLoading:false,
      rTitle: '',
      rmb: '',
      rClass: '',
      rSex: '男',
      rZKind: 'C',
      workDemand: '',
      postString: '',
      rAddress: '',
      rMapAddress:'',
      rMapX:"",
      rMapY:"",
      isShowPanel: false,
      kinds: [],
      selectKinds:[],
      selectKindsStr:'点击选择',
      isShowSelectMap:false,
      pContent:'',
      isPrompt:false,
      refNameArr:[],
      msgid:0,
      srcImgs:[require('../../assets/images/tx.jpeg')],
      isShowPlay:false,
      isShowAlertConfirm:false,
      imgUrl:api.imgUrl,
      isUpload:true,
      zfnums:0,
      isShowKindList:false,
      isshowPlaceholder:true
    
    }
  },

   mounted(){
    if(this.$route.query.id){
      this.getDataD();
    }
   },
   computed:{
     setmap(){
       return this.rMapAddress!=''? this.rMapAddress:'点击选择地址';
     }
   },
  methods: {

    showPlaceholder(){
         this.isshowPlaceholder=false;
    },
    showKindList(arr){
   
       this.isShowKindList=!this.isShowKindList;
       this.selectKinds=arr;
    },
    reUpload(){
   this.isUpload=!this.isUpload;
    },
    getDataD(){
    this.$http.get(api.recruitD+this.$route.query.id)//this.$route.params.id
       .then(response=>{
             let data=response.data;
          console.log(data);
              this.rTitle=data.data[0].infoTitle;
               this.rZKind=data.data[0].titleClassname=="全职"?"C":"J";
               this.rSex=data.data[0].pinfoSex;
               this.selectKindsStr=data.data[0].titleExt1name;
               this.rAddress=data.data[0].infoAddr;
               this.rmb=data.data[0].salaryClassname;
               this.workDemand=data.data[0].titleSimdesc;
               this.selectKinds=[{selectIndex:-1,data:{codeValue:data.data[0].titleExt1name,codeName:data.data[0].titleExt1}}];
               this.srcImgs=data.imgData;
               this.rMapAddress=data.data[0].mapAddr;
               this.zfnums=data.data[0].zfnums;
               if(this.srcImgs.length>0){
                  this.isUpload=false;
               }
       })
    },
  AlertCancelActive(){
      this.isShowAlertConfirm=false;
  },
  AlertConfirmActive(){
    
     location.href=api.pay+"&feeClass=A&pinfoId="+GetQueryString('pinfoId')+"&msgId="+this.msgid;

  },
  toPay(){

    location.href=api.pay+"&feeClass=A&pinfoId="+GetQueryString('pinfoId')+"&msgId="+this.msgid;
  },
  uploadResult(arr){
     console.log(arr);
     this.refNameArr=arr;
  },
    postImg(refId){

      let arr=[];
    for(let i=0;i<this.refNameArr.length;i++){
        let form= document.getElementById("upload_"+i);  
        //this.$refs.refId
        let fData=new FormData(form);
        fData.append("prdImgtype",'A');
        fData.append("msgId",this.msgid);
        arr.push(this.$http.post(baseUrl+'/servlet/fileUploadServlet?appType=PIMGE',fData,{headers:{'Content-Type':'multipart/form-data'}}));
      }

       this.$http.all(
          arr
       ).then(this.$http.spread((acct,perms)=> {
              // Both requests are now complete
            this.isLoading=false;
           if((!this.$route.query.id&&this.$route.query.id<=0)||this.zfnums!=1){
                // this.isShowAlertConfirm=true;
                  this.toPay();
           }else{
              this.promptCommon('信息修改成功');
               
           }
            console.log(acct);
             console.log(perms);
        }));
    // alert(JSON.stringify(response.data));
          // console.log(response.data);

        //   console.log("------------------"+fData1==fData2);
        //  console.log("------------------"+fData2==fData3);
        //   console.log("------------------"+fData1==fData3);
        // this.$http.post(baseUrl+'/servlet/fileUploadServlet?appType=PIMGE',fData1,{headers:{'Content-Type':'multipart/form-data'}})
        // .then(response=>{
        //         this.$http.post(baseUrl+'/servlet/fileUploadServlet?appType=PIMGE',fData2,{headers:{'Content-Type':'multipart/form-data'}})
        //     .then(response=>{
        //        this.$http.post(baseUrl+'/servlet/fileUploadServlet?appType=PIMGE',fData3,{headers:{'Content-Type':'multipart/form-data'}})
        //         .then(response=>{
                    
        //         })   
        //     })   
        // })      
  
   },
    promptCommon(str){
       this.pAction();
       this.pContent=str;
    },
    pAction(){
     this.isPrompt=!this.isPrompt;
    },
    isShowMap(){
      
      this.isShowSelectMap=!this.isShowSelectMap;
      if(this.isShowSelectMap){
        window.addEventListener("message",(e)=>{
         console.log('您选择了:' + JSON.stringify(e.data));
            this.isShowSelectMap=!this.isShowSelectMap;
            this.showMap([e.data.name,e.data.location]);
          //this.$emit('closeSelectMap',[e.data.name,e.data.location]);
        }, false);
      }
        
    },
    showMap(arr){
      if(arr){
      this.isShowSelectMap=false;
       this.rMapAddress=arr[0];
       let xy=arr[1].split(',');
       this.rMapX=xy[0];
       this.rMapY=xy[1];
      }
      
    },

    // postImg(id){
       
    //     //console.log("---------"+id);
    //     this.$http.post('/appsrv/servlet/fileUploadServlet?appType=PIMGE',{
    //       // "name":"filegCollImguri",
    //       "msgid":id,
    //       "prdImgtype":'a',
    //       "fileImg":this.picValue
    //     },{headers:{'Content-Type':'multipart/form-data'}})
    //     .then(response=>{
    //       console.log(response.data);
    //     })
    // },
  selectKindsAction() {
       
      let kindStr = '';
     
     
      switch(this.selectKinds.length) {
        case 5:
          kindStr += this.selectKinds[4]['data']['codeValue'] + '、';

        case 4:
          kindStr += this.selectKinds[3]['data']['codeValue'] + '、';

        case 3:
          kindStr += this.selectKinds[2]['data']['codeValue'] + '、';

        case 2:
          kindStr += this.selectKinds[1]['data']['codeValue'] + '、';

        case 1:
          kindStr += this.selectKinds[0]['data']['codeValue'] + '、';
          break;
        case 0:

          kindStr='点击选择';
      }
      this.selectKindsStr=kindStr.slice(0,-1);
    },
    getKindsData() {

      this.$http.get(api.kindList)
        .then(response => {
          let data = response.data;
          data.fieldsData.map((item, index) => {
             item.isShow=false;
            item.classData.map((sitem, sindex) => {
              sitem.isSelect = false;
            })
          })

          this.kinds = data.fieldsData;
        })
    },
    showPanel() {
      if (!this.kinds || this.kinds.length <= 0)
       this.getKindsData();
       this.isShowKindList = !this.isShowKindList;
    },
    ishowKindPanel(setArray) {
      this.selectKinds = setArray;
      this.isShowPanel = !this.isShowPanel;
     
      this.selectKindsAction();
    },
    selectSex(sex) {
      this.rSex = sex;
    },
    selectJqz(str) {
      this.rZKind = str;
    },
    postRecruit(str) {
        this.isLoading=true;
      console.log(api.recruitAddAOrRevise + str+'&pinfoId='+GetQueryString('pinfoId'));
      this.$http.get(api.recruitAddAOrRevise + str+'&pinfoId='+GetQueryString('pinfoId'))
        .then(response => {
          // console.log(JSON.stringify(response.data));
          if (response.data.result == "success") {
            
           
              //response.data.infoIds
              //this.postImg();
              this.msgid=response.data.infoIds;
         
                 if(this.msgid>0&&this.refNameArr.length>0){
                 
                  //  document.getElementById("submit").click();
               
                      this.postImg();
                              
                    }else{
                       this.isLoading=false;
                     
                      if((!this.$route.query.id&&this.$route.query.id<=0)||this.zfnums!=1){
                         // this.isShowAlertConfirm=true;
                           this.toPay(); 
                      }else{
                          this.promptCommon('信息修改成功');
                           // this.toPay();
                      }
                      
                     
                 }
                  

          }else{
              this.isLoading=false;
             this.promptCommon('发布失败');
          }
        })
    },


    btnAction() {

        
      if (this.rTitle == '' || !this.rTitle) {
         this.promptCommon('标题不能为空');
        return;
      }
      if (this.rTitle.length > 10) {
        this.promptCommon('标题不能超过十个字');
        return;
      }
      let kindStr = '';
      console.log(this.selectKinds);
      switch (this.selectKinds.length) {
        case 5:
          kindStr += '&titleExt5=' + this.selectKinds[4]['codeName'];

        case 4:
          kindStr += '&titleExt4=' + this.selectKinds[3]['codeName'];

        case 3:
          kindStr += '&titleExt3=' + this.selectKinds[2]['codeName'];

        case 2:
          kindStr += '&titleExt2=' + this.selectKinds[1]['codeName'];

        case 1:
          kindStr += '&titleExt1=' + this.selectKinds[0]['codeName'];
          break;
        case 0:
          this.promptCommon('艺术种类不能为空');
          return;
      }
           
   
        if (this.rAddress == '' || !this.rAddress||this.rMapAddress == '') {
          this.promptCommon('请地址不完整');
          return;
        }
       if(this.rmb== '' || !this.rmb){
          this.promptCommon('薪资待遇不能为空');
          return;
       }
      //  if((this.rmb)){
      //     this.promptCommon('薪资待遇格式有误');
      //     return;
      //  }

      if (this.workDemand == '' || !this.workDemand) {
        this.promptCommon('内容不能为空');
        return;
      }
      if (this.workDemand.length > 100) {
        this.promptCommon('内容不能超过100个字');
        return;
      }
        let xzdy='';
        if(this.rZKind=="C"){
           xzdy=this.rmb;//+'元/月';

        }else if(this.rZKind=="J"){
           xzdy=this.rmb;//+'元/小时';
        }
 
      
      this.postString = 'infoTitle=' + this.rTitle + '&titleClass=' + this.rZKind + '&salaryClass='+xzdy+'&titleDesc=' + this.workDemand + '&titleAddr=' +this.rAddress +'&mapAddr='+ this.rMapAddress+ '&mapAxis='+this.rMapX+'&mapAyis='+this.rMapY+'&titleSex=' + this.rSex + kindStr +(this.$route.query.id?('&infoIds='+this.$route.query.id):'');
      console.log(this.postString);
    //  this.isShowPlay=!this.isShowPlay;
      this.postRecruit(this.postString);
    }
  },
  components: {
    VHeader,

    KindPanel,
    selectMapAddress,
    Prompt,
    Loading,
    BottomPlay,
    Upload,
    AlertConfirm
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/base.scss";
.recruit-post{
  
   background:$color-background;
   width:100%;
   height:100%;
  overflow-x:hidden;
     .section-content{
         padding-top:rem(165px);
         padding-bottom:rem(180px);
     }
    .section{
          margin-bottom:rem(65px);
          padding:0 rem(30px);
          display:flex;
          flex-direction:column;
        
        .title{
            display:flex;
           align-items:center;
            span{
            margin-left:rem(20px);
            color:$color-theme;
            font-size:$font-size-medium-x;
            }
            img{
            height:rem(65px);
                &.wdicon{
                   height:rem(90px);   
                }
            }
        }
       
        .input-post{
         margin-top:rem(40px);
         text-align:center;
          display:block;
          padding-left:5px;
          min-height:rem(100px);
          border-radius:rem(25px);
         
          background:#fff;
          font-size:$font-size-medium-x;
          outline:none;
          border:none;
          &.input-button{
            color:#bbb;
            line-height:rem(100px);
          }
          &.xxdz{
              margin-top:rem(45px);
          }
          &.input-textarea{
              display:table-cell;
              min-height:rem(250px);
              width:95%;
              margin-left:auto;
              margin-right:auto;
              resize:none;
              vertical-align: middle;
              white-space: normal;
            text-align: justify;
            -moz-text-align-last: center; /* Firefox 12+ */
            text-align-last: center;
            vertical-align:middle;
          }
        }
        .select-box{
            display:flex;
            justify-content:center;
            margin-top:rem(30px);
            li{
                background:#fff;
                width:rem(170px);
                height:rem(170px);
                display:flex;
                align-items:center;
                justify-content:center;
                margin:0 rem(40px);
                border-radius:rem(30px);
              
                .iconfont {
                   font-size:rem(130px);
                }
                 &.active{
                   .iconfont.icon-nan5{
                     color:#1296db;
                   }
                   .iconfont.icon-i-nv{
                     color:#ff69c2;
                   }
                }
            }
            &.gzxz{
                li{
                  display:flex;
                   flex-direction:column;
                     background:none;
                     font-size:$font-size-large;
                     color:#fff;
                     p{
                        margin-top:rem(25px);
                     }
                    &.active{
                      .iconfont,p{
                        color:$color-theme;
                      }
                    }
                }
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
        .postimg{
            display:block;
            border:1px solid  $color-theme;
           font-size:$font-size-medium-x;
            color:$color-theme;
            padding:rem(20px) rem(50px);
            width:rem(200px);
            border-radius:rem(20px);
            text-align:center;
            margin:rem(40px)  auto;
        }
    }
     .fbutton{
       position:absolute;
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
    .xz-box{
      position:relative;
      width:80%;
      margin:0 auto;
   
      
       .input-textarea{
         width:100%;
         text-align:center;
        padding:rem(20px);
         vertical-align:center;
         display:table;
          #textArea::-webkit-input-placeholder{
             line-height:rem(250px);
             height:rem(250px);
           }  
       }
       
      .text{
        text-align:center;
        position:absolute;
        width:95%;
        top:50%;
        left:50%;
        transform:translate3d(-50%,-50%,0);
        color:#888888;
        font-size:16px;
        line-height:rem(60px);
      }
    }
    textarea::-webkit-input-placeholder{
        color:#888888;
    }
}
</style>
<template>
  <div class="resume-post">
       <VHeader :isSubPage="false" title="上传简历" :isFixed="true" />
       <div class="post-content">
           <div class="top">
               <h1>填写简历</h1>
               <span class="iconfont icon-wangguan-"></span>
           </div>
           <div class="xx-list">
               <div class="x-item">
                     <span class="iconfont icon-geren"></span>
                     <div class="input-box">
                        <input type="text"  class="text-input"  v-model="name" placeholder="真实姓名"/>
                     </div>
               </div>
                <div class="x-item">
                     <span class="iconfont icon-nianling"></span>
                     <div class="input-box" @click="ShowPicker('age')">
                        <input type="text"  class="text-input"   v-model="age" disabled="disabled" placeholder="选择"/>
                     </div>
               </div>
                <div class="x-item">
                     <span class="iconfont icon-xuexiao-copy"></span>
                     <div class="input-box">
                        <input type="text"  class="text-input"  v-model="school"  placeholder="毕业院校"/>
                     </div>
               </div>
                <div class="x-item">
                     <span class="iconfont icon-jingyan"></span>
                     <div class="input-box"  @click="ShowPicker">
                        <input type="text"  class="text-input"  v-model="jobYear" disabled="disabled" placeholder="工作经验"/>
                     </div>
               </div>
                <div class="x-item">
                     <span class="iconfont icon-dizhi"></span>
                     <div class="input-box" @click="selectAddressCity">
                        <input type="text" class="text-input"  v-model="jobAddress" disabled="disabled" placeholder="希望在哪工作"/>
                     </div>
               </div>
           </div>
           <div class="line"></div>
             <div class="section">
                <h2 class="title">
                   <span class="iconfont icon-dengpao"></span>
                    <span>希望全职还是兼职</span>
                </h2>    
                <ul class="select-box ">
                   <li :class="{active:rZKind=='C'}"  @click="selectJqz('C')">
                       全职
                    </li>
                    <li :class="{active:rZKind=='J'}"  @click="selectJqz('J')">
                       兼职
                  </li>
                </ul>
           </div>
           <div class="line"></div>
              <div class="section">
                <h2 class="title">
                   <span class="iconfont icon-logo"></span>
                    
                </h2>    
                <div class="add-kind" @click="showPanel">
                    <span class="iconfont icon-jia"></span>
                    <span>选择你的专业技能</span>
                </div>
                <ul class="select-box ">
                   <li  v-for="(v,index) in  selectKinds">
                     {{v.codeValue}}
                    </li>
                  
                </ul>
           </div>
            <div class="line"></div>
             <div class="section">
              <h2 class="title">
                 <span class="iconfont icon-wenjian"></span>
                 <span>个人简介</span>
              </h2>    
              <textarea   v-model="resumeText" class="input-post input-textarea" placeholder="不超过100字" />
            
       </div>
         <div class="line"></div>
         <div class="section">
              <h2 class="title">
                  <span class="iconfont icon-zhaoxiang"></span>
                   <span>艺术照</span>
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
       <div class="fbutton" @click="save()">
           <p class="text">发布</p>
        </div>
       <picker v-model="visible" :data-items="items" @change="onValuesChange"></picker>
    
	<!--<div class="top-content" slot="top-content">Top of the content.</div>
	<div class="bottom-content" slot="bottom-content">Bottom of the content.</div>-->
        <Loading v-show="isLoading" :loaderNumber=1  bgColor="rgb(0, 0, .2)"/>
        <!-- <FooterButton  btnName="上传" @fBtnAction="save()"/> -->
        <KindPanel :maxSize=5  v-show="isShowPanel" @showHid="ishowKindPanel" :kindList="kinds"/> 
        <Prompt v-show="isPrompt"  :content="pContent" @actionPrompt="pAction()"/>
      
  </div>
</template>

<script>
import VHeader from "../../components/Header.vue";

import KindPanel from "../../components/KindPanel2.vue";
import Prompt from "../../components/Prompt.vue";
import picker from "vue-3d-picker";
import Upload from "../../components/Upload";
import Loading from "../../components/Loading.vue";
export default {
  name: "ResumePost",
  data() {
    return {
      isLoading: false,
      name: "",
      jobAddress: "",
      age: "",
      school: "",
      rZKind: "C",
      resumeText: "",
      jobYear: "",
      isShowPanel: false,
      kinds: [],
      selectKinds: [],
      pContent: "",
      isPrompt: false,
      visible: false,
      istr: "",
      msgid: 0,
      srcImgs: [],
      isUpload: true,
      imgUrl: api.imgUrl,
      items: [
        {
          values: [
            "1880",
            "1880",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007"
          ]
        },
        {
          values: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
          ]
        }
      ],
      refNameArr: [],
      isSave: false
    };
  },

  mounted() {
    if (this.$route.query.id) {
      this.getDataD();
    }
  },

  methods: {
    reUpload() {
      this.isUpload = !this.isUpload;
    },
    getDataD() {
      this.$http
        .get(api.presumeD + this.$route.query.id) //this.$route.params.id
        .then(response => {
          let data = response.data;
          console.log(data);
          let sdata = data.data[0];
          this.school = sdata.collName;
          this.jobAddress = sdata.pinfoIdea;
          this.jobYear = sdata.teacherYear;
          this.age = sdata.pinfoBirthday;
          this.name = sdata.pinfoPname;
          this.rZKind = sdata.titleClassname == "兼职" ? "J" : "C";
          this.resumeText = sdata.pinfoNote;

          if (sdata.titleExt1name != "" && sdata.titleExt1name) {
            // [{selectIndex:-1,data:{codeValue:data.data[0].titleExt1name,codeName:data.data[0].titleExt1}}];
            this.selectKinds.push({
                codeValue: sdata.titleExt1name,
                codeName: sdata.titleExt1
              });
          }
          if (sdata.titleExt2name != "" && sdata.titleExtname) {
            this.selectKinds.push({
              selectIndex: -1,
              data: {
                codeValue: sdata.titleExt2name,
                codeName: sdata.titleExt2
              }
            });
          }
          if (sdata.titleExt1name != "" && sdata.titleExt3name) {
            this.selectKinds.push({
           
                codeValue: sdata.titleExt3name,
                codeName: sdata.titleExt3
             
            });
          }
          if (sdata.titleExt4name != "" && sdata.titleExt4name) {
            this.selectKinds.push({
           
                codeValue: sdata.titleExt4name,
                codeName: sdata.titleExt4
             
            });
          }
          if (sdata.titleExt5name != "" && sdata.titleExt5name) {
            this.selectKinds.push({
            
                codeValue: sdata.titleExt5name,
                codeName: sdata.titleExt5
            
            });
          }
          this.srcImgs = data.imgData;
          if (this.srcImgs.length > 0) {
            this.isUpload = false;
          }
          // this.rTitle=data.data[0].infoTitle;
          //  this.rZKind=data.data[0].titleClassname=="全职"?"C":"J";
          //  this.rSex=data.data[0].pinfoSex;
          //  this.selectKindsStr=data.data[0].titleExt1name;
          //  this.rAddress=data.data[0].infoAddr;
          //  this.rmb=data.data[0].salaryClassname;
          //  this.workDemand=data.data[0].titleSimdesc;
          //  this.selectKinds=[{codeValue:data.data[0].titleExt1name,codeName:data.data[0].titleExt1}];
          //  this.srcImgs=data.imgData;
          //  if(this.srcImgs.length>0){
          //     this.isUpload=false;
          //  }
        });
    },

    uploadResult(arr) {
      console.log(arr);
      this.refNameArr = arr;
    },

    postImg() {
      let arr = [];
      for (let i = 0; i < this.refNameArr.length; i++) {
        let form = document.getElementById("upload_" + i);
        //this.$refs.refId
        let fData = new FormData(form);
        fData.append("prdImgtype", "B");
        fData.append("msgId", this.msgid);
        arr.push(
          this.$http.post(
            baseUrl + "/servlet/fileUploadServlet?appType=PIMGE",
            fData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
        );
      }

      this.$http.all(arr).then(
        this.$http.spread((acct, perms) => {
          // Both requests are now complete
          //  this.isShowAlertConfirm=true;
          // this.isSave=true;
          this.isLoading = false;
          if (!this.$route.query.id ||this.$route.query.id <= 0) {
            this.promptCommon("信息上传成功");
          } else {
            this.promptCommon("信息修改成功");
          }

          console.log(acct);
          console.log(perms);
        })
      );
    },
    selectAddressCity() {
      AMapUI.loadUI(["misc/MobiCityPicker"], MobiCityPicker => {
        var cityPicker = new MobiCityPicker();

        cityPicker.show();

        // AMap.event.addDomListener(document.getElementById('openBtn'), 'click', function(e) {

        //     cityPicker.show();
        // });
        cityPicker.on("citySelected", cityInfo => {
          //隐藏城市列表
          cityPicker.hide();
          this.jobAddress = cityInfo.name;
          //选中的城市信息
          console.log(JSON.stringify(cityInfo));
        });
      });
      this.isSelectAddressCity = !this.isSelectAddressCity;
    },

    vdate() {
      let date = new Date();
      let nowYear = date.getFullYear();
      let arrYear = [];
      let arrMouth = [];
      let arrDay = [];
      for (let i = nowYear; i >= 1970; i--) {
        arrYear.push(i);
        for (let t = 12; t >= 1; t--) {
          arrMouth.push(t);
          for (let n = 1; n <= this.mGetDate(i, t); n++) {
            arrDay.push(n);
          }
        }
      }

      this.items = [
        { values: arrYear },
        { values: arrMouth },
        { values: arrDay }
      ]; //,{values:arrDay}
    },

    vyear() {
      let arr = ["1年", "2年", "3年", "4年", "5年", "5年以上"];

      this.items = [{ values: arr }];
    },
    ShowPicker(str) {
      this.istr = str;
      this.visible = !this.visible;
      if (str == "age") {
        this.vdate();
      } else {
        this.vyear();
      }
    },
    onValuesChange(result1, result2, result3) {
      if (this.istr == "age") {
        this.age = result1 + "-" + result2 + "-" + result3;
      } else {
        this.jobYear = result1;
      }
    },

    mGetDate(year, month) {
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    promptCommon(str) {
      this.isPrompt = true;
      this.pContent = str;
    },
    pAction() {
      if (this.isSave) {
        location.href = baseUrl + "/wx_banding?applClass=T";
      }
      this.isPrompt = !this.isPrompt;
    },
    selectJqz(str) {
      this.rZKind = str;
    },
    save() {
      if (this.name == "" || !this.name) {
        this.promptCommon("姓名不能为空");
        return;
      }
      if (this.age == "" || !this.age) {
        this.promptCommon("年龄不能为空");
        return;
      }
      // if (isNaN(this.age)){
      //    this.promptCommon('年龄格式有误');
      //   return;
      // }
      if (this.school == "" || !this.school) {
        this.promptCommon("毕业学校不能为空");
        return;
      }
      if (this.jobAddress == "" || !this.jobAddress) {
        this.promptCommon("希望在哪里工作不能为空");
        return;
      }
      if (this.jobYear == "" || !this.jobYear) {
        this.promptCommon("工作经验不能为空");
        return;
      }

      let kindStr = "";
      switch (this.selectKinds.length) {
        case 5:
          kindStr += "&titleExt5=" + this.selectKinds[4]["codeName"];

        case 4:
          kindStr += "&titleExt4=" + this.selectKinds[3]["codeName"];

        case 3:
          kindStr += "&titleExt3=" + this.selectKinds[2]["codeName"];

        case 2:
          kindStr += "&titleExt2=" + this.selectKinds[1]["codeName"];

        case 1:
          kindStr += "&titleExt1=" + this.selectKinds[0]["codeName"];
          break;
        case 0:
          this.promptCommon("请选择擅长");
          kindStr = "";
          return;
      }
      this.kindStr = kindStr;
      if (this.resumeText.length <= 0) {
        this.promptCommon("个人介绍不能为空");
        return;
      }

      let str =
        "titleClass=" +
        this.rZKind +
        "&pinfoPname=" +
        this.name +
        "&pinfoBirthday=" +
        this.age +
        "&teacherYear=" +
        this.jobYear +
        "&collName=" +
        this.school +
        "&pinfoIdea=" +
        this.jobAddress +
        "&pinfoNote=" +
        this.resumeText +
        this.kindStr +
        "&pinfoId=" +
        GetQueryString("pinfoId") +
        (this.$route.query.rsmIds > 0
          ? "&rsmIds=" + this.$route.query.rsmIds
          : "");
      console.log(str);
      this.postResume(str);
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
      if (!this.kinds || this.kinds.length <= 0) this.getKindsData();
      this.isShowPanel = !this.isShowPanel;
    },
    ishowKindPanel(setArray) {
      this.selectKinds = setArray;
      this.isShowPanel = !this.isShowPanel;
    },

    postResume(str) {
      this.isLoading = true;

      this.$http.get(api.resumePost + str).then(response => {
        if (response.data.result == "success") {
          this.msgid = response.data.rsmIds;
          if (this.msgid > 0 && this.refNameArr.length > 0) {
            //  document.getElementById("submit").click();

            this.postImg();
          } else {
            this.isLoading = false;

            if (!this.$route.query.id ||this.$route.query.id <= 0) {
                 this.promptCommon("信息上传成功");
            } else {
              

                this.promptCommon("信息修改成功");
            }
          }
          //  if(this.msgid>0&&this.refNameArr.length>0){
          //    //document.getElementById("submit").click();
          //        this.postImg();
          //     }else{
          //       //this.isSave=true;

          //        this.promptCommon('信息上传成功');
          //        //this.isShowAlertConfirm=true;
          //     }
        }
      });
    }
  },
  components: {
    VHeader,

    KindPanel,
    Prompt,
    picker,
    Upload,
    Loading
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/base.scss";
.resume-post {
  background: $color-background;
  min-height: 100%;
  .line {
    margin: rem(60px) auto 0 auto;
    width: 45%;
    border-bottom: 1px $color-theme dashed;
  }
  .post-content {
    position: fixed;
    top: rem(120px);
    bottom: 0;
    padding-bottom:rem(190px);
    width: 100%;
    overflow-y: auto;
    .top {
      display: flex;
      flex-direction: row;
      justify-content: center;
      position: relative;

      h1 {
        color: #7acd85;
        border: 3px solid #7acd85;
        height: rem(90px);
        line-height: rem(90px);
        font-size: 22px;
        width: 60%;
        text-align: center;
        font-weight: bold;
        border-radius: rem(45px);
      }
      .iconfont {
        position: absolute;
        right: rem(15px);
        font-size: rem(90px);
        color: rgb(233, 168, 7);
      }
    }
    .xx-list {
      .x-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: relative;
        width: 100%;
        margin: rem(40px) 0;
        .input-box {
          width: 60%;
          .text-input {
            padding: 5px;
            height: rem(80px);
            outline: none;
            border: 1px solid #eee;
            border-radius: rem(20px);
            width: 100%;
            padding-left: 3px;
            text-align: center;
            background: #fff;
          }
        }

        .iconfont {
          position: absolute;
          left: rem(40px);
          font-size: rem(80px);
          color: #7acd85;
        }
      }
    }
    .section {
      margin-top: rem(60px);
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 16px;
        color: #7acd85;
        .iconfont {
        font-size: rem(65px);
          &.icon-zhaoxiang{
            font-size: rem(50px);
          }
          &.icon-logo{
           font-size: rem(90px);
          }
        }
      }
      
      .add-kind {
        margin-top: rem(60px);
        width: 70%;
        border: 1px solid #ff9800;
        color: #ff9800;
        font-size: 16px;
        padding: rem(20px) 0;
        text-align: center;
        .iconfont {
          font-size: rem(50px);
        }
      }
      .img-list{
        margin-top:rem(60px);
        width: 80%;
      }
      .select-box {
        margin-top: rem(60px);
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        li {
          margin: rem(10px) rem(20px);
          text-align: center;
          border: 1px solid #7acd85;
          font-size: 16px;
          color: #7acd85;
          width: rem(200px);
          padding: rem(20px) 0;
          border-radius: rem(20px);
          &.active {
            background: #7acd85;
            color: #fff;
          }
        }
      }
      .input-textarea{
        margin-top:rem(60px);
              display:table-cell;
              min-height:rem(250px);
              width:80%;
              margin-left:auto;
              margin-right:auto;
              resize:none;
              vertical-align: middle;
              white-space: normal;
            text-align: justify;
            -moz-text-align-last: center; /* Firefox 12+ */
            text-align-last: center;
            vertical-align:middle;
            border-radius: rem(30px);
             padding: 5px;
          }
    }
  }
    .fbutton{
       position:absolute;
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
    }
}
</style>

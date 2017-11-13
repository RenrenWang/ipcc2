<template>
  <div class="resume-item">
    <div class="item-top">
          <img  :src="resume.pinfoUri" class="avatar"/>
          <span class="item-name">{{resume.pinfoPname}}</span>
          <div class="age-sex">
               <img src="../assets/images/navIcon.png"/>
               <span>{{setAge(resume.pinfoBirthday)}}</span>
          </div>
          
       </div>
      <div class="item-content">
          <div class="ic-left">
              <ul  class="kind-list">
                    <li>
                        <img src="../assets/images/schoolicon.png"/>
                        毕业院校：{{resume.collName}}</li>
                    <li> <img src="../assets/images/exp.png"/>教学经验：{{resume.teacherYear}}</li>
               </ul>
              <ul class="jn-list">
                    <li v-if="resume.titleExt1name&&resume.titleExt1name!=''">{{resume.titleExt1name}}</li>
                   <li v-if="resume.titleExt2name&&resume.titleExt2name!=''">{{resume.titleExt2name}}</li>
                   <li v-if="resume.titleExt3name&&resume.titleExt3name!=''">{{resume.titleExt3name}}</li>
                   <li v-if="resume.titleExt4name&&resume.titleExt4name!=''">{{resume.titleExt4name}}</li>
                   <li v-if="resume.titleExt5name&&resume.titleExt5name!=''">{{resume.titleExt5name}}</li>
                </ul>
          </div>
          <p class="jqz-tips">{{resume.titleClassname}}</p>
      </div>
     
  </div>
</template>

<script>
export default {
  name: "ResumeItem",
  props: {
    resume: {
      required: true,
      jnList: []
    }
  },

  methods: {
    setAge(date) {
     // let age =
       let age = parseInt(date.split('-')[0]) - parseInt(new Date().getFullYear());
        age=age>0?age:-age;
        return age + 1 + "岁";
    },
    titleExt() {
      let resume = this.resume;
      str += resume.titleExt1name ? resume.titleExt1name + "、" : "";
      str += resume.titleExt2name ? resume.titleExt2name + "、" : "";
      str += resume.titleExt3name ? resume.titleExt3name + "、" : "";
      str += resume.titleExt4name ? resume.titleExt4name + "、" : "";
      str += resume.titleExt5name ? resume.titleExt5name + "、" : "";
      return str.slice(0, -1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/base.scss";
.resume-item {
  margin-top: rem(60px);

  background: $color-background;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding: rem(20px);
  box-shadow: 0 0 12px #101010;
  border-radius: 15px;
  position: relative;
  &:first-of-type {
    margin-top: 0;
  }
  .avatar {
    position: absolute;
    top: rem(-35px);
    left: -10px;
    height: rem(100px);
    width: rem(100px);
    border: 2px #ffffff solid;
    box-shadow: 0 0 20px #aaaaaa;
    border-radius: 50%;
  }

  .item-top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-bottom: rem(35px);
    border-bottom: 1px $color-theme dashed;
    .item-name {
      font-size: $font-size-medium-x;
      font-weight: bold;
      color: #fff;
      padding-left: rem(100px);
    }
    .age-sex {
      display: flex;
      align-items: center;
      font-size: $font-size-medium-x;
      font-weight: bold;
      color: #fff;
      img {
        margin-right: rem(15px);
        height: rem(40px);
      }
    }
  }
  .item-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .ic-left {
      flex: 1;
      margin-right: rem(15px);
      .kind-list {
        font-size: $font-size-medium;
        color: $color-theme;
        li {
          margin: rem(20px) 0;
          display: flex;
          align-items: center;

          img {
            margin-right: rem(25px);
            height: rem(55px);
          }
        }
      }
      .jn-list {
        display: flex;
        flex-wrap: wrap;
        li {
           overflow: hidden;
           white-space:nowrap;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
          border: 1px solid #fff;
          padding: rem(10px) rem(15px);
          font-size: $font-size-medium;
          color: #fff;
          border-radius: rem(15px);
          width: 22%;
          text-align: center;
          margin: 0 rem(15px) rem(15px) 0;
        }
      }
    }
    .jqz-tips {
      align-self: flex-end;
      height: rem(60px);
      line-height: rem(60px);
      width: rem(150px);
      color: #ffc800;
      background-color: #363636;
      border-color: #ff9800;
      box-shadow: 0 0 10px #ff9800;
      border-radius: rem(20px);
      font-size: 18px;
      text-align: center;
    }
  }
}
</style>
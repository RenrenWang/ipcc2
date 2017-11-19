<template>
  <div class="About">
        <VHeader :isSubPage="false"   title="关于我们" :isFixed="true" />
        <div class="container">
              <div  class="content">{{content}}</div>
        </div>
  </div>
</template>

<script>
import VHeader from "../../components/Header.vue";
export default {
  name: 'About',
  data () {
    return {
      content: ''
    }
  },
  mounted(){
    this.$http(api.About)
    .then(response=>{
      let data=response.data;
      this.content=data.cusInstr;
    })
  },
  components:{
     VHeader 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/base.scss";
.About{
  min-height:100%;
 background: #fff;
  .container{
     padding-top:rem(120px);
     .content{
         padding:rem(30px);
         font-size: 18px;
         line-height: 30px;
         text-indent: 30px;
     }
  }
}
</style>
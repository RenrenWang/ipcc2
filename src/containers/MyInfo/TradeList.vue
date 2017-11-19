<template>
  <div class="TradeList">
       <VHeader :isSubPage="false"   title="交易记录" :isFixed="true" />
        <div class="container">
              <ul class="list">
                  <li v-for="(v,index) in jlData">
                      <div class="fl">
                           <p>发布</p>
                           <p class="time">{{v.zfDate}}</p>
                      </div>
                      <span class="rmb">-{{v.ordZfsumm}}</span>
                  </li>
                   <li v-for="(v,index) in jlData">
                      <div class="fl">
                           <p>购买</p>
                           <p class="time">{{v.zfDate}}</p>
                      </div>
                      <span class="rmb">-{{v.ordZfsumm}}</span>
                  </li>
              </ul>
        </div>
  </div>
</template>

<script>
import  VHeader   from '../../components/Header.vue'
export default {
  name: 'TradeList',
  data () {
    return {
      jlData: [],
      zpData:[]
    }
  },
  mounted(){
     this.$http(api.TradeList+GetQueryString('pinfoId'))
      .then(response=>{
           let data=response.data;
           console.log(data);
           this.jlData=data.jlData;
           this.zpData=data.zpData;
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
.TradeList{
  min-height:100%;
   background: #fff;
   .container{
     padding-top:rem(120px);
     .list{
         li{
           padding: 0 rem(30px) ;
           display: flex;
           flex-direction: row;
           justify-content: space-between;
           align-items: center;
           font-size: 16px;
           border-bottom: 1px solid #bbb;
          .fl{
              p{
                  margin: rem(30px) 0;
              }
          }
          .rmb{
              font-size: 20px;
              font-weight: bold;
              color: #222;
          }
         }
     }

   }
}
</style>
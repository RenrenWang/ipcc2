<template>
  <div class="search-key">
       <div class="search-key-item" v-for="(v,index) in searchKeys" :key="index">
            <div :class="['search-key-item-s',{noLine:searchKeys.length-1==index}]" @click="ishowKindPanel(index)">
                  <span>{{v.name}}</span>
           </div>
           
       </div>
       <KindPanel v-show="isShowPanel" @closePanel="resultKindPanel" :sKinds="kinds" :selectIndex='index' :sName="searchKeys[index]['name']"/>
  </div>
</template>

<script>
import  KindPanel   from './KindPanel.vue'
export default {
  name: 'SearchKey',
  props:{
   searchKeys:{
     type: Array,
     required: true
   },
   resultKinds:{
     type:Function
   }
  
  },
  data () {
    return {
      isShowPanel:false,
      kinds:[],
      index:0
    }
  },
  methods:{
    resultKindPanel(arr){
 
     this.$emit("resultKinds",arr)
     this.isShowPanel=!this.isShowPanel;
     
    },
    ishowKindPanel(index){
     if(index||index==0){
        this.index=index;
        this.kinds=this.searchKeys[index]['kinds'];
       
     }
   
      this.isShowPanel=!this.isShowPanel;
     
     
    }
  },
  components:{
    KindPanel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/base.scss";
.search-key{
  background:$color-theme ;
 height:rem(100px);
 position:fixed;
 top:rem(100px) * 2;
 width:100%;

 display:flex;
 align-items:center;
 justify-content: center;
 z-index: 999;

 .search-key-item{
   font-size:$font-size-medium-x;
    width: 28%;
   border:2px  solid  #fff;
   padding:rem(15px) 0;
    margin:0 1.5%;
    border-radius: rem(20px);
   .search-key-item-s{
      
       color: #fff;
      display:flex;
      align-items:center;
      justify-content:center;
      position:relative;
      
    }

   
  }

  
    
}
</style>

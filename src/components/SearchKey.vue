<template>
  <div :class="['search-key',{mt:isBuy}]">
       <div class="search-key-item">
          <div :class="['search-key-item-s']" @click.stop="resultKindPanel(0)">
            <span>{{searchKeys[0].name}}</span>
                  <!--<select v-model="selectedQj">
                  <option v-for="option in optionsQj"  :value="option.value">
                         {{option.codeName}}
                  </option>
                </select>-->
                <ul class="key-list" v-show="isSelectQj">
                     <li  @click.stop="selectItem(0,index)" v-for="(option,index) in optionsQj"  :value="option.value">{{option.codeValue}}</li>
                </ul>
          </div>
       </div>
       <div class="search-key-item">
          <div :class="['search-key-item-s']" @click="resultKindPanel(1)">
                  <span>{{searchKeys[1].name}}</span>
           </div>
       </div>
        <div class="search-key-item">
          <div :class="['search-key-item-s']" @click="resultKindPanel(2)">
                <span>{{searchKeys[2].name}}</span>
                  <ul class="key-list"  v-show="isSelectSex">
                     <li  @click.stop="selectItem(2,index)" v-for="(option,index) in optionsSex"  :value="option.value">{{option.codeValue}}</li>
                </ul>
          </div>
       </div>
  </div>
</template>

<script>
import  KindPanel   from './KindPanel2.vue'
export default {
  name: 'SearchKey',
  props:{
   searchKeys:{
     type: Array,
     required: true,
    
     
   },
   isBuy:{
     type:Boolean,
     default:false
   }
  
  },
  data () {
    return {
   
      kinds:[],
      index:0, 
      selectedSex: 'Q',
      selectedQj:'Q',
      optionsSex: [
       { codeValue: '全部', codeName: 'Q' },
        { codeValue: '男', codeName: '男' },
       { codeValue: '女', codeName: '女' }
      ],
      optionsQj: [
       { codeValue: '全部', codeName: 'Q' },
       { codeValue: '全职', codeName: 'C' },
       { codeValue: '兼职', codeName: 'J' }
      ],
      isSelectQj:false,
      isSelectSex:false
    }
  },
  methods:{
    resultKindPanel(index){
      if(index==1)
        this.$emit("resultSelect",index);
      if(index==0){
          this.isSelectQj=true;
      }
      
        if(index==2){
 this.isSelectSex=true;
        }
      
    },
    selectItem(sindex,index){
     
     if(sindex==0){
       this.isSelectQj=false;
      
       if(index==0){
         this.$emit("resultSelect",{index:0,data:[]});
       }else{
          this.$emit("resultSelect",{index:0,data:[this.optionsQj[index]]});
       }
       
     }
      
     if(sindex==2){
       this.isSelectSex=false;
        if(index==0){
          this.$emit("resultSelect",{index:2,data:[]});
       }else{
        this.$emit("resultSelect",{index:2,data:[this.optionsSex[index]]});
       }
     }
   
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
 top:rem(120px) +rem(100px);
 width:100%;

 display:flex;
 align-items:center;
 justify-content: center;
 z-index: 999;
&.mt{
  top:rem(100px);
 }
 .search-key-item{
   font-size:$font-size-medium-x;
    width: 28%;
   border:2px  solid  #fff;
   padding:rem(15px) 0;
    margin:0 1.5%;
    border-radius: rem(20px);
    position:relative;
   .search-key-item-s{
      color: #fff;
      display:flex;
      align-items:center;
      justify-content:center;
      position:relative;
      .key-list{
        position:absolute;
        width:100%;
        top:rem(48px);
        border-right:1px solid #fff;
        border-left:1px solid #fff;
        border-top:1px solid #fff;
        background:#fff;
        border-radius:0 0 rem(20px) rem(20px);
        text-align:center;
        color:#222;
        li{
          padding:rem(25px) 0;
          border-bottom:1px solid #fff;
          &:last-of-type{
            border:none;
          }
        }
      }
       select{
           width:65%;
          border:none;
          background:none;
          font-size:14px;
          color:#fff;
          outline:none;
          option{
             text-align:center;
          }
       }
      
    }

   
  }

  
    
}
</style>

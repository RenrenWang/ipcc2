<template>
    <ul class="kind-items" >
        <li v-for="(v,index) in  itemslist">{{v.codeValue}}</li>
                       
    </ul>

</template>

<script>
export default {
  name: 'KindItems',
  props:{
      itemslist:{
          type:Array
      }
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/base.scss";
 .kind-items{
            position:absolute;
            top:rem(86px);
            border:2px solid $color-text;
            border-top:none;
              width:rem(270px);
             font-size:18px;
             color: $color-text;
             background:$color-background;
             z-index:999;
            li{
                text-align:center;
                 padding:15px 0;
               border-bottom:1px solid $color-text;
            }
  }
</style>
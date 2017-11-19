import axios from 'axios'
import {BaseUrl,Api} from '../api.js'
export const state={
    user:{
      pinfoId:'',
      pinfoName:'',
      pinfoPname:'',
      pinfoSname:'',
      pinfoSex:'',
      pinfoPhone:'',
      rsmStatus:'',
      pinfoUri:'',
      city:'杭州市'
    }
}

export const mutations= {
    addUser(state,user) {
      // 变更状态
      state.user=user;

    },
    changeImage(state,url){
      state.user=Object.assign({},state.user,{pinfoUri:url});  
    },
    changePinfoSex(state,sex){
      state.user=Object.assign({},state.user,{pinfoSex:sex});  
    },
    changePinfoSname(state,name){
      state.user=Object.assign({},state.user,{pinfoSname:name});  
    },
    changeCity(state,city){
      state.user=Object.assign({},state.user,{city});  
    },

    changePhoenNumber(state,phoenNumber){
      state.user=Object.assign({},state.user,{pinfoPhone:phoenNumber});  
    },
  }


export const actions={
     addUser (context,pid) {
       
       axios.get(Api.person+pid)
      .then((response)=>{
        let data=response.data;
         data=data.data[0];
         console.log(data);
         let user={
          pinfoId:data.pinfoId,
          pinfoName:data.pinfoName,
          pinfoPname:data.pinfoPname,
          pinfoSname:data.pinfoSname,
          pinfoSex:data.pinfoSex,
          pinfoPhone:data.pinfoPhone,
          pinfoStatus:data.pinfoStatus,
          pinfoUri:data.pinfoUri,
          rsmStatus:data.rsmStatus,
          city:data.city
         }
         context.commit('addUser',user)
       
      })
     
    }
 }
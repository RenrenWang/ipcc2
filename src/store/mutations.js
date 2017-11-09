export const state={
    count:1
}

export const mutations= {
    increment (state) {
      // 变更状态
      state.count++
    }
  }


export const actions={
    increment (context) {
     
      setInterval(()=>{
        context.commit('increment')
      },1000)
    }
 }
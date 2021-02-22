import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types";

export default {
  addCart(context, payload) {
    // let oldProduct = null;
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }

    //回调一个新的Promise用于判断商品是否添加到购物车
    return new Promise((resolve, reject) => {
      //数组函数  (查找之前的数组中是否有该商品)
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      })
      //let oldProduct = state.cartList.find(item=>item.iid===payload.iid)

      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('商品添加成功')
      }
    })
  }
}

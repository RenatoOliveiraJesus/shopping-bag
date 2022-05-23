import {
  createStore
} from 'vuex'
import axios from 'axios'

export default createStore({



  state: {
    products: [],
    productsInBag: [],
  },




  mutations: {
    MUloadProducts(state, products) {
        state.products = products
    },
    MUloadBag(state, productsInBag) {
      state.productsInBag = productsInBag
    },
    
    MUaddToBag(state, product){
      state.productsInBag.push(product);
      localStorage.setItem('productsInBag' , JSON.stringify(state.productsInBag))
    },
    
    MUremoveFromBag(state, productId){
      var updatedBag = state.productsInBag.filter(item => productId != item.id)
      state.productsInBag = updatedBag;
      localStorage.setItem('productsInBag' , JSON.stringify(state.productsInBag))
    },

  },



  actions: {
    ACTIONloadProducts({commit}) {
      axios
        .get('https://fakestoreapi.com/products')
        .then(response => {
          commit('MUloadProducts' , response.data);
        })
    },

    ACTIONloadBag({commit}) {   
        if (localStorage.getItem('productsInBag')){
            commit('MUloadBag' , JSON.parse(localStorage.getItem('productsInBag')));
        } 
        
    },

    ACaddToBag({commit}, product){
      commit('MUaddToBag' , product);
    },

    ACremoveFromBag({commit}, productId){
        if (confirm('Você deseja excluir o produto do carrinho?')) {
          commit('MUremoveFromBag' , productId);
        }
    },

  },





  modules: {}
})
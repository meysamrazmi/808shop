import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// Create new Store
const store = new Vuex.Store({
    //strict: process.env.NODE_ENV !== 'production',  
    state:{
        newsnid: 0,
        news_loading : true,
        loading: true,
        selected : {
          t2258: [],
          t2259: [],
          t2260: [],
          t2261: [],
          t2262: [],
          t2264: [],
          t2265: [],
          t2458: [],
        },
        queryNames : {
          t2258: 'product_kind',
          t2259: 'field',
          t2260: 'publication_name',
          t2261: 'exam',
          t2262: 'education_kind',
          t2264: 'academic_orientation',
          t2265: [],
          t2458: 'producer',
        }
    },
    mutations:{
        SET_NEWS(state,newnid){
            state.newsnid = newnid
            state.news_loading = true
        },
        SET_NEWS_LOADING(state){
            state.news_loading = false
        },
        SET_LOADING(state){
            state.loading = true
        },
        CLEAR_LOADING(state){
            state.loading = false
        }
    },
    getters:{
        getMynid: state => state.newsnid,
        get_news_state: state => state.news_loading
    },
    actions:{

    }
})
// module.exports = store
export default store


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// Create new Store
const store = new Vuex.Store({
    //strict: process.env.NODE_ENV !== 'production',  
    state:{
        newsnid: 0,
        loading: true,
        filtersLoading: true,
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
          t2265: 'special',
          t2458: 'producer',
        },
        filters : {}
    },
    mutations:{
        SET_NEWS(state,newnid){
            state.newsnid = newnid
            state.news_loading = true
        },
        SET_NEWS_LOADING(state){
            state.news_loading = false
        },
        SET_LOADING(state, type){
            state[type] = true
        },
        CLEAR_LOADING(state, type){
            state[type] = false
        },
        SET_FILTERS(state, filters){
            state.filters = filters
        },
    },
    getters:{
        getMynid: state => state.newsnid,
        getFilters: state => state.selected,
    },
    actions:{

    }
})
// module.exports = store
export default store


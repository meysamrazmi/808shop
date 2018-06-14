<template>
    <div class="md-elevation-1" style="padding: 0 15px;">
      <div 
        class="md-layout" 
        style="flex: 1 1 100%;	align-items: center;">
        <span 
          class="md-layout-item" 
          style="flex: 0 20%;	text-align: left;	order: 1;	font-size: 13px;" 
          v-if="count > 0">
          نمایش 1 - 30 از {{count}} محصول
          <md-icon style="margin-right: 8px;font-size: 20px !important;">widgets</md-icon>
          </span>
        <md-field 
          class="md-layout-item" 
          md-clearable 
          md-layout="box">
          <label>جستجو</label>
          <md-input 
            v-model.lazy="searchInput" 
            @keyup.native.enter="getProducts({})"></md-input>
          <md-icon>search</md-icon>
        </md-field>
        <md-switch 
          @change="getProducts({})" 
          v-model="stock"
          class="md-layout-item" 
          style="align-items: center;font-weight: 500;margin-right: 45px;" >
          نمایش موجودها: 
        </md-switch>
      </div>

      <div v-show="Object.keys(chips).length > 0" class="chips-container">
        <md-chip 
          class="" 
          md-deletable 
          v-for="(value, key) in chips" :key="key" 
          @md-delete="chips_delete(key)"
        >
          {{value}}
        </md-chip>
      </div>
      
      <md-divider></md-divider>
      
      <div class="md-layout" style="position: relative;	margin: 0 -1%;">
        <div class="loading" v-if="$store.state.loading">
          <md-progress-spinner 
            :md-diameter="100" 
            :md-stroke="5" 
            md-mode="indeterminate" 
            style="position: fixed;top: calc(50% - 50px);">
          </md-progress-spinner>
        </div>

        <ProductTeaser v-for="product in products" :key="product.nid"
        :title="product.title" 
        :pic="product.picture" 
        :nid="product.nid"
        :listPrice="product.list_price"
        :sellPrice="product.price"/>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import ProductTeaser from '@/components/ProductTeaser'
import { mapGetters } from 'vuex'
import Vue from 'vue';

export default {
  name: 'products',
  data () {
    return {
      products:[],
      searchInput:'',
      stock: false,
      count: 0,
      chips: {},
    }
  },
  mounted() {
    var query = this.$route.query
    var selected = this.$store.state.selected
    var names = this.$store.state.queryNames
    var ids = {}
    Object.keys(names).map((key)=>{
      ids[names[key]] = key
    })
    Object.keys(query).map((key)=>{
      console.log(query[key])
      switch(key){
        case 'search': 
          this.searchInput = query[key]
          break
        case 'stock': 
          this.stock = true
          break
        default : 
          selected[ids[key]] = query[key].split(",")
          break
      }
    })
    this.getProducts({})
    this.$store.watch(
      (state) => {
        return state.selected
      },
      () => {
        this.getProducts({})
      },
      {
        deep: true //add this if u need to watch object properties change etc.
      }
    )
  },
  methods:{
    getProducts(options){
      this.set_loading()
      var url = ""
      var query = {}
      var selected = this.$store.state.selected
      var names = this.$store.state.queryNames
      var filters = this.$store.state.filters
      var chipps = {}

      //handling filters
      var firstt = true
      Object.keys(selected).map(function(Key) {
        var val = selected[Key];
        var name = names[Key];
        if(val.length){
          var selectedTid = ""
          var first = true
          val.forEach(tid => {
            selectedTid += (first)? tid : "," + tid
            first = false
            chipps[tid] = filters[tid]
          })

          url += ((!firstt)? "&" : "") + name + "=" + selectedTid
          query[name] = selectedTid
          firstt = false
        }
      });
      this.chips = chipps
      
      //handling search
      if(this.searchInput != ''){
        url += '&search=' + this.searchInput
        query.search = this.searchInput        
        this.chips['search'] = this.searchInput
      }else{
        delete this.chips.search
      }
      


      //handling stock
      if(this.stock){
        url += '&stock=1'
        query.stock = '1'
        this.chips['stock'] = 'نمایش موجود ها'
      }else{
        delete this.chips.stock
      }
      
      var q = { name: "home", query : query }
      this.$router.replace(q)
      console.log(url)
      fetch('http://meysam.dev.com/shop/product/json?'+ url)
        .then(response => response.json())
        .then((data) => {
          this.products = data.products
          this.count = data.count
          setTimeout(() => {this.$store.commit('CLEAR_LOADING','loading')}, 300)
        })
    },
    set_loading(){
      this.$store.commit('SET_LOADING', 'loading');
    },

    chips_delete(i){
      console.log(i)
      delete this.chips[i]
      switch(i){
        case 'stock':
          this.stock = false
          this.getProducts({})
        break
        case 'search':
          this.searchInput = ''
          this.getProducts({})
        break
        default:
          console.log('d')
          var obj = this.$store.state.selected
          Object.keys(obj).map(function(Key) { // searching in store to delete from
            var val = obj[Key]
            if(val.indexOf(i) >= 0){
              obj[Key].splice(val.indexOf(i), 1)
            }
          })
        break
      }
    }
  },
  components: {
    ProductTeaser
  },
}
</script>

<style lang="scss">
.loading {
	position: absolute;
	z-index: 3;
	background: rgba(255, 255, 255, 0.6);
	width: 100%;
	right: 0;
	top: 0;
	height: 100%;
}
.md-headline{
  margin-bottom: 40px;
}
.md-field .md-input-action {
  left: 0;
	right: inherit;
	background: #fff;
	z-index: 6;
	height: 30px;
	width: 30px;
	min-width: 30px;
}
.chips-container {
  text-align: right;
  margin-bottom: 15px;
  .md-chip {
    font-size: 11px;
	  line-height: 30px;
	  background: transparent !important;
    border: 1px solid #bbb;
    &:not(.md-disabled):hover {
    	background: #ddd !important;
    	color: rgba(0, 0, 0, 0.87) !important;
    }
    svg {
    	fill: #555 !important;
    }
  }
}
</style>



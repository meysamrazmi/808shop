<template>
    <div class="newspane" style="position: relative;">
      <div class="loading" v-if="$store.state.loading">
        <md-progress-spinner 
          :md-diameter="100" 
          :md-stroke="10" 
          md-mode="indeterminate" 
          style="position: fixed;top: calc(50% - 50px);">
        </md-progress-spinner>
      </div>
      <ProductTeaser v-for="product in products" :key="product.nid"
        :title="product.title" 
        :pic="product.picture" 
        :nid="product.nid"
        :sellPrice="product.price"/>
        <!-- :listPrice="product.list_price"/> -->
    </div>
</template>

<script>
import axios from 'axios'
import { Carousel, Slide } from 'vue-carousel'
import ProductTeaser from '@/components/ProductTeaser'
export default {
  name: 'products',
  data () {
    return {
      products:[]
    }
  },
  mounted() {
    fetch('http://meysam.dev.com/shop/product/json')
      .then(response => response.json())
      .then((data) => {
          this.products = data
          setTimeout(() => {this.$store.commit('CLEAR_LOADING')}, 300)
      })
    this.$store.watch(s =>{
      this.set_loading()
      this.getProducts()
    })
  },
  methods:{
    getProducts(){
      var url = ""
      var obj = this.$store.state.selected
      var names = this.$store.state.queryNames
      var firstt = true

      Object.keys(obj).map(function(Key) {
        var val = obj[Key];
        var name = names[Key];
        if(val.length){
          var selectedTid = ""
          var first = true
          val.forEach(tid => {
            selectedTid += (first)? tid : "+" + tid
            first = false
          })

          url += ((!firstt)? "&" : "") + name + "=" + selectedTid
          firstt = false
        }
      });
      fetch('http://meysam.dev.com/shop/product/json?'+ url)
        .then(response => response.json())
        .then((data) => {
          this.products = data
          setTimeout(() => {this.$store.commit('CLEAR_LOADING')}, 300)
        })
    },
    set_loading(){
      this.$store.commit('SET_LOADING');
    },
    clear_loading(){
      
    }
  },
  components: {
    Carousel,
    Slide,
    ProductTeaser
  }
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
.VueCarousel-slide{
  padding: 10px;
  width:316px !important;
}
button.VueCarousel-navigation-button{
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color:white !important;
  font-family: Material Icons;
  font-size: 30px;
  text-align: center;
  line-height: 30px;
  padding: 0 !important;
  color:#92278f !important;
}
.newspane{
  background-color: #fafafa;
  margin-bottom: 100px;
}
section#news{
  width: 80%;
  margin: 80px auto 20px auto;
}
.md-headline{
  margin-bottom: 40px;
}

</style>



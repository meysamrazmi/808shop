<template>
    <div class="filters">
        <div class="md-card" style="margin-bottom: 15px;" v-for="item in filters" :key="item.tid" v-if="item.tid">
          <md-toolbar style="min-height: 50px;" :md-elevation="0">
            <span class="md-subheading">{{item.name}}</span>
          </md-toolbar>

          <md-list class="md-scrollbar" style="max-height: 250px;overflow: overlay;">
            <md-checkbox 
              v-for="sub_item in item.children" :key="sub_item.tid" 
              v-model="$store.state.selected['t'+ item.tid]" 
              :value="sub_item.tid">
                {{sub_item.name}}
            </md-checkbox>
          </md-list>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'filters',
  data () {
    return {
      filters:[],
    }
  },
  mounted() {
    fetch('http://meysam.dev.com/shop/product/json/filter')
      .then(response => response.json())
      .then((data) => {
          this.filters = data
    })
  },
}
</script>

<style lang="scss">
.md-checkbox {
  margin: 5px 16px 6px 0;
  min-height: 20px;
}
  .viewport {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
  }
</style>



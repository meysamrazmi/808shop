<template>
  <div>
    <div class="md-layout" style="align-items: flex-start;">
        <filters class="md-layout-item md-size-20" style="padding: 0 15px;"/>
        <products class="md-card md-theme-default md-layout-item md-size-80"/>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import products from '@/components/products'
import filters from '@/components/filters'

export default {
  name: 'home',
  props: ['name'],
  components: {
    products,
    filters
  },
}
</script>

<style lang="scss">
    .inner{
        max-width: 1100px;
        margin: auto;
    }
</style>


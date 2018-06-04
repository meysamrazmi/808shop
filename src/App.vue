<template>
  <div id="app">
    <router-view/> <!--becous it is the main page of our site, this router-view renders / path and it was defined in router to render home template -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  methods:{
  }
}
</script>

<style src="./assets/app.css"></style>


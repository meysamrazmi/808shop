<template>
  <div>
    <div style="width: 100%;">{{$store.state.selected}}</div>

    <div class="md-layout">
        <filters class="md-layout-item md-size-20" style="padding: 0 15px;"/>
        <products class="md-layout-item md-size-80 md-layout"/>
    </div>

    <section id="subscribe">
        <div class="input-wrapper">
          <input @keyup.enter="addEmail" v-model="inputBox" placeholder="Submit Your Email..."  autocomplete="off"/>
          <button v-on:click="addEmail"></button>
          <div style="margin-top: 20px;" v-if="aftersubmit" >Thank You :)</div>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import products from '@/components/products'
import filters from '@/components/filters'

export default {
  name: 'home',
  data () {
    return {
      inputBox:'',
      aftersubmit:false,
    }
  },
  methods: {
    addEmail() {
      var config = {
        headers:{
          'Content-Type': 'application/json',
          'crossDomain': true
        },
        baseURL: 'http://civil808.com'
      }
      var geturl = '/latin/pbd?email="' + this.inputBox + '"' 
      axios
        .get( geturl , config)
        .then((response) => {
          //console.log(response)
        })

      this.aftersubmit = true;
    }
  },
  components: {
    products,
    filters
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    section#webinar{
        background-color: white;
        padding: 70px 0 57px 0;
        .inner {
            text-align: left;
            img{
                margin-right: 55px;
                display: inline-block;
                width: 30.5%;
                max-width: 324px;
                vertical-align: top;
                @media all and (max-width: 700px){
                    display: block;
                    margin: 0 auto;
                }
            }
            .webinar-text{
                display: inline-block;
                width: 61%;
                @media all and (max-width: 700px){
                    width: 95%;
                    margin: 5px 20px;
                }
            }
            a{
                width: 313px;
                border-radius: 30px;
                height: 50px;
                font-size: 19px;
                display: block;
                background-color: #e2c3ff;
                text-decoration: blink;
                color: black;
                text-align: center;
                line-height: 47px;
            }
        }
        .iframe{
            margin-top: 30px;
        }
    }

    section#subscribe{
        background-image: url(http://civil808.com/en/staticfile/3931.jpg);
        padding: 80px 0 90px 0;
        background-size: cover;
        background-position: center;
        h2{
            color: white;
            font-size: 34px;
            font-weight: bold;
            margin-bottom: 30px;
        }
        p{
            margin: 0 10px 45px 10px;
            color: #000000;
            text-shadow: 1px 1px 1px #fff;
        }
        .input-wrapper{
            position: relative;
            width: 510px;
            margin: auto;
            @media all and (max-width: 700px){
                width: 300px;
            }
        }
        input{
            width: 510px;
            box-sizing: border-box;
            -webkit-transition: width 0.4s ease-in-out;
            transition: width 0.4s ease-in-out;
            border-radius: 30px;
            height: 50px;
            -webkit-appearance: button-bevel;
            padding: 0 17px;
            font-size: 12px;
            outline: none;
            @media all and (max-width: 700px){
                width: 300px;
            }
        }
        button{
            position: absolute;
            height: 44px;
            right: -1px;
            top: -2px;
            width: 45px;
            border-radius: 50%;
            -webkit-appearance: button-bevel;
            margin: 5px;
            cursor: pointer;
            background-color: #BA68C8;
            &:before {
                content: '+';
                font-size: 28px;
                color: #ffffff;
            }
        }
    }
    .inner{
        max-width: 1100px;
        margin: auto;
    }
</style>


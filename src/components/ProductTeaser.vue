<template>
    <md-card class="product-teaser" :class="('product-'+ nid)" md-with-hover>
      <md-ripple>  
        <md-card-media v-if="pic" md-ratio="1:1">
          <img v-bind:src="pic | converturl" />
        </md-card-media>
    
        <md-card-header>
          <div class="md-subhead" style="text-align: right;opacity: 1;"> {{title}} </div>
        </md-card-header>

        <p class="list-price price" v-if="listPrice >= sellPrice">{{listPrice | priceFormat}} <span>تومان</span></p>
        <p class="sell-price price">{{sellPrice | priceFormat}} تومان</p>

      </md-ripple>  
    </md-card>
</template>

<script>
import news from '@/components/news'

export default {
    name: 'ProductTeaser',
    props: ['title','pic','date','nid','listPrice','sellPrice'],
    methods:{
        set_news(nid){
            this.$store.commit('SET_NEWS', nid);
        }
    },
    components: {
        news
    },
    filters: {
        year_detecter: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.split('-')[0]
        },
        month_detecter: function (value) {
            if (!value) return ''
            value = value.toString()
            if(value.split('-')[1] == '01') return 'Jan'
            else if(value.split('-')[1] == '02') return 'Feb'
            else if(value.split('-')[1] == '03') return 'Mar'
            else if(value.split('-')[1] == '04') return 'Apr'
            else if(value.split('-')[1] == '05') return 'May'
            else if(value.split('-')[1] == '06') return 'Jun'
            else if(value.split('-')[1] == '07') return 'Jul'
            else if(value.split('-')[1] == '08') return 'Aug'
            else if(value.split('-')[1] == '09') return 'Sep'
            else if(value.split('-')[1] == '10') return 'Oct'
            else if(value.split('-')[1] == '11') return 'Nov'
            else if(value.split('-')[1] == '12') return 'Dec'
        },
        day_detecter: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.split('-')[2]
        },
        converturl: function(value){
            if (!value) return ''
            return value.replace('meysam.dev', 'civil808')
        },
        priceFormat: function(value){
            return parseFloat(value, 10).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").toString()//Math.round()
        }
   }
}

</script>

<style lang="scss">
.product-teaser{
    width: 19%;
	margin: 15px 1%;
	-webkit-box-flex: 0;
	-ms-flex: 0 1 19%;
	flex: 0 1 18%;
	max-height: 370px;
}
.price{
	text-align: right;
	padding: 0px 15px;
	font-size: 1.1em;
	color: rgb(46, 125, 50);
    &.list-price {
    	text-decoration: line-through;
    	color: rgba(255,0,0,0.75);
    	font-size: 12px;
    	margin: -5px 0 -15px 0px;
    }
}
.md-subhead {
	height: 40px;
	overflow: hidden;
}
.md-card-media img {
	max-width: 100%;
	margin: auto;
	display: block;
    max-height: 300px;
    width: inherit;
}
</style>


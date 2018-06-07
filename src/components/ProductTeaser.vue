<template>
    <md-card class="product-teaser" md-with-hover>
      <md-ripple>  
        <md-card-media v-if="pic">
          <img v-bind:src="pic | converturl " />
        </md-card-media>
    
        <md-card-header>
          <div class="md-subhead" style="text-align: right;opacity: 1;"> {{title}} </div>
        </md-card-header>

        <p style="text-align: right;padding: 0 15px;font-size: 1.2em;color: #2E7D32;">{{sellPrice | priceFormat}} تومان</p>
        <!-- <md-card-actions>
          <md-button class="md-raised" @click="set_news(nid)">read more</md-button>
        </md-card-actions> -->

      </md-ripple>  
    </md-card>
</template>

<script>
import news from '@/components/news'

export default {
    name: 'ProductTeaser',
    props: ['title','pic','date','nid','sellPrice'],
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
            if (!value) return '';
            var thestart = 'http://civil808.com/sites/default/files';///styles/808/public
            var theend = value.substr(8);
            return thestart + theend;
        },
        priceFormat: function(value){
            return parseFloat(value, 10).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").toString()//Math.round()
        }
   }
}

</script>

<style lang="scss">
.product-teaser{
	width: calc(20% - 10px);
	margin: 1%;
    flex: 0 1 23%;
    max-height: 450px;
}
.md-card-media img {
	max-width: 100%;
	margin: auto;
	display: block;
    max-height: 300px;
    width: inherit;
}
    .md-tooltip-left{
        margin-top:-74px;
        margin-right:-15px; 
    }
    .md-card.news-teaser{
        //background-color:white;
        min-height: 240px;
        text-align: left;
        position: relative;
        .md-title {
            font-size: 15px;
            letter-spacing: 0;
            line-height: 21px;
            min-width:240px;
        }
        .md-card-content{
            padding: 4px 16px;
        }
        .md-subhead b{
            color:#333
        }
        .md-card-actions {
            position: absolute;
            right: 0px;
            bottom: 0;
        }
        .company{
            margin-bottom: 65px;
        }
        .md-card-content.date-fan {
            position: absolute;
            bottom: 0;
            z-index: -1;
            .day {
                font-size: 47px;
                color: #eee;
                position: absolute;
                left: 9px;
            }
            .month {
                /* position: absolute; */
                margin: 3px 0 0 45px;
                font-size: 20px;
                color: #eee;
            }
            .year {
                color: #dadada;margin-left: 31px;
            }
        }
    } 
</style>


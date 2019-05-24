<template>
	<div class="cinema">
		<div class="topbar">
		<van-icon name="arrow-left" @click="back" />
		<p>影院</p>
		</div>
		
		<div class="city_search">
			<div @click="goState({name:'City'})" class="city">广州<van-icon name="arrow-down" /></div>
			<van-search class="search" placeholder="搜影院"  />
		</div>
		
		<div class="qpt">
			<van-col span="8">
				<span  @click="isshow" @change="onChange"  >{{qc}}<van-icon name="arrow-down" /></span>
			</van-col>
			<van-col span="8">
				<span @click="isshowpp" @change="onChangepp">品牌<van-icon name="arrow-down" /></span>
			</van-col>
			<van-col span="8">
				<span @click="isshowts" @change="onChangets" class="ts">特色<van-icon name="arrow-down" /></span>
			</van-col>
		</div>
		
		<van-row>
			<van-col @click.native="goState({name:'CinemaDetails',params:{pid:item.id}})" v-for="(item,index) in addrMoive" :key="index" class="vcol" span="22">
				<p class="title">{{item.nm}}<span class="price">{{item.sellPrice}}元起</span></p>
				<p class="addr">{{item.addr}}</p>
				<span class="distance">{{item.distance}}</span>	
				<p class="discount"><span class="gq">改签</span><span class="xc">小吃</span><span class="card">折扣卡</span></p>
				<p class="cardPromotionTag">{{item.promotion.cardPromotionTag}}</p>
				<p>最晚场次:{{item.showTimes}}</p>
			</van-col>
		</van-row>
		
		<van-popup v-model="show" position="bottom" :overlay="true">
		  <van-picker :columns="columns" @change="onChange" />
		</van-popup>
		
		<van-popup v-model="showpp" position="bottom" :overlay="true">
		  <van-picker :columns="columnspp" @change="onChangepp" />
		</van-popup>
		
		<van-popup v-model="showts" position="bottom" :overlay="true">
		  <van-picker :columns="columnsts" @change="onChangets" />
		</van-popup>
		
		
		<van-loading v-if="isLoading" class="loading" type="spinner" color="white" />
		
	</div>
</template>

<script>
	
	import { Picker, Popup  } from 'vant'
	
	const citys = {
	  
	  '广州': ['白云区', '天河区', '黄浦区', '从化区', '花都区','番禺区'],
	  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
	  '福建': ['福州', '厦门', '莆田', '三明', '泉州'],
	  '江西': ['南昌市','赣州市', '九江市', '上饶市', '吉安市', '宜春市','新余市']
	};
	
	const characteristic = {
	  '特色功能':['全部','会员卡','可改签','可退票'],
	  '特殊厅':['全部','IMAX厅','4DX厅','杜比全景厅','4K厅','儿童厅']
	};
	
	
	export default{
		name:'Cinema',
		data(){
			return{
				qc:'全城',
				addrMoive:[],
				isLoading:false,
				 show: false,
				 showpp:false,
				 showts:false,
				columns: [
					        {
					          values: Object.keys(citys),
					          className: 'column1'
					        },
					        {
					          values: citys['广州'],
					          className: 'column1',
					          defaultIndex: 1
					        }
					      ],
				columnsts: [
					        {
					          values: Object.keys(characteristic),
					          className: 'column1'
					        },
					        {
					          values: characteristic['特色功能'],
					          className: 'column1',
					          defaultIndex: 1
					        }
					      ],
			     columnspp: [
			     '星河电影院', '中影电影院', '古时代.电影院', '万达影城',
			     '大地影院(潮流汇店)','中影JAJ24消失咖啡.影院','CGV影城(永旺店)',
			     '泛洋国际影城','大地影院(百德商业中心店)','烽禾影城(祈福店)'
			     			]
			   
  					};
			
		},
		
		components:{
			[Picker.name]:Picker,
			[Popup .name]:Popup 
		},
		
		methods:{
			goState(path){
				this.$router.push(path);
			},
			back(){
				this.$router.go(-1);
			},
			isshow(){
				this.show = true;
			},
			isshowpp(){
				this.showpp = true;
			},
			isshowts(){
				this.showts = true;
			},
			   onChange(picker, values) {
		      picker.setColumnValues(1, citys[values[0]]);	
		    },
		       onChangets(picker, values) {
		      picker.setColumnValues(1, characteristic[values[0]]);	
		    },
		      onChangepp(picker2, value2, index2) {
     			 this.Toast(`当前值：${value2}, 当前索引：${index2}`);
    }
		},
		
		created(){
			this.isLoading = true;
			this.id = this.$route.query.id;
			this.name = this.$route.query.n;
			console.log(this.id);
			const cinema = "/yy/cinema"
			this.axios.get(cinema).then( res =>{
//				console.log('data',res.data);
				this.addrMoive=(res.data.data.cinemas);
				console.log('addrMoive',this.addrMoive);
				this.isLoading = false;
			})
			
		}
		
	}
</script>

<style lang="less" scoped>

	.cinema{}
	.topbar{
		width: 100%;
		height: 1.4rem;
		background: #E54847;
		position: sticky;
		top: 0;
		z-index: 100;
		.van-icon{
			color: #FFFFFF;
			width: 20%;
			float: left;
			padding-left: 0.4rem;
			line-height: 1.4rem;
			font-size: 0.4rem;
			font-size: 0.6rem;
			text-align: left;
		}
		p{
			width: 20%;
			line-height: 1.4rem;
			font-size: 0.5rem;
			color: #FFFFFF;
			letter-spacing: 0.1rem;
			text-align: center;
			margin: 0 auto;
		}
	}
	.city_search{
		position: sticky;
		top: 1.4rem;
		z-index: 101;
		width: 100%;
		height: 1.2rem;
		background: #FFFFFF;
		.city{
			width: 24%;
			height: 1.4rem;
			line-height: 1.4rem;
			font-size: 0.4rem;
			text-align: center;
			/*background: #E54847;*/
			float: left;
		}
		.search{
			width: 76%;
			float: right;
		}
	}
	.qpt{
		width: 100%;
		height: 1rem;
		background: #FFFFFF;
		position: sticky;
		top: 2.6rem;
		z-index: 666;
		span{
			width: 50%;
			height: 0.8rem;
			line-height: 0.8rem;
			text-align: center;
			margin-left: 1.4rem;
			text-align: left;
			border-right: 0.02rem solid #CCCCCC;
			display: block;
			/*background: #F0F0F0;*/
			position: relative;
			z-index: 105;
			.van-icon{
				margin-left: 0.18rem;
				display: block;
				position: absolute;
				top: 33%;
				right: 30%;
			}
		}
		.ts{
			border: none;
		}
	}
	.vcol{
		width: 100%;
		height:4.2rem;
		border: 1PX solid #CCCCCC;
		padding: 2% 4%;
		position: relative;
		p{
			margin: 0.3rem 0;
		}
		.title{
			font-size: 0.4rem;
			/*font-weight: bold;*/
			.price{
				font-size: 0.45rem;
				color: red;
				margin-left: 0.4rem;
				font-weight: bold;
			}
		}
		.addr{
			width: 75%;
			color: #696969;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.distance{
			display: block;
			position: absolute;
			top: 33%;
			right: 10%;
			font-size: 0.4rem;
			color: #696969;
		}
		.cardPromotionTag{
			color: #696969;			
		}
		.discount{
			span{
				padding: 0.05rem;
				margin-right: 0.1rem;
				border-radius: 0.1rem;
			}
			.gq{
				border: 0.02rem solid blue;
				color: blue;
			}
			.xc{
				border: #FF4500 solid 0.02rem;
				color: #FF4500;
			}
			.card{
				border: red solid 0.02rem;
				color: red;
			}
		}
	}

</style>
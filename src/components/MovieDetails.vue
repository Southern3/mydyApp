<template>
	<div class="details" v-if="MoiveDetails">
		<div class="top">
			<van-icon name="arrow-left" @click="back" />
			<div class="title">{{MoiveDetails.title}}</div>
		</div>

		<div class="Details">
			<div class="left">
			<img class="auto-img" v-lazy="MoiveDetails.images.large" />
			</div>
			<div class="right">
				<van-icon @click.native="goState({name:'Introduce',params:{pid:MoiveDetails.id}})" name="arrow" />
				<p class="title">{{MoiveDetails.title}}</p>
				<p class="aka">{{MoiveDetails.aka[2]}}</p>
				<!--<p class="aka">{{MoiveDetails.aka[3]}}</p>-->
				<p class="aka">{{MoiveDetails.aka[4]}}</p>
				<p class="countries">{{MoiveDetails.countries[0]}}</p>
				<!--<p class="average">评分<span>{{MoiveDetails.rating.average}}</span></p>-->
				<p class="average"><span>({{MoiveDetails.ratings_count}})</span>人评价</p>
				<p class="genres">类型:{{MoiveDetails.genres[0]}}/{{MoiveDetails.genres[1]}}/{{MoiveDetails.genres[2]}}</p>
				<p class="castsName">导演: {{MoiveDetails.directors[0].name}}</p>	
				<p v-if="MoiveDetails.casts" class="castsName">主演:{{MoiveDetails.casts[0].name}} {{MoiveDetails.casts[1].name}}</p>
				<!--<p class="introduction"><span>简介：</span>{{MoiveDetails.summary}}</p>-->
			</div>
		</div>
		
		<van-tabs v-model="active" ref="days" class="days">
		  <van-tab  :title=" today ">
		  	<van-col @click.native="goState({name:'CinemaDetails',params:{pid:item.id}})"  v-for="(item,index) in addrMoive" :key="index" class="vcol" span="22">
				<p class="title">{{item.nm}}<span class="price">{{item.sellPrice}}元起</span></p>
				<p class="addr">{{item.addr}}</p>
				<span class="distance">{{item.distance}}</span>				
				<p class="discount"><span class="gq">改签</span><span class="card">退</span><span class="xc">小吃</span><span class="gq">杜比全景声厅</span></p>
				<p class="cardPromotionTag">{{item.promotion.cardPromotionTag}}</p>
				<p>最晚场次:{{item.showTimes}}</p>
			</van-col>
		  </van-tab>
		  <van-tab  :title="tomorrow" >
		  	<van-col @click.native="goState({name:'CinemaDetails',params:{pid:item.id}})" v-for="(item,index) in addrMoive" :key="index" class="vcol" span="22">
				<p class="title">{{item.nm}}<span class="price">{{item.sellPrice}}元起</span></p>
				<p class="addr">{{item.addr}}</p>
				<span class="distance">{{item.distance}}</span>				
				<p class="discount"><span class="gq">改签</span><span class="xc">小吃</span><span class="gq">杜比全景声厅</span></p>
				<p class="cardPromotionTag">{{item.promotion.cardPromotionTag}}</p>
				<p>最晚场次:{{item.showTimes}}</p>
			</van-col>
		  </van-tab>
		  <van-tab :title="afterTomorrow">
		  	<van-col @click.native="goState({name:'CinemaDetails',params:{pid:item.id}})" v-for="(item,index) in addrMoive" :key="index" class="vcol" span="22">
				<p class="title">{{item.nm}}<span class="price">{{item.sellPrice}}元起</span></p>
				<p class="addr">{{item.addr}}</p>
				<span class="distance">{{item.distance}}</span>				
				<p class="discount"><span class="gq">改签</span><span class="xc">退</span><span class="card">折扣卡</span></p>
				<p class="cardPromotionTag">{{item.promotion.cardPromotionTag}}</p>
				<p>最晚场次:{{item.showTimes}}</p>
			</van-col>
		  </van-tab>
		
		</van-tabs>
		
		<van-loading v-if="isLoading" class="loading" type="spinner" color="white" />
		
	</div>
</template>

<script>
	
	import tool from '../utils/tool.js'
	
	import {  Tab, Tabs } from 'vant'
	
//	import {mapMutations} from 'vuex'
	
	export default{
		name:'MovieDetails',
		
		data(){
			
			return{
				id:'',
				active:0,
				MoiveDetails:'',
				addrMoive:[],
				isLoading:false,
				isshow : false,
				today:'',
				tomorrow:'',
				afterTomorrow:'',
				getMonth:'',
				getDate:'',
			};
		},
		
		methods:{
//			...mapMutations(['change']),
			back(){
				this.$router.go(-1);
			},
			goState(path){
				
				this.$router.push(path);
			}
		},
		components: {
			
			[Tab.name]:Tab, 
			
			[Tabs.name]:Tabs

		},
		beforeMount(){

			this.$toast('正在玩命 加载，请耐心等待');
		},
		
		created(){
//			this.isLoading = true;
			// 拿到传过来的id
			this.id = this.$route.params.pid;
//			console.log(this.id);
			// 把id拼接到接口上
			const url =' /api/v2/movie/subject/'+this.id+''
//			console.log(url)
			// 请求有id的接口		
			this.axios.get(url).then( res => {
//				this.isLoading = true;
//				console.log('某一部电影详情',res.data)
				 this.MoiveDetails= res.data ;
//				console.log('this.MoiveDetails',this.MoiveDetails)
//				this.isLoading = false;
			})


			const cinema = "/yy/cinema"
			this.axios.get(cinema).then( res =>{
//				console.log('全部影院详情',res.data);
				this.addrMoive=(res.data.data.cinemas);
//				console.log('某一个影院详情',this.addrMoive);
				this.isLoading = false;
			})
			var time = new Date();
			
			this.getMonth = Number(tool.format(time,'MM'))
			this.getDate = Number(tool.format(time,'dd'))
//			console.log(this.getMonth);
//			console.log(this.getDate);
			this.today = "今天"+this.getMonth +"月" + this.getDate+"日"
			this.tomorrow = "明天"+this.getMonth +"月" + (this.getDate + 1)+"日"
			this.afterTomorrow = "后天"+this.getMonth+"月" + (this.getDate + 2)+"日"
		
		       window.onscroll = function(){
   		//变量scrollTop是滚动条滚动时，距离顶部的距离
   		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
//   		console.log(scrollTop) 
//变量windowHeight是可视区的高度
   		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
//   		console.log(windowHeight) 
//变量scrollHeight是滚动条的总高度
   		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
//           console.log(scrollHeight)   
		 //滚动条到底部的条件
               if(scrollTop == 190){
                //写后台加载数据的函数
//				this.$refs.day.style.Position="fixed";
				
//				console.log(240240)
//			var days =this.$refs.days.$el
//			var days = document.querySelector('.days')
//			console.log(days)
//			days.style.position = 'fixed';
//			days.style.top = 190;

//         	console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
              }   
        }
		
//		localStorage.setItem("title",JSON.stringify(this.MoiveDetails}));
//		var t= JSON.parse(localStorage.getItem("title"));
//		console.log(t);
		
		
		}
		
	}
</script>

<style lang="less" scoped>
	.loading{
		position: fixed;
		top: 40%;
		left: 36%;
		font-size: 1rem;
		width: 2.4rem;
		height: 2.4rem;
		background: rgba(0,0,0,0.5);
	}
	.details{
		width: 100%;
		padding-top: 1.4rem;
	}
	.top{
		width: 100%;
		height:1.4rem;
		line-height: 1.6rem;
		text-align: center;
		background: #E54847;
		font-size: 0.4rem;
		color: #FFFFFF;
		letter-spacing: 0.1rem;
		position: fixed;
		top: 0;
		z-index: 999;
		.van-icon{
			width: 20%;
			height: 1.4rem;
			line-height: 1.6rem;
			font-size: 0.6rem;
			float: left;
			overflow: hidden;
			margin-left: -4%;
		}
		.title{
			width: 70%;
			/*background: #42B983;*/
			text-align: center;
			margin: 0 auto;
		}
	}
	.Details{
		width: 100%;
		height: 5rem;		
		background: url(../assets/b.jpg);
		/*background: rgba(0,0,0,0.5);*/
		.left{
			width: 30%;
			background: #E54847;
			float: left;
			margin: 4% 2%;
		}
		.right{
			width: 60%;
			height: 90%;
			/*background: #42B983;*/
			float: right;
			margin: 2% 3%;
			color: #c8c8c8;
			.van-icon{
				font-size: 0.6rem;
				position: absolute;
				right: 4%;
				top: 20%;
			}
			p{
				margin: 0.1rem 0;
			}
			.title{
				color: #FFFFFF;
				font-size: 0.5rem;
				font-weight: bold;
			}
			.average{
				span{
					margin-left: 0.2rem;
					font-size: 0.4rem;
					color: orange;
				}			
			}
			.introduction{
				width: 100%;
				height: 1.66rem;
				letter-spacing: 0.05rem;
				margin-top: 0.2rem;
					/*white-space: nowrap;*/
					text-overflow: ellipsis;
					overflow: hidden;
				span {
					color: orange;
					font-size: 0.38rem;
					margin-right: 0.2rem;
				}
			}
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
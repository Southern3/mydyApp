<template>
	<div class="index" v-if="newMoive && soonMoive">
			<div class="top">
				<div @click="goState({name:'City'})" class="city"><span>{{name}}</span><van-icon name="arrow-down" /></div>
				<h2 ref="topBar" class="topBar">猫眼电影</h2>	
				<van-icon @click="goState({name:'Search'})" class="vicon" name="search" />
			</div>		
		<van-tabs ref="vtabs" class="vtabs" v-model="active" :animated="true" :swipeable="true">
		  <van-tab class="vtlt" title="正在热映">
		  	
		  	<van-row class="dxx" ref="dxx">
		  		<div>
		  			<van-col @click.native="goState({name:'MovieDetails',params:{pid:item.id}})" v-for="(item,index) in newMoive" v-if="newMoive" :key="index" class="moiveTop" span="22" >
		  			<div class="moiveCenter">
		  			<div class="left">
		  				<img class="auto-img" :src="item.images.large"  />
		  			</div>
		  			<div class="right">
		  				<div class="state">购票</div>
		  				<p class="title">{{item.title}}</p>
		  				<p class="imax" v-if="item.rating.average > 8">
		  					<span class="sd">3D</span>
		  					<span class="max">IMAX</span>
		  				</p>
		  				<p class="count"><span>{{item.collect_count}}</span>人想看</p>
		  				<p>类型:{{item.genres[0]}} {{item.genres[1]}} {{item.genres[2]}}</p>
		  				<p class="score">评分<span>{{item.rating.average}}</span></p>		  				
		  				<van-rate
						  v-model="item.rating.average"
						  readonly
						  allow-half
						  :count="9"
						  void-icon="star"
						  void-color="#eee"
						/>
		  				<!--<input type="range" value="50" />-->
		  				<!--<p  class="castsName">主演:{{item.casts[0].name}}</p>-->		  				
		  			</div>
		  			</div>
		  		</van-col>
		  		</div>
		  		
		    </van-row>
		  </van-tab>
		  <van-tab class="vtlt" title="即将上映">
		  		<van-row>
		  		<van-col @click.native="goState({name:'MovieDetails',params:{pid:item.id}})" v-for="(item,index) in soonMoive" :key="index" class="moiveTop" span="22" >
		  			<div class="moiveCenter">
		  			<div class="left">
		  				<img class="auto-img" v-lazy="item.images.large"  />
		  			</div>
		  			<div class="right">
		  				<div class="state2">预售</div>
		  				<p class="title">{{item.title}}</p>
		  				<p class="count"><span>{{item.collect_count}}</span>人想看</p>
		  				<p>类型:{{item.genres[0]}} {{item.genres[1]}} {{item.genres[2]}}</p>
		  				<!--<p class="score">评分<span>{{item.rating.average}}</span></p>-->		  				
		  				<!--<p>{{item.collect_count}}p</p>-->
		  				<p>年份:{{item.year}}</p>
		  				<!--<p class="castsName">导演: {{item.directors[0].name}}</p>-->		  				
		  			</div>
		  			</div>
		  		</van-col>
		    </van-row>
		  </van-tab>
		</van-tabs>
			
		<!-- 标签导航 -->
		<!--<van-tabbar class="tabbar" v-model="active">
		  <van-tabbar-item :icon="item.icon" v-for="(item, index) in tabs" :key="index" @click="goState(item.path)">{{item.title}}</van-tabbar-item>
		</van-tabbar>-->
		
		<van-loading v-if="isLoading" class="loading" type="spinner" color="white" />
		
	</div>
	
	
	
</template>

<script>
	
	const url = "/api/v2/movie/in_theaters?start=0&count=40"
	
	const soonurl = "/soonurl/v2/movie/coming_soon?start=0&count=40"
	
	const top250url = "/top250api/v2/movie/top250?start=0&count=40"
	
//	import BScroll from 'better-scroll'

	
	//导入组件
	import { Tabbar, TabbarItem, Search, Tab, Tabs } from 'vant'
	
	export default{
		name:'Index',
		
		data(){
			return{
				id:'',
				name:'广州',
				state:'购票',
				active:0,
				average:[],
				newMoive:[],
				soonMoive:[],
				MoiveAll:[],
				
				isLoading:false,
				is3Dshow:false,
				tabs: [
					{title: '电影', icon: 'video-o', path: {name: '/'}},
					{title: '影院', icon: 'tv-o', path:{name: 'Cinema'}},
					{title: '我的', icon: 'manager-o', path: {name: 'MyCenter'}}
				]
			};
		},
		
			//节点渲染完成后
		mounted() {
//
			var topBar = this.$refs.topBar;

			var topBarHeight = getComputedStyle(topBar).height;
	
			var vtabs = this.$refs.vtabs.$el.firstChild;
			vtabs.style.position = 'fixed';
			vtabs.style.top = topBarHeight;
		},
		
		methods:{
			goState(path){
//				localStorage.setItem('mtitle',JSON.stringify(this.newMoive.title));
//				var mtitle = JSON.parse(localStorage.getItem('mtitle'))
//				console.log('mtitle',mtitle);
				this.$router.push(path);
			}
//			scrolls(){
//				this.$nextTick( () => {
//					if( !this.dxx ){
//						this.dxx = new BScoll(this.$refs.dxx)
//					}else{
//						this.dxx.refresh();
//					}
//				})
//			}
			
		},
		components: {

			[Tabbar.name]: Tabbar,

			[TabbarItem.name]: TabbarItem,
			
			[Search.name]:Search,
			
			[Tab.name]:Tab, 
			
			[Tabs.name]:Tabs

		},
//		beforeMount(){
//			
//		},
		created(){
			// 拿到传过来的城市id
			this.id = this.$route.query.id;
			this.name = this.$route.query.n;
//			console.log(this.id);
			// 正在热映电影
			this.isLoading = true;
			this.axios.get(url).then( res => {
				this.isLoading = false;
//				var newMoive = res.data
				// 循环到每一个电影对象然后添加到newmoive数组里面去
				res.data.subjects.forEach(newMoive => {

				this.average.push(newMoive.rating.average)
//				console.log(this.average );
				this.newMoive.push(newMoive)

			})
//				console.log('this.newMoive',this.newMoive)
//				this.MoiveAll.push(this.newMoive)
			})
			// 即将上映电影
			this.isLoading = true;
			this.axios.get(soonurl).then( res => {	
				var soonMoive = res.data
				soonMoive.subjects.forEach(soonMoive => {
				this.soonMoive.push(soonMoive)
//				this.MoiveAll.push(soonMoive)
				this.isLoading = false;				
			})
//				console.log('soonMoive',this.soonMoive);
//				this.MoiveAll.push(this.soonMoive); 
			})	
//			this.scrolls();
			
			
			

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
.index{
	width: 100%;
	height: 100%;
	padding-bottom:1.4rem;
	}
	.top{		
		.city{
			width: 20%;
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			font-size: 0.4rem;
			position: absolute;
			top: 15%;
			left: 5%;
			background: #E54847;
			color: #FFFFFF;
		}
		width:100%;
		letter-spacing: 0.2rem;
		position: sticky;
		top: 0;
		z-index: 666;
		.topBar{
		width: 100%;
		height: 1.4rem;
		line-height: 1.4rem;
		background: #e54847;
		text-align: center;
		font-size: 0.4rem;	
		color: #ffffff;

	}
	.vicon{
		position: absolute;
		top: 0.3rem;
		right: 0.2rem;
		font-size: 0.8rem;
		z-index: 667;
		color: #FFFFFF;
		}
	}
	.van-search{
		width: 80%;
		height: 100%;
		position: sticky;
		top: 1.4rem;
		float: right;
		z-index: 666;
	}
	.vtabs{
		/*width: 100%;*/
		/*height: 100%;*/
		position: sticky;
		top: 2.8rem;
		/*overflow: auto;*/
		/*margin-top: 1.4rem;*/
	}
	.dxx{
		width: 100%;
		height: 146.5PX;
	}
	.vtlt{
		/*padding: 0 0.2rem;*/
		
	}
	.moiveTop{
		width: 94%;
		height: 3.6rem;
		margin-left: 3%;
		/*background: #42B983;*/
		margin-top: 0.1rem ;
		
		.moiveCenter{
			width:100%;
			height:100%;
			overflow: hidden;
			
			.left{
				width: 25%;
				/*height: 84%;*/
				/*background: #E54847;*/
				margin-top: 3%;
				margin-left: 2%;
				float: left;
				overflow: hidden;
			}
			.right{
				float: right;
				width: 66%;
				height: 92%;
				/*background: #cccccc;*/
				/*margin-top: 2%;*/
				padding-left: 3%;
				border-bottom: 0.02rem solid #CCCCCC;
				margin-right: 3%;
				position: relative;
				.state{
					width: 20%;
					height: 0.8rem;
					line-height: 0.8rem;
					color: #FFFFFF;
					text-align: center;
					background: #E54847;
					position: absolute;
					top: 30%;
					right: 0;
				}
				.state2{
					width: 20%;
					height: 0.8rem;
					line-height: 0.8rem;
					color: #FFFFFF;
					text-align: center;
					background: dodgerblue;
					position: absolute;
					top: 30%;
					right: 0;
				}
				.imax{
					width: 27%;
					height: 0.3rem;
					line-height: 0.3rem;
					text-align: center;
					background: #FFFFFF;
					border: 0.05rem solid royalblue;
					border-radius: 0.1rem;
					position: absolute;
					top: 26%;
					right: 22%;
					span{
						text-align: center;
					}
					.sd{
						border-radius: 0.1rem;
						background: dodgerblue;
						padding:0 0.2rem;
					}
					.max{
						padding: 0.1rem 0;
						margin-left: 0.1rem;
					}
				}
				p{
					margin-top:0.1rem ;
					font-size: 0.3rem;
				}
				.title{
					font-size: 0.44rem;
					width: 70%;
					/*超出...*/
					font-weight: bold;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.count{
					span{
						margin-right: 0.2rem;
						color: orange;
						font-size: 0.4rem;
					}
				}
				.castsName{
					width: 70%;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 0.36rem;
				}
				.score{
					span{
						color: orange;
						margin-left: 0.2rem;
						font-size: 0.4rem;
					}
				}
			}
		}
	}
</style>
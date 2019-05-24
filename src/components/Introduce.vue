<template>
	<div class="introduce" v-if="MoiveDetails">
		<div class="top">
			<van-icon name="arrow-left" @click="back" />
			<div class="title">{{MoiveDetails.title}}</div>
		</div>
		
		<div class="Details" >
			<div class="left" v-if="MoiveDetails.images">
			<img class="auto-img" v-lazy="MoiveDetails.images.large" />
			</div>
			<div class="right" >
				<p class="title">{{MoiveDetails.title}}</p>
				<p v-if="MoiveDetails.aka[2]" class="aka">{{MoiveDetails.aka[2]}}</p>
				<!--<p class="aka">{{MoiveDetails.aka[3]}}</p>-->
				<p class="aka">{{MoiveDetails.aka[4]}}</p>
				<p v-if="MoiveDetails.countries[0]" class="countries">{{MoiveDetails.countries[0]}}</p>
				<p class="average">评分<span>{{MoiveDetails.rating.average}}</span></p>
				<!--<van-rate
						  v-model="MoiveDetails.rating.average"
						  readonly
						  allow-half
						  void-icon="star"
						  void-color="#eee"
						/>-->
				<p class="average">({{MoiveDetails.ratings_count}}人评价)</p>
				<p v-if="MoiveDetails.genres" class="genres">类型:{{MoiveDetails.genres[0]}} {{MoiveDetails.genres[1]}} {{MoiveDetails.genres[2]}}</p>
				<p class="castsName">导演: {{MoiveDetails.directors[0].name}}</p>	
				<p  class="castsName">主演:{{MoiveDetails.casts[0].name}} {{MoiveDetails.casts[1].name}}</p>
				<!--<p class="introduction"><span>简介：</span>{{MoiveDetails.summary}}</p>-->
			</div>
		</div>
		
		<div class="preferential">
			<div @click="goState({name:'MovieDetails'})" class="buyp">特惠购票</div>
			<div class="details">
				{{MoiveDetails.summary}}
			</div>
		</div>
		
		<div class="character" ref="dxx">
			<ul>
				<div>
					<li>
					<p class="portrait" v-if="MoiveDetails.directors[0]">
						<img class="auto-img" :src="MoiveDetails.directors[0].avatars.small" />
					</p>
					<p>{{MoiveDetails.directors[0].name}}</p>
					<p class="director">导演</p>
				</li>
				<li>
					<p class="portrait">
						<img class="auto-img" :src="MoiveDetails.casts[0].avatars.small" />
					</p>
					<p>{{MoiveDetails.casts[0].name}}</p>
					<p class="director">演员</p>
				</li>
				<li>
					<p class="portrait">
						<img class="auto-img" :src="MoiveDetails.casts[1].avatars.small" />
					</p>
					<p>{{MoiveDetails.casts[1].name}}</p>
					<p class="director">演员</p>
				</li>
				<li>
					<p class="portrait" v-if="MoiveDetails.casts[2]">
						<img class="auto-img" :src="MoiveDetails.casts[2].avatars.small" />
					</p>
					<p>{{MoiveDetails.casts[2].name}}</p>
					<p class="director">演员</p>
				</li>
				<li>
					<p class="portrait">
						<img class="auto-img" :src="MoiveDetails.casts[3].avatars.small" />
					</p>
					<p>{{MoiveDetails.casts[3].name}}</p>
					<p class="director">演员</p>
				</li>
				</div>
			</ul>
		</div>
		
	</div>
</template>

<script>
	
//	import BScroll from 'better-scroll'
	
	export default{
		name:'Introduce',
		
		data(){
			return{
				id:'',
				active:0,
				MoiveDetails:{},
			};
		},
		
		methods:{
			back(){
				this.$router.go(-1);
			},
			goState(path){
				this.$router.push(path);
			}
//			scrolls(){
//				
//					if( !this.dxx ){
//						this.dxx = new BScoll(this.$refs.dxx,{scrollX:true})
//					}else{
//						this.dxx.refresh();
//					}
//				
//			}
		},
		beforeMount(){

			this.$toast('正在玩命 加载，请耐心等待');
		},
//		mounted(){
//		this.$nextTick(()=>{
//			setTimeout(()=>{
//				this.scrolls();
//			},1000)
//		})
//		
//		},
		created(){
			this.id = this.$route.params.pid;
//			console.log(this.id);
			
			const url =' /api/v2/movie/subject/'+this.id+''
			this.axios.get(url).then( res => {
//				this.isLoading = true;
//				console.log('某一部电影详情',res.data)
				 this.MoiveDetails = res.data ;
//				console.log('this.MoiveDetails',this.MoiveDetails)
//				this.isLoading = false;
			})
			
		}
		
		
	}
</script>

<style lang="less" scoped>
	.introduce{
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
		overflow: hidden;	
		/*background: url(../assets/b.jpg);*/
		background: #625a70;
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
	
	.preferential{
		width: 100%;
		padding-top: 0.4rem;
		height: 4.4rem;
		background: #FFFFFF;
		.buyp{
			width: 90%;
			height: 1rem;
			line-height: 1rem;
			font-size: 0.44rem;
			letter-spacing: 0.1rem;
			text-align: center;
			color: #FFFFFF;
			margin: 0 auto;
			background: #E54847;
			border-radius: 0.4rem;
		}
		.details{		
			margin:0 auto;
			margin-top: 0.4rem;
			padding: 0 0.2rem;
			width: 94%;
			height: 2.7rem;
			overflow: auto;
			font-size: 0.4rem;
			color: #696969;
			background: #FFFFFF;
		}
	}
	.character{
		width: 100%;
		height: 3.2rem;
		margin: 0 auto;
		padding-bottom: 0.1rem;
		border-bottom: 0.05rem solid #f5f5f5;
		/*background: pink;*/
		overflow: hidden;
		ul{
			width:150%;
			height:100%;
			overflow: hidden;
			li{
				display: block;
				width: 2rem;
				height: 3.6rem;
				/*background: red;*/
				float: left;
				margin-right:0.2rem;
				p{
					text-align: center;
				}
				.portrait{
					width: 100%;
					height:2.4rem;
					overflow: hidden;
					background: #CCCCCC;
				}
			}
		}
	}
	
</style>
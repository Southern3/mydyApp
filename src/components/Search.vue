<template>
	<div class="search">
		<!-- 搜索 -->
		<!--<van-search @focus="goState({name: 'Search'})" ref="search" class="search" background="#f2f2f2" placeholder="输入商品名称关键字" />-->	
		<div class="topBar">
			<van-icon name="arrow-left" @click="back" />
			<p>搜索</p>
		</div>
		<div class="searchtop">			
				<van-search
			   ref="search"
			  class="search"
			  @click="focus"
			   v-model="value"
			  placeholder="请输入搜索关键词"
			  show-action
			  shape="round"
			>
		  		<div slot="action" @click="search">搜索</div>
			</van-search>
		</div>
		<keep-alive>
			<van-row>
			<!--  -->
				<van-col @click.native="goState({name:'MovieDetails',params:{pid:item.id}})" v-for="(item,inedx) in searchMoive"  class="moiveTop" span="22" >
		  			<div class="moiveCenter">
		  			<div class="left">
		  				<img class="auto-img" v-lazy="item.images.large"  />
		  			</div>
		  			<div class="right">
		  				<p class="title">{{item.title}}</p>		  										  						  					
		  				<p v-if="item.genres">类型:{{item.genres[0]}} {{item.genres[1]}} {{item.genres[2]}}</p>	  
		  				<!--<p class="castsName">主演:{{item.casts[0].name}}/{{item.casts[1].name}}/{{item.casts[2].name}}</p>-->		  				
		  				<p class="year"><span>年份:{{item.year}}</span></p>
		  				<p class="score">评分<span>{{item.rating.average}}</span></p>
		  				<van-rate
						  v-model="item.rating.average"
						  readonly
						  allow-half
						  :count="9"
						  void-icon="star"
						  void-color="#eee"
						/>
		  			</div>
		  			</div>
		  		</van-col>
			
		  		
		    </van-row>
		</keep-alive>
		
		<van-loading v-if="isLoading" class="loading" type="spinner" color="white" />
	</div>
</template>

<script>
	
	
	
	//导入组件
	import { Tabbar, TabbarItem, Search, Tab, Tabs, Toast } from 'vant'
	
	export default{
		name:'Search',
		
		data(){
			return{	
				value:'搜索一下',
				count:50,
				searchMoive:[],
				newMoive:[],
				isLoading:false,
			};
		},

		components: {

			[Tabbar.name]: Tabbar,

			[TabbarItem.name]: TabbarItem,
			
			[Search.name]:Search,
			
			[Tab.name]:Tab, 
			
			[Tabs.name]:Tabs,
			
			[Toast.name]:name

		},
		
		methods:{
			search(){
				
				if(this.value == '' || this.value == undefined){
					Toast('不能为空');
				}else if(this.value){
					this.isLoading = true
				const  SearchUrl = '/api/v2/movie/search?tag='+this.value+'&start=0&count=40'
				this.axios.get(SearchUrl).then( res => {
					this.isLoading = false
					var a = res.data;
					let arr = []
					a.subjects.forEach(s => {
						arr.push(s);
					})
					this.searchMoive = arr
//					console.log(this.searchMoive);

				})
				
			}
					
				
			},
			focus(){
				this.value = '';
			},
			goState(path){
				this.$router.push(path);
			},
			back(){
				this.$router.go(-1);
			}
		},
		
		created(){
			
			
 
        window.onscroll = function(){
   		//变量scrollTop是滚动条滚动时，距离顶部的距离
   		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
//   		console.log(123) 
//变量windowHeight是可视区的高度
   		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
//   		console.log(windowHeight) 
//变量scrollHeight是滚动条的总高度
   		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
//           console.log(scrollHeight)   
		 //滚动条到底部的条件
               if(scrollTop+windowHeight==scrollHeight){
                //写后台加载数据的函数
				this.count += 10;


//         	console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
              }   
        }

        
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
	.topBar{
		width: 100%;
		height:1.4rem;
		background: #E54847;
		position: sticky;
		top: 0;
		z-index: 666;
		.van-icon{
			font-size: 0.6rem;
			width: 15%;
			height: 1.44rem;
			color: #FFFFFF;
			text-align: center;
			line-height: 1.6rem;
			background: #E54847;
		}
		p{
			width: 30%;
			height: 100%;
			font-size: 0.5rem;
			letter-spacing: 0.1rem;
			color: #FFFFFF;
			position: absolute;
			top: 24%;
			left: 45%;
		}
	}
	.searchtop{		
		position: sticky;
		top: 1.3rem;
		z-index: 666;
		/*padding-left: 10%;*/
		width: 100%;
		/*right:0;*/
		.search{
		width: 100%;
		float: right;
		}
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
				height: 84%;
				background: #e54847;
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
				p{
					margin-top:0.1rem ;
					font-size: 0.3rem;
				}
				.title{
					font-size: 0.5rem;
					width: 50%;
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
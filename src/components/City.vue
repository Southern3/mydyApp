<template>
	<div class="city" ref="city">
		<div class="city_zm">
			<p v-show="currentWord(w)" v-for="(w,index) in city_zm" :key="index" @click="goCity(w)">{{w}}</p>		
		</div>
		<div class="hot">
			<p class="hosttop">热门城市</p>
			<van-row class="vrow">
				<van-col v-for="(item,index) in hostCity" :key="index" class="vcol" span="8">
					<span @click="Obtain({id:item.id,n:item.n})">{{item.n}}</span>
				</van-col>				
			</van-row>
		</div>
		
		<div class="cityList" v-for="(w,index) in city_zm" :key="index">
			<div class="zm">
				<span ref="page" v-show="currentWord(w)" >{{w}}</span>
				<p @click="Obtain({id:item.id,n:item.n})" class="citys" v-if="item.pinyinFull.slice(0,1) == w" v-for="(item,index) in Cityall" :key="index">
					{{item.n}}
				</p>
			</div>
		</div>
		
		<van-loading v-if="isLoading" class="loading" type="spinner" color="white" />
		
	</div>
</template>

<script>
	export default{
		name:'City',		
		data(){		
			return{
				isLoading:'false',
				hostCity:[],
				Cityall:[],
				city_zm:[
					'A','B','C','D','E','F','G',
					'H','I','J','K','L','M','N',
					'O','P','Q','R','S','T',
					'U','V','W','X','Y','Z'
				]
			};
		},
		
		methods:{
			Obtain(obj){
				this.$router.replace({path:'Index',query:{id:obj.id,n:obj.n}})
			},
			currentWord(w){
				return this.Cityall.find(item => item.pinyinFull.slice(0,1) == w)
				
			},
			goCity(a){
//				this.current = a;
				let pArr = this.$refs.page;
//				console.log(pArr)
				let p = pArr.find(item => item.textContent == a);
//				console.log(p)
				let topArr = p.offsetTop;
				console.log(topArr);
//				this.$refs.city.scrollTo(0,topArr);
				var city = document.querySelector('.city');
				city.style.position="absolute"
				city.style.top=-(topArr)+"px";
			}
		},
		
		created(){
			this.isLoading = true;
			const CityList = '/city/cityjson'
			this.axios.get(CityList).then( res =>{
//				console.log('data',res.data);
				 this.Cityall = res.data.data.p;
//				console.log('this.Cityall',this.Cityall);
				if( this.Cityall ){
					// 截取前十个作为热门城市
					this.hostCity = this.Cityall.slice(0,10);
//				console.log('this.hostCity',this.hostCity);
				}
				this.isLoading = false;
			})
			
			
		}
		
	}
</script>

<style lang="less" scoped>
.city{
	position: absolute;
	top: 0;
}
.loading{
		position: fixed;
		top: 40%;
		left: 36%;
		font-size: 1rem;
		width: 2.4rem;
		height: 2.4rem;
		background: rgba(0,0,0,0.5);
	}
	.city_zm{
		/*width: 10%;*/
		/*height: 2rem;*/
		background: rgba(0,0,0,0.3);
		position: fixed;
		right: 0;
		top: 10%;
		p{
			padding: 0.1rem;
			text-align: center;
		}
	}
	.hot{
		.hosttop {
			font-size: 0.4rem;
			margin-left: 0.4rem;
		}
		.vrow{
		width: 100%;
		/*height: 2rem;*/
		background: #f5f5f5;
		.vcol{
			padding: 0 6%;
			margin: 0.3rem 0;
			/*background: #CCCCCC;*/
			span{
				background: #FFFFFF;
				padding: 0.1rem 0.6rem;
				font-size: 0.4rem;
				margin: 0.4rem 0;
			}
		}
	}
	}
	.cityList{
		.zm{
			background: #F0F0F0;
			width: 100%;
			font-size: 0.5rem;
			/*padding-left: 5%;*/
			span{
				background: #F0F0F0;
				line-height: 0.4rem;
			}
			.citys{
				/*letter-spacing: 0.1rem;*/
				padding: 0.1rem 0;
				margin: 0.1rem 0;
				background: #FFFFFF;
			}
		}
	}
	

</style>
<template>
	<div class="CinemaDetails">
		<div class="topBar">
			<van-icon name="arrow-left" @click="back" />
			<p>{{cinemas.nm}}</p>
		</div>
		
		<div class="moiveaddr">
			<div class="addr">
				<p class="nameyy">{{cinemas.nm}}</p>
				<p>{{cinemas.addr}}</p>
			</div>
			<van-icon name="location-o" />
		</div>
		
		<div class="images">
			<ul class="imgul"  >
				<li  v-for="(item,index) in moive5" :key="index">
					<img @click="Rotation" class="auto-img" :src="item.images.large" />
				</li>
				
			</ul>
			
			<div class="introduce" >
				<p v-show="titleshow" v-if="moive5[0]" class="titles"><span>{{moive5[0].title == 'undefined' ? 123 : moive5[0].title}}</span><strong>{{moive5[0].rating.average}}分</strong></p>
				<p v-show="titleshow" v-if="moive5[0]" class="more">{{moive5[0].genres[0]}} | {{moive5[0].casts[0].name}} | {{moive5[0].year}}</p>
				<p v-show="titleshow2" v-if="moivedetails.title" class="titles"><span>{{moivedetails.title}}</span><strong>{{moivedetails.rating.average}}分</strong></p>
				<p v-show="titleshow2" v-if="moivedetails.genres" class="more">{{moivedetails.genres[0]}} | {{moivedetails.casts[0].name}} | {{moivedetails.year}}</p>
			</div>
		</div>
		
		<van-tabs v-model="active" ref="days" class="days">
			<div class="zhekou">
				<div class="left">折扣</div>
				<div class="center">购票享低价，首单2张立减6元</div>
				<div class="right">40元开卡   ></div>
			</div>
		  <van-tab  :title=" today ">
		  	<div class="watch" v-for="(item,index) in times" :key="index">
		  		<div class="time">
		  			<p class="start">{{item.start}}</p>
		  			<p class="end">{{item.end}}散场</p>
		  		</div>
		  		<div class="left">
		  			<p class="lange">英语3D</p>
		  			<p class="ting">3厅(大)</p>
		  		</div>
		  		<div class="center">
		  			<p class="price"><span class="jiage">￥{{item.price}}</span><span class="zk">折扣卡</span></p>
		  			<p class="youhui">折扣卡首单特惠</p>
		  		</div>
		  		<div @click="goState()" class="right" :id="index">购票</div>
		  	</div>
		  </van-tab>
		  <van-tab  :title="tomorrow" >
		  		<div class="watch" v-for="(item,index) in times" :key="index">
		  		<div class="time">
		  			<p class="start">{{item.start}}</p>
		  			<p class="end">{{item.end}}散场</p>
		  		</div>
		  		<div class="left">
		  			<p class="lange">英语3D</p>
		  			<p class="ting">3厅(大)</p>
		  		</div>
		  		<div class="center">
		  			<p class="price"><span class="jiage">￥{{item.price}}</span><span class="zk">折扣卡</span></p>
		  			<p class="youhui">折扣卡首单特惠</p>
		  		</div>
		  		<div class="right">购票</div>
		  	</div>
		  </van-tab>
		  <van-tab :title="afterTomorrow">
		  		<div class="watch" v-for="(item,index) in times" :key="index">
		  		<div class="time">
		  			<p class="start">{{item.start}}</p>
		  			<p class="end">{{item.end}}散场</p>
		  		</div>
		  		<div class="left">
		  			<p class="lange">英语3D</p>
		  			<p class="ting">3厅(大)</p>
		  		</div>
		  		<div class="center">
		  			<p class="price"><span class="jiage">￥{{item.price}}</span><span class="zk">折扣卡</span></p>
		  			<p class="youhui">折扣卡首单特惠</p>
		  		</div>
		  		<div class="right" >购票</div>
		  	</div>
		  </van-tab>
		
		</van-tabs>
		
		
			
	</div>
</template>

<script>
	
	import tool from '../utils/tool.js'
	
	import {  Tab, Tabs } from 'vant'
	
	export default{
		name:'CinemaDetails',
		
		data(){
			return{
				active:0,
				id:'',
				selecteSeat:[],
				addrMoive:[],
				cinemas:{},
				moive5:[],
				moivedetails:[],
				today:'',
				tomorrow:'',
				afterTomorrow:'',
				getMonth:'',
				getDate:'',
				titleshow:true,
				titleshow2:false,
				isLoading:false,
				times:[
					{start:'9:00',end:'11:00',price:'42'},{start:'9:50',end:'11:50',price:'46'},{start:'10:00',end:'12:00',price:'49'},
					{start:'10:30',end:'12:30',price:'39'},{start:'10:50',end:'12:00',price:'39'},
					{start:'11:00',end:'13:00',price:'52'},{start:'11:30',end:'13:30',price:'79'},{start:'11:50',end:'13:50',price:'79'},
					{start:'12:00',end:'15:00',price:'36'},{start:'12:30',end:'15:30',price:'42'},{start:'12:50',end:'15:50',price:'46'},
					{start:'13:00',end:'16:00',price:'39'},{start:'14:30',end:'17:30',price:'46'},{start:'16:50',end:'19:50',price:'49'},
					{start:'18:00',end:'21:00',price:'46'},{start:'19:30',end:'22:30',price:'46'},{start:'20:50',end:'23:50',price:'42'},
					{start:'21:00',end:'23:00',price:'39'},{start:'21:30',end:'23:30',price:'48'}
				]
			};
		},
		
		components: {
			
			[Tab.name]:Tab, 
			
			[Tabs.name]:Tabs

		},
		
		methods:{
			back(){
				this.$router.go(-1);
			},
			goState(){
				this.selecteSeat.push(this.cinemas.nm);
				this.selecteSeat.push(this.moivedetails.title)
				var index = event.target.getAttribute('id');
				this.selecteSeat.push(this.times[index])
				this.$router.push({name:'Seat',params:{seat:this.selecteSeat}})
//				({ name: 'user', params: { userId: '123' }})
// 将购买票的信息存到浏览器中
				localStorage.setItem('selecteSeat',JSON.stringify(this.selecteSeat))
				var selecteSeat =JSON.parse(localStorage.getItem('selecteSeat')) 
//				console.log('selecteSeat',selecteSeat);
				this.selecteSeat = selecteSeat
//				console.log('this.selecteSeat',this.selecteSeat)
				
			},
		
			Rotation (){
				this.titleshow = false;
				this.titleshow2 = true;
				var ul = document.querySelector('.imgul');
				var lis = document.querySelectorAll('.imgul>li')	
//				lis[0].classList.add('big')
//				var that = this;
				for( let i = 0; i < lis.length; i++){
					var liHeight = lis[i].offsetWidth;
					// 给每个li点击事件添加样式
					lis[i].onclick = function(){
						lis[i].classList.add('big')
						// 点击li改变ul的位置
						ul.style.marginLeft = (-(33 + liHeight) * i) +"px";
//						console.log('this==>',this);
						// 方法1:var that = this; 改变this 
						// 循环最新的几个电影然后加进moivedetails
//					for( let j = 0; j < moive5.length; j++ ){
//					console.log('moive5[j]',moive5[i]);
//					that.moivedetails =  that.moive5[i];
					// 点击li讲最新的几个电影添加到moivedetails
					this.moivedetails =  this.moive5[i];
//					window.moivedetails.push(moive5[j])
//					console.log('moivedetails',this.moivedetails);
//				方法2：	bind 改变this指向，指向vue实例
					}.bind(this)
					
				}

			}
			
		},	
		beforeMount(){
			this.$toast('正在加载，请耐心等待');
		},
		created(){
			
			this.id = this.$route.params.pid;
//			console.log("这个影院的详情id",this.id);
			const cinema = "/yy/cinema"
			this.axios.get(cinema).then( res =>{
//				console.log('全部影院',res.data);
				this.addrMoive=(res.data.data.cinemas);
				
//				console.log('某一个影院的详情2',this.addrMoive);
				this.isLoading = false;				
				this.addrMoive.forEach(r =>{
					if (r.id == this.id) {
						this.cinemas = r;
						
					}
				})
//				this.cinemas = localStorage.setItem("cinemas",this.cinemas);
//						this.cinemas = cinemas;
//				console.log('cinemas',this.cinemas);
			})
			
			const url = "/api/v2/movie/in_theaters?start=0&count=7"
			this.axios.get(url).then( res=>{
					res.data.subjects.forEach(newMoive => {
						this.moive5.push(newMoive);						
				})
//					console.log('this.moive5 ',this.moive5 );
			})
			
			var time = new Date();
			
			this.getMonth = Number(tool.format(time,'MM'))
			this.getDate = Number(tool.format(time,'dd'))
//			console.log(this.getMonth);
//			console.log(this.getDate);
			this.today = "今天"+this.getMonth +"月" + this.getDate+"日"
			this.tomorrow = "明天"+this.getMonth +"月" + (this.getDate + 1)+"日"
			this.afterTomorrow = "后天"+this.getMonth+"月" + (this.getDate + 2)+"日"
			
		}
		
	}
</script>

<style lang="less" scoped>

	.topBar{
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
			width: 6rem;
			line-height: 1.4rem;
			font-size: 0.4rem;
			color: #FFFFFF;
			letter-spacing: 0.1rem;
			text-align: center;
			/*margin: 0 auto;*/
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}

	.moiveaddr{
		width: 100%;
		height: 1rem;
		background: #FFFFFF;
		padding: 2% 0;
		.addr{
			width: 70%;
			height: 1rem;
			padding: 0 5%;
			color: #696969;
			border-right: 0.02rem solid #CCCCCC;
			line-height: 1rem;
			font-size: 0.3rem;			
			float: left;	
			.nameyy{
				font-weight: bold;
				font-size: 0.4rem;
			}
			p{
			width: 100%;
			margin-top: -0.3rem;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			}		
		}
		.van-icon{
			font-size: 0.8rem;
			width: 10%;
			height: 1rem;
			line-height: 1rem;
			float: right;
			margin-right: 0.44rem;
			color: dodgerblue;
		}
	}
	.images{
		width: 100%;
		height: 5.8rem;
		background: rgba(0,0,0,0.7);
		position: relative;
		overflow: hidden;
		ul{
			width: 180%;
			position: absolute;
			top: 10%;
			left: 44%;
			
			li {
				width: 1.8rem;
				/*height: 3rem;*/
				float: left;
				margin-right: 0.3rem;
			}
			.big{
				width: 2rem;
				/*height: 2.6rem;*/
				border: 0.05rem solid #FFFFFF;
				margin-top: -1%;
			}
		}
	}
	.zhekou{
		width: 100%;
		height: 0.8rem;
		background: rgba(255,245,230);
		>div{
			float: left;
			line-height: 0.8rem;
			margin-right: 0.6rem;
		}
		.left{
			height: 0.4rem;
			line-height: 0.4rem;
			margin-top: 0.2rem;
			margin-left: 0.3rem;
			color: #FFFFFF;
			/*padding:0.05rem;*/
			background: orange;
		}
		.center{
			color: orange;
		}
		.right{
			float: right;	
			color: #CCCCCC;
		}
	}
	.introduce{
		width: 100%;
		height: 2rem;
		text-align: center;
		background: #FFFFFF;
		position: absolute;
		bottom: 0;
		p{
			margin: 0.3rem 0;
		}
		.titles{
			font-size: 0.5rem;
			font-weight: bold;
			strong{
				margin-left: 0.2rem;
				color: orange;
				font-size: 0.4rem;
			}
		}
		.more{
			color: #696969;
		}
	}
	.watch{
		width: 100%;
		height: 2rem;
		/*background: pink;*/
		position: relative;
		border: 0.01rem solid #F0F0F0;
		>div{
			float: left;
			margin: 3% ;
			>p{
				margin: 2% 0;
				text-align: center;
			}
		}
		.time{
			.start{
				font-size: 0.5rem;
			}
			.end{
				color: #696969;
			}
		}
		.left{
			.lange{
				font-size: 0.4rem;
			}
			.ting{
				margin-top: 0.15rem;
				color: #696969;
			}
		}
		.center{
			margin-left: 1rem;
			.price{
				.jiage{
				font-size: 0.44rem;
				color: red;
			}
			.zk{
				background: orange;
				color: #FFFFFF;
				margin-left: 0.1rem;
				padding: 0.05rem;
			}
			}
			.youhui{
				margin-top: 0.2rem;
				color: #696969;
			}
		}
		.right{
			padding: 0.2rem;
			background: #E54847;
			color: #FFFFFF;
			border-radius: 0.1rem;
			position: absolute;
			top: 14%;
			right: 4%;		
		}
	}
	/*.vcol{
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
			/*.price{
				font-size: 0.45rem;
				color: red;
				margin-left: 0.4rem;
				font-weight: bold;
			}*/
		/*}
		.addr{
			width: 75%;
			color: #696969;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}*/
		/*.distance{
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
		.discount{*/
			/*span{
				padding: 0.05rem;
				margin-right: 0.1rem;
				border-radius: 0.1rem;
			}
			.gq{
				border: 0.02rem solid blue;
				color: blue;
			}
			.xc{*/
		
	/*}*/
</style>
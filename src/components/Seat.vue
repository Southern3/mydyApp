<template>
	<div class="seat" >
		
		<div class="topBar">
			<van-icon name="arrow-left" @click="back" />
			<p>{{selecteSeat[0]}}</p>
		</div>
		
		<div class="details">
			<p class="title">{{selecteSeat[1]}}</p>
			<p  class="time">{{day}}-{{selecteSeat[2].start}}-{{selecteSeat[2].end}}</p>
		</div>
		
		<div class="centersaat">
			<div class="ting">3号厅</div>
			<div @click="seatloop" class="leftseat" v-for="(item,index) in seatnum" :key="index">
				<div class="lfseat">{{item.num}}</div>
				<div class="rtseat" ref="rtseat">
					<img src="../assets/img/baiseat.png" />
					<img src="../assets/img/baiseat.png" />
					<img src="../assets/img/baiseat.png" />
					<img src="../assets/img/baiseat.png" />
					<img src="../assets/img/baiseat.png" />
					<img src="../assets/img/baiseat.png" />
					<img src="../assets/img/baiseat.png" />
					<img src="../assets/img/baiseat.png" />
					<img src="../assets/img/baiseat.png" />
					<img src="../assets/img/baiseat.png" />
					<img src="../assets/img/baiseat.png" />
					<img src="../assets/img/baiseat.png" />
				</div>
			</div>
			<div class="xseat">
				<span><img src="../assets/img/baiseat.png"/>可选</span>
				<span><img src="../assets/img/greenseat.png"/>已选</span>
				<span><img src="../assets/img/redseatpng.png"/>已售</span>
				<span><img src="../assets/img/ql.png" />情侣座</span>
			</div>
		</div>
		
		<div class="footer" v-show="isShow">
			<div class="tzseat">
				<span>推荐座位</span>
				<span class="person">1个人</span>
				<span class="person">2个人</span>
				<span class="person">3个人</span>
				<span class="person">4个人</span>
			</div>
			<div class="selectionseat">请先选座</div>
		</div>
		
		<div class="footer2" v-show="isShow2">
			<span class="sp">已选座位</span>
			<div class="yxseat" v-for="(item,index) in Seatnumberp" :key="index">
				<p>{{Seatnumberp[index]}}排{{Seatnumbers[index]}}座</p>
				<span>￥{{Cseat[2].price}}</span>
				<!--<div @click="removeseat" class="del"></div>-->
				<van-icon @click="removeseat" class="del" name="cross" />
			</div>
			<div class="selectionseat" @click="goState"><span>￥{{Cseat[2].price * Seatnumberp.length}}</span>确认选座</div>
		</div>
	
	</div>
</template>

<script>
//	import {mapState} from 'vuex'
	import tool from '../utils/tool.js'
	
	export default{
		name:'seat',
		data(){
			return{
//				publicPath:process.env.BASE_URL,
				Cseat:{},
				isShow:true,
				isShow2:false,
				// 每排的数组
				Seatnumberp:[],
				// 座位号的数组
				Seatnumbers:[],
				// 拿到传过来的信息
				selecteSeat:[],
				// 将要传的数据添加进去
				pay:[],
				// 今天的日期
				day:[],
				// 下单的时候
				time:[],
				// 存放点击了座位图片
				seatimgs:[],
				seatps2:[],
				seatnum:[					
					{num:'1'},{num:'2'},{num:'3'},{num:'4'},{num:'5'},
					{num:'6'},{num:'7'},{num:'8'},{num:'9'},{num:'10'}
				],
				srcArr:[
					require("../assets/img/ql.png"),
					require("../assets/img/baiseat.png"),
					require("../assets/img/greenseat.png"),
					require("../assets/img/redseatpng.png")
				]

			};
		},
//		computed: {
//			...mapState({
//				title,
//			})
//		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			goState(){
				
				  var ticket = localStorage.getItem('ticket')
//			      console.log('ticket',ticket)
			      ticket = ticket == undefined ? [] : JSON.parse(ticket)
//			      console.log('ticket',ticket)
			      
			      var seatps2 = localStorage.getItem('seatps2')
//			      console.log('seatps2',seatps2)
			      seatps2 = seatps2 == undefined ? [] : JSON.parse(seatps2)
//			      console.log('seatps2',seatps2)
				var seatps = {
					Seatnumberp: this.Seatnumberp,
	      			Seatnumbers: this.Seatnumbers,	
				}
				this.seatps2 = seatps;
//				this.seatps2 = seatps2
				localStorage.setItem('seatps2',JSON.stringify(this.seatps2));
//				console.log('seatps2',seatps2)
				
			var info = {
				seatps2:this.seatps2,
//	      	Seatnumberp: this.Seatnumberp,
//	      	Seatnumbers: this.Seatnumbers,
	      	start: this.Cseat[2].start,
	      	end: this.Cseat[2].end,
	      	price:this.Seatnumbers.length * this.Cseat[2].price,
	      	addr:this.selecteSeat[0],	
	      	title:this.selecteSeat[1],	
	      	day:this.day,
	      	time:this.time
	      		}
//			console.log('info',info)
				

				ticket.push(info )
//				ticket.push(seatps )
			this.pay = ticket;
//			console.log('this.pay',this.pay)
			// 将购买票的信息存到浏览器中
			localStorage.setItem('ticket',JSON.stringify(this.pay))

			this.$router.push({name:'Payment'})

			},
			clickseat(){
				this.isShow = false;
				this.isShow2 = true;
			},
			clickseat2(){
				this.isShow = true;
				this.isShow2 = false;
			},
		
			seatloop(){
				this.clickseat();
//				if( this.Seatnumbers.length >= 5 ){
//							this.$toast('最多选择五个座位喔');
////							.removeEventListener("click", handler, false);
//						}
				var seatimg = document.querySelectorAll('.rtseat>img');
				// 拿到座位号
				var Seatnumbers = this.Seatnumbers;
				var seatimgs = this.seatimgs;
				var srcArr = this.srcArr;
				var isShow = this.isShow;
				var isShow2 = this.isShow2;
				for(let i = 0; i < seatimg.length; i++){
					seatimg[i].onclick = function (){
						// 座位号
						console.log('seatimg[i]',(i+1));
						
						// 点击的座位改变颜色						
						seatimg[i].src = srcArr[2];
						Seatnumbers.push(i+1);
						seatimgs.push(seatimg[i]);
//						console.log('seatimgs',seatimgs);
						if( Seatnumbers.length == 5 ){
//							this.$toast('最多选择五个座位喔');
//						console.log(46546546);
						
//							seatimg[i].removeEventListener("click", function() {}, false);
						}
//			console.log('this.Seatnumbers',Seatnumbers)
//					console.log('img[i]',seatimg[i])
					}
					
				}
				
				var leftseat = document.querySelectorAll('.leftseat');
				// 拿到每排的数字
				var Seatnumberp = this.Seatnumberp
				for(let j = 0; j < leftseat.length; j++){
					leftseat[j].onclick = function(){
						// 排号
//						console.log('leftseat[j]',(j+1))
						Seatnumberp.push(j+1);
//						console.log('this.Seatnumberp',Seatnumberp)
					}
				}

			},
			removeseat(){
				var dels = document.querySelectorAll('.del')
//				console.log('dels',dels);
				var Seatnumbers = this.Seatnumbers;
				var Seatnumberp = this.Seatnumberp;
				var seatimgs = this.seatimgs;
				var srcArr = this.srcArr;
				var isShow = this.isShow;
				var isShow2 = this.isShow2;
				var clickseat2 = this.clickseat2
//				var clickseat2 = this.clickseat2();
				for( let i = 0; i < dels.length; i++ ){
						dels[i].onclick = function(){
							Seatnumbers.splice(i,1);
							Seatnumberp.splice(i,1);						
							seatimgs[i].src = srcArr[1];
							seatimgs.splice(i,1);
							console.log(Seatnumberp.length);
//							console.log("seatimgs",seatimgs)
							// 当删除所以票的时候切换底部内容
							if( Seatnumberp.length == 0 ){
//								console.log(13245646);
									clickseat2()
							}
						}
							
				}
			
			}
		},
		
		created(){
			
//			console.log(this.$route.params)
			this.Cseat = this.$route.params.seat;
//			console.log(this.Cseat)
			
			var selecteSeat =JSON.parse(localStorage.getItem('selecteSeat')) 
//			console.log('selecteSeat',selecteSeat)
			if( selecteSeat ){
				this.selecteSeat = selecteSeat
//			console.log('this.selecteSeat',this.selecteSeat)
			}
			var time = new Date();
			this.day = tool.format(time,'yyyy-MM-dd')
			this.time = tool.format(time,'yyyy-MM-dd hh:mm:ss')
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
	.details{
		width: 100%;
		height: 1.2rem;
		padding: 0.3rem 0;
		/*background: pink;*/
		.title{
			font-size: 0.4rem;
			font-weight: bold;
		}
		.time{
			margin-top: 0.1rem;
			color: #696969;
		}
	}
	.centersaat{
		width: 100%;
		height: 11rem;
		background: #f0f0f0;
		overflow: hidden;
		position: relative;
		.ting{
			width: 50%;
			height: 1rem;
			line-height: 1.6rem;
			background: #CCCCCC;
			text-align: center;
			margin: 0 auto;
			margin-top: -0.5rem;
			border-radius: 0.5rem;
			margin-bottom: 1.4rem;
		}
		.leftseat{
			width: 100%;
			height: 1rem;
			margin: -0.3rem;
			/*margin-top: 1rem;*/
			.lfseat{
				width: 5%;
				float: left;
				border-radius: 0.1rem;
				text-align: center;
				background: #CCCCCC;
				line-height: 0.6rem;
				margin-left: 0.4rem;
			}
			.rtseat{
				float:left;
				margin-left: 1rem;
				img{
					width: 0.6rem;
					height: 0.6rem;
				}
			}
		}
		.xseat{
			width: 60%;
			padding: 0 10%;
			height: 1rem;
			line-height: 1rem;
			/*background: #CCCCCC;*/
			position: absolute;
			bottom: 0;
			left: 10%;
			span{
				margin-right:0.16rem;
				img{
					margin:0 0.1rem;
					width: 0.4rem;
					height: 0.4rem;
				}
			}
		}
	}
	.footer{
		width: 100%;
		height: 3rem;
		position: fixed;
		bottom: 0;
		/*background: pink;*/
		.tzseat{
			width: 90%;
			height: 1rem;
			line-height: 1rem;
			/*background: red;*/
			padding:0.2rem 0;
			span{
				font-size: 0.4rem;
				padding-left:0.2rem
			}
			.person{
				width: 1.6rem;
				border: 0.05rem solid #CCCCCC;
				margin-right: 0.14rem;
				padding: 0.14rem;
			}
		}
		.selectionseat{
			width: 90%;
			height: 1rem;
			padding: 0.1rem 0;
			line-height: 1rem;
			margin: 0 auto;
			border-radius: 0.4rem;
			text-align: center;
			font-size: 0.4rem;
			color: #FFFFFF;
			background: #ffddb2;
		}
	}
		.footer2{
		width: 100%;
		height: 3rem;
		position: fixed;
		bottom: 0;
		/*background: pink;*/
		.sp{
			/*position: absolute;
			top: 0.1rem;
			left: 0.1rem;*/
			display: block;
			margin-top: -0.4rem;
		}
		.yxseat{
			width:16%;
			height: 1rem;
			margin-right: 0.1rem;
			float: left;
			text-align: center;
			line-height: 1rem;
			border: #CCCCCC solid 0.05rem;
			position: relative;
			/*padding:0.2rem 0;*/
			.van-icon{
				width: 0.3rem;
				height: 0.3rem;
				/*background: red;*/
				position: absolute;
				top: 0;
				right: 0;
			}
			p{
				text-align: center;
				width: 1.6rem;
				height: 0.3rem;
				display: block;
			}
		}
		.selectionseat{
			width: 90%;
			height: 1rem;
			padding: 0.1rem 0;
			line-height: 1rem;
			position: absolute;
			top: 46%;
			left: 5%;
			border-radius: 0.4rem;
			text-align: center;
			font-size: 0.4rem;
			color: #FFFFFF;
			background: #ff9900;
		}
	}
</style>
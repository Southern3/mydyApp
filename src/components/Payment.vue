<template>
	<div class="payment">
		<div class="topBar">
			<van-icon name="arrow-left" @click="back" />
			<p>支付订单</p>
		</div>
		
		<div class="product" v-for="(item,index) in Cseat" :key="index">
			<div class="paytime">
			<p>支付剩余时间: <span>{{minute}}:{{second}}</span></p>
			</div>
			<p class="title">{{Cseat[index].title}}</p>
			<p>{{Cseat[index].day}}/{{Cseat[index].start}}-{{Cseat[index].end}}(3D)</p>
			<p>{{Cseat[index].addr}}</p>
			<p v-for="(item,w) in Cseat[index].seatps2.Seatnumberp" :key="w">
				{{Cseat[index].seatps2.Seatnumberp[w]}}排 -
				{{Cseat[index].seatps2.Seatnumbers[w]}}座
			</p>	
			<p class="pp"><span class="lf">活动与抵用卷</span><span class="rt">无可用</span></p>
			<p class="pp"><span class="lf">手机号码</span><span class="rt">17346605735</span></p>
			<p class="pp"><span class="lf">小计</span><span class="rt red">￥{{Cseat[index].price}}</span></p>
			<p class="time">下单时间:{{Cseat[index].time}}</p>
		</div>
		
		<div  v-show="isShownull" class="null">你还没有提交的订单喔，赶快去购票吧</div>
		<div v-show="isShow" @click="keyboard" class="paymoney">确认付款</div>
		
		
		<!--<van-button @touchstart.stop="show = true">-->
			 <!--<van-password-input
		  :value="value"
		  info="密码为 6 位数字"
		  @focus="showKeyboard = true"
		:show="show"
		/>-->
		<van-number-keyboard		
		  :show="show"
		  extra-key="."
		  close-button-text="完成"
		  @blur="show = false"
		  @input="onInput"
		  @delete="onDelete"
		/>
		<!--</van-button>-->
						
		
		
	</div>
</template>

<script >
	
	import tool from '../utils/tool.js'
	
	import { NumberKeyboard, Toast, Button,  PasswordInput  } from 'vant';
	
	export default{
		
		name:'Payment',
		data(){
			return{
				payseat:{},
				Cseat:[],
				seatps2:[],
				minute:14,
				second:60,
				isShow:true,
				isShownull:true,
				day:'',
				show: false,
				 value: '123',
      			showKeyboard: true
			};
		},
		components:{
			[NumberKeyboard.name]:NumberKeyboard,
			[Toast.name]:Toast,
			[Button.name]:Button,
			[PasswordInput.name]:PasswordInput,
	
		},
		methods:{
			back(){
//				this.$router.push({name:'CinemaDetails'});
				this.$router.go(-2);
			},
			goState(){

				this.$router.push({name:'Payment'})

			},
			  onInput(key) {
		      this.value = (this.value + key).slice(0, 6);
		    },
		    onDelete() {
		      this.value = this.value.slice(0, this.value.length - 1);
		    },
		    keyboard(){
		    	this.show = true;
		    }
		},
		
		created(){
			// 传过来的数据
//			console.log(this.$route.params)
//			this.payseat = this.$route.params.pays;
//			console.log(this.payseat)
			// 讲传过来的数据存到浏览器中
//			localStorage.setItem('payseat',JSON.stringify(this.payseat))
			var ticket =JSON.parse(localStorage.getItem('ticket')) 
//			console.log('ticket',ticket)
			if( ticket ){
				this.isShow = true;
				this.isShownull = false;
				this.Cseat = ticket
//			console.log('this.Cseat',this.Cseat)
			}else{
				this.isShow = false;
			}
			
			var seatps2 =JSON.parse(localStorage.getItem('seatps2')) 
//			console.log('seatps2',seatps2)
			this.seatps2 = seatps2;
			
			// 支付剩余时间
			window.setInterval(() => {
					this.second --;
					if(this.second == 0){
						this.second = 60;
						this.minute --;
						if(this.minute <= 0 ){
							this.minute = 0;
						}
					}
//					console.log(this.second)
				},1000)
			
//			var time = new Date();
//			this.day = tool.format(time,'yyyy-MM-dd hh:mm:ss')
			
		}
		
		
	}
</script>
<style lang="less" scoped>
	.payment{
		position: relative;
	}
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
			width: 40%;
			line-height: 1.4rem;
			font-size: 0.4rem;
			color: #FFFFFF;
			text-align: left;
			margin: 0 auto;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
	.product{
		width: 100%;
		/*height: 8rem;*/
		background: #ffff;
		p{
			font-size: 0.4rem;
			margin-left: 0.2rem;
			margin-bottom: 0.2rem ;
		}
		.time{
				color: orange;
			}
		.pp{
			height: 1rem;
			line-height: 1rem;
			margin-top: 0.4rem;
			/*background: pink;*/
			border-bottom: 0.05rem solid #CCCCCC;
			.lf{
				margin-left: 0.4rem;
				float: left;
				color: #696969;
			}
			.rt{
				margin-right: 0.4rem;
				float: right;			
			}
			.red{
					color:red;
				}
			
		}
	}
	.paytime{
		background: #fef3d9;
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		p{
			text-align: center;
			margin: 0 auto;
			color: orangered;
		}
	}
	.null{
		width: 100%;
		height: 1.4rem;
		line-height: 1.4rem;
		text-align: center;
		font-size: 0.4rem;
		background: #f5f5f5;
	}
	.paymoney{
		width: 90%;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.4rem;
		color: #FFFFFF;
		background: orange;
		text-align: center;
		border-radius: 0.4rem;
		position: sticky;
		bottom: 0;
		left: 5%;
		/*margin-top: 1.4rem;*/
	}
	.van-button{
		position: fixed;
		top: 45%;
		width: 100%;
	}
</style>
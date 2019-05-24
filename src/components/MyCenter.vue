<template>
	<div class="mycenter">
		
		<div class="topBar">
			<!--<van-icon name="arrow-left" @click="back" />-->
			<p>我的</p>
		</div>
		
		<div class="Headportrait">
			<div class="img">
				<van-uploader class="upimg" :after-read="onRead" >				
			  		 <img class="auto-img smallimg" src="../assets/dx.png" ref="goodsImg"/>
				</van-uploader>
			</div>
		</div>
		
		<div class="order">
			<p class="myorder" @click="gopay">我的订单</p>
			<div class="left">
				<van-icon name="browsing-history" />
				<p>电影</p>
			</div>
			<div class="right">
				<van-icon name="lock" />
				<p>商城</p>
			</div>
		</div>
		
		<div @click="goLogin" class="login">切换用户/登录</div>
		<!--<div class="rig">立即注册</div>-->
		
	</div>
</template>

<script>
	
		import {  Uploader } from 'vant'
	
	export default{
		name:'MyCenter',
		
		components:{
		    [Uploader.name]:Uploader
		},
		
		methods:{
			// 上传头像，更换头像
			onRead(file) {
		       console.log(file);
		       //将原图片显示为选择的图片
		       this.$refs.goodsImg.src = file.content;
		 },
		 gopay(){
		 		this.$router.push({name:'Payment'})
		 },
		 goLogin(){
		 		this.$router.push({name:'Login'})
		 }
		}
		
	}
</script>

<style lang="less" scoped>
	.mycenter{
		background: #CCCCCC;
	}
	.topBar{
		width: 100%;
		height:1rem;
		background: #E54847;
		position: sticky;
		top: 0;
		z-index: 666;
		.van-icon{
			font-size: 0.4rem;
			width: 15%;
			height: 1rem;
			color: #FFFFFF;
			text-align: center;
			line-height: 1rem;
			background: #E54847;
		}
		p{
			width: 30%;
			height: 100%;
			font-size: 0.4rem;
			color: #FFFFFF;
			position: absolute;
			top: 24%;
			left: 45%;
		}
	}
	.Headportrait{
		width: 100%;
		height: 2rem;
		padding: 1rem 0;
		background: rgba(233,79,73);
		.img{
			width: 1.6rem;
			height: 1.6rem;			
			margin: 0 auto;
			border: 0.05rem solid #FFFFFF ;
			background: #FFFFFF;
			border-radius: 50%;
			overflow: hidden;
			.smallimg {
				width: 1.6rem;
				height: 1.6rem;
				/*margin: 0.2rem;*/
				border-radius: 50%;
			}
		}
	}
	.order{
		width: 96%;
		height: 3.2rem;
		background: #FFFFFF;
		margin: 0.2rem;
		/*margin: 0.2rem 0;*/
		.myorder{
			width: 30%;
			padding: 0.2rem 0;
			margin: 0 auto;
			text-align: center;			
		}
		.left{
				width: 1.4rem;
				height: 2rem;
				/*background: red;*/
				float: left;
				margin-left: 1.4rem;
				.van-icon{
					/*width: 1rem;*/
					margin-left:0.1rem;
					padding: 0.2rem;
					/*height: 1rem;*/
					font-size: 0.8rem;
					color: #FFFFFF;
					border-radius: 50%;
					background: #E54847;
					text-align: center;
				}
				p{
					margin-top: 0.2rem;
					text-align: center;
				}
			}
		.right{
				width: 1.4rem;
				height: 2rem;
				float: right;
				margin-right: 1.4rem;
				.van-icon{
					/*width: 1rem;*/
					margin-left:0.1rem;
					padding: 0.2rem;
					/*height: 1rem;*/
					font-size: 0.8rem;
					color: #FFFFFF;
					border-radius: 50%;
					background: #E54847;
					text-align: center;
				}
				p{
					margin-top: 0.2rem;
					text-align: center;
				}
			}
	}
	
	.login{
		width: 90%;
		height: 1.2rem;
		line-height: 1.2rem;
		text-align: center;
		background: #E54847;
		margin: 0 auto;
		color: #FFFFFF;
		font-size: 0.4rem;
		border-radius: 0.4rem;
		position: fixed;
		bottom: 3rem;
		left: 5%;
	}

	
</style>
<template >
	<div class="login">

		<div class="top">	
			<van-nav-bar
				  title="欢迎登录"
				  left-text="返回"
				  left-arrow
				  @click-left="back"
				/>
		</div>
		
		<div class="xmimg">
			<!--<img class="auto-img" src="../assets/timg.jpg"  />-->
		</div>
		
		<van-row class="log">
			<van-col class="logcol" offset="2" span="20">
				<van-cell-group>
					<van-field class="userphone"    v-model="userInfo.phone" label="账号"  placeholder="输入账号" />
					<van-field class="userpwd"   type="password" v-model="userInfo.pwd" label="密码"  placeholder="密码" />
				</van-cell-group>
					<van-button  @click="goState({name:'Main'})"  class="register-btn" size="large" type="info" >立即登录</van-button>
					<van-button  @click="goState({name:'Register'})"  class="register-btn2" size="large" type="info" >立即注册</van-button>
			</van-col>
		</van-row>
		
		<div class="footer">
			<span>简体</span>
			<span>|</span>
			<span>繁体</span>
			<span>|</span>
			<span>English</span>
			<span>|</span>
			<span>常见问题</span>
			<span>|</span>
			<span>隐私政策</span>			
		</div>
		
	</div>
</template>

<script>

import {CellGroup, Field, Button, Loading, NavBar } from 'vant'

import validForm from '../utils/validForm.js'
	
import tip from '../utils/tip.js'

export default{
		name:'Login',
		
			data(){
			return{
				
				users:[],
				
			userInfo:{
					phone:'',
					pwd:''
				}
			};
		},

		components:{
			[CellGroup.name]:CellGroup,
			[Field.name]:Field,
			[Button.name]:Button,
			[Loading.name]:Loading,
			[NavBar.name]:NavBar
//			[Uploader.name]:Uploader
		},
		
		methods:{
			
			back(){
				this.$router.go(-1);
			},
			
			goState(path){
				this.$router.push(path);
			},
			
//			onRead(file) {
//		       console.log(file);
//		       //将原图片显示为选择的图片
//		       this.$refs.goodsImg.src = file.content;
//		 },
//		
			login(){
				if( !validForm.validPhone(this.userInfo.phone) ){
						
					tip.dialogTip('手机号码不正确', true, this.userInfo, 'phone');
					
				}else if( !validForm.validPwd(this.userInfo.pwd,8,16) ){
					
					tip.dialogTip('密码只支持!@._字母数字组合', true, this.userInfo, 'pwd');
					
				}else{
				
					var userData = localStorage.getItem('users');
					
					if(userData){
						// 如果存在用户
						this.users = JSON.parse(userData);
//						console.log('userData',userData);
						for(var i = 0; i < this.users.length; i++){
							if(this.users[i].phone == this.userInfo.phone){
								// 如果手机号匹配验证密码
								
								if(this.users[i].pwd == this.userInfo.pwd){
									//保存用户登录状态{userId: 手机号, loginStatus: true}
									localStorage.setItem('userLogin', JSON.stringify({userId: this.userInfo.phone,loginStatus: true}));
									
								
									
										return this.$router.push({name:'MyCenter'});
										
									
									
								}else{
									return tip.dialogTip('手机号或者密码不正确');
									
								}
								
								
							}
						}
						//不存该用户
						tip.dialogTip('该用户不存在');
					}
			}
			
		
		}

		}
		
	}
</script>

<style scoped lang="less">
	
	.login{
		width: 100%;
		height: 14.2rem;
		padding-top:2rem;
		/*background: url(../assets/img1/bjt02.jpg) no-repeat;*/
		background-size: 100% 100%;
		overflow: auto;
		/*position: relative;*/
	}
	
	.top{
		position: fixed;
		top: 0;
		width: 100%;
	}
	.xmimg{
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		margin: 0.4rem auto;
		overflow: hidden;
	}
	
	.register-btn{
		background: #E54847;
		margin: 0.6rem 0;
		letter-spacing: 0.1rem;
		border-radius: 0.3rem;
	}
	
	.register-btn2{
		background-color: #f0f0f0;
		border-radius: 0.3rem;
		color: #000000;
	}
	
	.van-field{
		margin: 0.4rem 0;
	}
	
	.footer{
		width: 100%;
		text-align: center;
		position: fixed;
		bottom: 10%;
		span{
			font-size: 0.4rem;
			margin: 0 0.1rem;
			color: #696969;
		}
	}
	
</style>
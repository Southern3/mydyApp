<template>
	<div class="register">
			<van-nav-bar
				  title="欢迎注册账号"
				  left-text="返回"	
				  left-arrow
				  right-arrow
				  @click-left="onClickLeft"

				/>
		<van-row class="log">
			<van-col class="logcol" offset="2" span="20">
				<van-cell-group>
					<van-field  label="手机号" v-model="userInfo.phone" placeholder="输入手机号" />
					<van-field  type="password" label="密码" v-model="userInfo.pwd" placeholder="密码(8-16位)" />
					<van-field  type="password" label="确认密码" v-model="userInfo.repwd" placeholder="确认密码" />

					<van-field  label="短信验证码" v-model="userInfo.validcode">
					<van-button :disabled='isDisbabel' @click="getCode" slot="button" size="small" type="primary">{{validCodeText}}</van-button>
					</van-field>
				</van-cell-group>
					<van-button class="register-btn" size="large" type="info" @click="regitser">注册</van-button>
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
	
	
	import { Row, Col, CellGroup, Field, Button,  Dialog, NavBar} from 'vant'
	
	import validForm from '../utils/validForm.js'


	import tool from '../utils/tool.js'
	
	import tip from '../utils/tip.js'
	
	export default{
		
		name:'Register',
		
		data(){
			return{
				// 验证码
				validCode:'',
				
				validCodeText:'发送验证码',
				
				isDisbabel:false,
				
				//用户列表
				users:null,
				
				//用户信息
				userInfo:{
					phone:'',
					pwd:'',
					repwd:'',
					validcode:''
				}
			}
		},
		
		components:{
			[ Row.name]: Row,
			[ Col.name]:  Col,
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button,
			[NavBar.name]: NavBar
//			[Dialog.name]: Dialog
		},
		
		methods:{
			
			regitser() {
				
				if( !validForm.validPhone(this.userInfo.phone) ){
						
					tip.dialogTip('手机号码不正确', true, this.userInfo, 'phone');
					
				}else if( !validForm.validPwd(this.userInfo.pwd,8,16) ){
					
					tip.dialogTip('密码只支持!@._字母数字组合', true, this.userInfo, 'pwd');
					
				} else if(!validForm.validEqual(this.userInfo.pwd,this.userInfo.repwd)){
					
					tip.dialogTip('两次密码不一致', true, this.userInfo, 'repwd');
				
				} else if (!validForm.validEqual(this.userInfo.validcode, this.validCode) || this.userInfo.validcode.length < 6) {

						//验证密码
						tip.dialogTip('验证码不正确', true, this.userInfo, 'validcode');
				} else{
					// 存储之前需要验证是否存在该用户
					console.log(this.users,'----')
					for (var i = 0; i < this.users.length; i++){
						// 如果相同的手机号
						if(this.users[i].phone == this.userInfo.phone){
							tip.dialogTip('该手机号被注册过');
							return;
						}
						
					}
					
					// 如果不存在该用户，就会添加一个用户
					var time = new Date();
					var uid = 'vue' + time.getTime();
					var phone = this.userInfo.phone;
					var pwd = this.userInfo.pwd;
					var regtime = tool.format(time,'yyyy-MM-dd hh:mm:ss');
					
					var user = {
						uid,
						phone,
						pwd,
						regtime
					};
					this.users.push(user);
					var usersData = JSON.stringify(this.users);
//					console.log('userData =>',userData);
					localStorage.setItem('users',usersData);
					   
					//跳转到登录组件    
					this.$router.push({name:'Login'});
				}

			},
			
			// 获取验证码
			getCode(){
				
				if( !validForm.validPhone(this.userInfo.phone) ){
					Dialog.alert({
						title:'手机号不正确'
					}).then(()=>{
						this.userInfo.phone = '';				
					})
				}else{
					this.isDisbabel = true;
					var time = 60;
					this.validCodeText = time + 's后重新发送';
					var timer = setInterval(() => {
						
						if(time <=0 ){
							this.isDisbabel = false;
							this.validCodeText = '发送验证码';
							// 清除定时器
							clearInterval(timer);
							time = null;
						}else{
							this.validCodeText = --time + 's后重新发送';
						}
					},1000)
					
					// 获取验证码
					this.validCode = validForm.getrandomCode();
//					this.$message('你的验证码是'+this.validCode);
					this.$notify({
			          title: '80001',
			          message: '亲，你的验证码是'+this.validCode,
			          duration: 0
			        });
				}
			},
			
			onClickLeft(){
				this.$router.go(-1);
			}
			
		},
		// 初始化前   
		created(){
			
			var userData = localStorage.getItem('users');
//			console.log('userData =>',userData);
			this.users = userData == undefined ? [] : JSON.parse(userData);
		}
		
		
		
		
	}
</script>

<style lang="less" scoped>
	
	.register{
		padding-top: 4rem;
		width: 100%;
		height: 14.2rem;
		/*background: url(../assets/img1/bjt01.jpg);*/
		background-size: cover;
		.van-nav-bar{
			width: 100%;
			position: fixed;
			top: 0;
		}
	}
	
	.van-field{
		background: #FFFFFF;
		margin: 0.6rem 0;
	}
	.register-btn{
		margin: 0.6rem 0;
		background: #E54847;
		letter-spacing: 0.1rem;
		border-radius: 0.3rem;
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
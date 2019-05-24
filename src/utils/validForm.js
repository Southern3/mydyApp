export default {

	//验证手机号
	validPhone(value) {

		return /^1[3456789]\d{9}$/.test(value);

	},
	
	// 验证密码[!@.,]
	validPwd(value,min,max){
		return new RegExp('^[!@\\.\\w]{'+ min +',' + max + '}$').test(value);  
	},
	
	// 验证两值严格相等 object(a,b)
	validEqual(v1,v2){
		return Object.is(v1,v2);
	},
	
	// 随机生成验证码
	getrandomCode(){
		
		var time = new Date().getTime().toString().substr(-3,3);
		
		var random = Math.random().toString().substr(-3,3);
		
		return time.concat(random)
	}


}
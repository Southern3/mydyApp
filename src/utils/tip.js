import Vue from 'vue'

import { Dialog } from 'vant'

Vue.use(Dialog)

export default{
	
	dialogTip(title,isClear,o,property){
		// title 提示信息
		// isClear 是否清空对象属性值
		// o : 清空属性值对象
		// property：对象o的属性
		Dialog.alert({
			title,
		}).then(() => {
			if(typeof isClear === 'boolean' && isClear){
				o[property] = '';
			}
		})
		
		
	}
	
	
}

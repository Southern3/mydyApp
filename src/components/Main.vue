<template>
	<div class="main" >
		
		  	
		<router-view></router-view>
		
		<!-- 标签导航 -->
		<van-tabbar class="tabbar" v-model="active">
		  <van-tabbar-item :icon="item.icon" v-for="(item, index) in tabs" :key="index" @click="goState(item.path)">{{item.title}}</van-tabbar-item>
		</van-tabbar>
		
		<!--<van-loading v-if="isLoading" class="loading" type="spinner" color="white" />-->
		
	</div>
	
	
	
</template>

<script>

	//导入组件
	import { Tabbar, TabbarItem,  } from 'vant'
	
	export default{
		name:'Main',
		
		data(){
			return{
				active:0,
				tabs: [
					{title: '电影', icon: 'video-o', path: {name: 'Index'}},
					{title: '影院', icon: 'tv-o', path:{name: 'Cinema'}},
					{title: '我的', icon: 'manager-o', path: {name: 'MyCenter'}}
				]
			};
		},
		
		
		
		methods:{
			goState(path){
				this.$router.push(path);
			}
		},
		components: {

			[Tabbar.name]: Tabbar,

			[TabbarItem.name]: TabbarItem

		},

	
			
			

		
		
	}
</script>

<style lang="less" scoped>
	
	
.main{
	width: 100%;
	height: 100%;
	padding-bottom:1.4rem;
	}
.tabbar{
	/*position: fixed;
	bottom: 0;*/
	z-index: 666;
	margin: 0 auto;
	max-width: 640PX;
}
</style>
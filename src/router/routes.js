// 导入文件时, 如果没有 ./, 默认从node_modules查找文件
import routesComponent from './routesComponent.js'

//路由配置
export default [


		{
		path: '/',
		name: 'Main',
		component: routesComponent.Main,
			children:[
				{
				path: '/index',
				name: 'Index',
				component: routesComponent.Index
				},
				{
				path: '/cinema',
				name: 'Cinema',
				component: routesComponent.Cinema
				},
				{
				path: '/mycenter',
				name: 'MyCenter',
				component: routesComponent.MyCenter
				}		
//				{
//				path: '*',
//				redirect: {name: 'Index'}
//			}
			]
		},
		{
		path: '/login',
		name: 'Login',
		component: routesComponent.Login
		},
		{
		path: '/search',
		name: 'Search',
		component: routesComponent.Search
		},
		{
		path: '/movieDetails/:pid',
		name: 'MovieDetails',
		component: routesComponent.MovieDetails
		},
		{
		path: '/register',
		name: 'Register',
		component: routesComponent.Register
		},
		{
		path: '/city',
		name: 'City',
		component: routesComponent.City
		},
  		
		{
		path: '/cinemaDetails/:pid',
		name: 'CinemaDetails',
		component: routesComponent.CinemaDetails
		},
		{
		path: '/introduce/:pid',
		name: 'Introduce',
		component: routesComponent.Introduce
		},
		{
		path: '/seat',
		name: 'Seat',
		component: routesComponent.Seat
		},		
		{
		path: '/payment',
		name: 'Payment',
		component: routesComponent.Payment
		}
		
]
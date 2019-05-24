export default {
	
	Main: r => require(['@/components/Main'], r),
	
	Index: r => require(['@/components/Index'], r),
	
	MyCenter: r => require(['@/components/MyCenter'], r),
	
	Login: r => require(['@/components/Login'], r),
	
	Search: r => require(['@/components/Search'], r),
	
	MovieDetails: r => require(['@/components/MovieDetails'], r),
	
	Register: r => require(['@/components/Register'], r),
	
	City: r => require(['@/components/City'], r),
	
	Cinema: r => require(['@/components/Cinema'], r),
	
	CinemaDetails: r => require(['@/components/CinemaDetails'], r),
	
	Introduce: r => require(['@/components/Introduce'], r),
	
	Seat: r => require(['@/components/Seat'], r),
	
	Payment: r => require(['@/components/Payment'], r),
}
// 正在热映电影
const url = "https://douban.uieee.com/v2/movie/in_theaters"
// 即将上映电影
const soonurl = "https://douban.uieee.com/v2/movie/coming_soon"
// 获取电影top250
const top250url = "https://douban.uieee.com/v2/movie/top250?start=0&count=40"

const cityjson = require("./Cityid.json")

const cinema = require("./moviedetail.json")

module.exports = {
	configureWebpack:{
		devServer:{
			proxy:{
				'/api':{
					target:"https://douban.uieee.com",
					pathRewrite:{'^/api':''}
				},
				'/top250api':{
					target:"https://douban.uieee.com",
					pathRewrite:{'^/top250api':''}
				},
				'/soonurl':{
					target:"https://douban.uieee.com",
					pathRewrite:{'^/soonurl':''}
				}
			},
			before(app){
		  app.get('/city/cityjson', function(req, res) {
		    res.json({ data: cityjson });
		  });
		  app.get('/yy/cinema', function(req, res) {
		    res.json({ data: cinema });
		  });
			}
		}
	}
}

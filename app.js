const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')


app.use(cors({
	origin: function (ctx) {
		let re = new RegExp("^"+'/weapp')
		if (ctx.url.match(re)) {
			return "*"; // 允许来自所有域名请求
		}
		// return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
		// return "*";
	},
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
	maxAge: 5,
	credentials: true,
	allowMethods: ['GET', 'POST', 'DELETE'],
	allowHeaders: ['Content-Type', 'Authorization', 'Accept','X-Token'],
	
}))

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes())


// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))

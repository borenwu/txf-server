const {mysql} = require ('../qcloud')
const monment = require('moment')

async function add (ctx, next) {
	const {item_id,title, description, market_price, sale_price, unit, spec, platform_id, community_id, open_date, close_date, fileList} = ctx.request.body
	if (item_id) {
		try {
			let id = await mysql ('orders')
				.returning ('id')
				.insert ({
					item_id,
					title,
					description,
					market_price,
					sale_price,
					unit,
					spec,
					platform_id,
					community_id,
					open_date,
					close_date
				})
			fileList.forEach (file => {
				addImages (id, file.url, file.type)
			})
			const orders = await mysql ('orders')
				.where ('id', id)
				.select ('*')
			orders[0].open_date = monment(order.open_date).format('YYYY-MM-DD')
			orders[0].close_date = monment(order.close_date).format('YYYY-MM-DD')
			ctx.state.data = {
				id: id[0],
				order:orders[0],
				msg: 'success'
			}
		} catch (e) {
			ctx.state = {
				code: -1,
				data: {
					msg: '新增失败：' + e
				}
			}
		}
		
	}
}

async function addImages (order_id, url, type) {
	if (order_id && url) {
		try {
			let id = await mysql ('images')
				.returning ('id')
				.insert ({
					order_id, url, type
				})
		} catch (e) {
			console.log (e.sqlMessage)
		}
		
	}
}

async function remove (ctx, next) {
	const {order_id} = ctx.request.body
	if (order_id) {
		try {
			await mysql ('orders')
				.where ('id', order_id)
				.del ()
			await mysql ('images')
				.where ('order_id', order_id)
				.del ()
			ctx.state.data = {
				msg: 'success'
			}
		} catch (e) {
			ctx.state = {
				code: -1,
				data: {
					msg: '删除失败：' + e.sqlMessage
				}
			}
		}
	}
}

async function find (ctx, next) {
	const {platform_id} = ctx.request.body
	if (platform_id) {
		try {
			const orders = await mysql ('orders')
				.where ('platform_id', platform_id)
				.select ('*')
				.orderBy ('id', 'desc')
			orders.forEach(order=>{
				order.open_date = monment(order.open_date).format('YYYY-MM-DD')
				order.close_date = monment(order.close_date).format('YYYY-MM-DD')
			})
			ctx.state.data = {
				list: orders
			}
		} catch (e) {
			ctx.state = {
				code: -1,
				data: {
					msg: '查询失败：' + e.sqlMessage
				}
			}
		}
	}
}

async function findImages (ctx, next) {
	const {order_id} = ctx.request.body
	if (order_id) {
		try {
			const images = await mysql ('images')
				.where ('order_id', order_id)
				.select ('id','type','url')
			let thumb = images.filter(item => item.type === 'thumb')
			let image = images.filter(item => item.type === 'image')
			ctx.state.data = {
				images: images,
				thumb:thumb,
				image:image
			}
		} catch (e) {
			ctx.state = {
				code: -1,
				data: {
					msg: '查询失败：' + e.sqlMessage
				}
			}
		}
	}
}

// async function update (ctx, next) {
// 	const {order_id, description, market_price, sale_price,} = ctx.request.body
// 	await mysql ('items')
// 		.where ('id', order_id)
// 		.update ({
// 			market_price: market_price,
// 			sale_price: sale_price,
// 			description: description
// 		})
// }


module.exports = {
	add,
	remove,
	find,
	findImages
	// update
}

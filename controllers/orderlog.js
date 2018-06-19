const {mysql} = require ('../qcloud')

async function add (ctx, next) {
	const {create_date, openid, order_id, unit, amount, sale_price, total_sale, platform_id, community_id} = ctx.request.body
	if (name) {
		try {
			let id = await mysql ('orderlogs')
				.returning ('id')
				.insert ({
					create_date, openid, order_id, unit, amount, sale_price, total_sale, platform_id, community_id
				})
			ctx.state.data = {
				id: id[0],
				name,
				msg: 'success'
			}
		} catch (e) {
			ctx.state = {
				code: -1,
				data: {
					msg: '新增失败：' + e.sqlMessage
				}
			}
		}
		
	}
}

async function remove (ctx, next) {
	const {orderlog_id} = ctx.request.body
	if (orderlog_id) {
		try {
			await mysql ('orderlogs')
				.where ('id', orderlog_id)
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
			const orderlogs = await mysql ('orderlogs')
				.where ('platform_id', platform_id)
				.select ('*')
				.orderBy ('id', 'desc')
			ctx.state.data = {
				list: orderlogs
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
// 	await mysql ('goods')
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
	// update
}

const {mysql} = require ('../qcloud')

async function add (ctx, next) {
	const {community_name, province, city, description, platform_id} = ctx.request.body
	if (community_name) {
		const findRes = await mysql ('communities').select ().where ('community_name', community_name)
		if (findRes.length) {
			ctx.state = {
				code: -1,
				data: {
					msg: '平台已存在'
				}
			}
			return
		}
		
		try {
			let id = await mysql ('communities')
				.returning('id')
				.insert ({
					community_name, province, city, description, platform_id
				})
			ctx.state.data = {
				id:id[0],
				community_name,
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
	const {community_id} = ctx.request.body
	if (community_id) {
		try {
			await mysql ('communities')
				.where ('id', community_id)
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
			const communities = await mysql ('communities')
				.where ('platform_id', platform_id)
				.select ('*')
				.orderBy ('id', 'desc')
			ctx.state.data = {
				list: communities
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

async function update (ctx, next) {
	const {community_id, community_name, province, city, description} = ctx.request.body
	await mysql ('communities')
		.where ('id', community_id)
		.update ({
			community_name: community_name,
			province: province,
			city: city,
			description: description
		})
}


module.exports = {
	add,
	remove,
	find,
	update
}

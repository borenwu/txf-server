/**
 * 腾讯云微信小程序解决方案
 * Demo 数据库初始化脚本
 * @author Jason
 */
const fs = require ('fs')
const path = require ('path')
const {mysql: config} = require ('../config')

console.log ('\n======================================')
console.log ('开始初始化数据库...')

let files = []

// 初始化 SQL 文件路径
let file1 = path.join (__dirname, './cAuth.sql')
files.push (file1)
let file2 = path.join (__dirname, './platforms.sql')
files.push (file2)
let file3 = path.join (__dirname, './communities.sql')
files.push (file3)
let file4 = path.join (__dirname, './items.sql')
files.push (file4)
let file5 = path.join (__dirname, './orders.sql')
files.push (file5)
let file6 = path.join (__dirname, './orderlogs.sql')
files.push (file6)
let file7 = path.join (__dirname, './users.sql')
files.push (file7)
let file8 = path.join (__dirname, './images.sql')
files.push (file8)

const DB = require ('knex') ({
	client: 'mysql',
	connection: {
		host: config.host,
		port: config.port,
		user: config.user,
		password: config.pass,
		database: config.db,
		charset: config.char,
		multipleStatements: true
	}
})

files.forEach ((f) => {
	console.log (`准备读取 SQL 文件：${f}`)
	
	// 读取 .sql 文件内容
	const content = fs.readFileSync (f, 'utf8')
	
	console.log ('开始执行 SQL 文件...')
	
	// 执行 .sql 文件内容
	DB.raw (content).then (res => {
		console.log ('数据库初始化成功！')
		process.exit (0)
	}, err => {
		throw new Error (err)
	})
})


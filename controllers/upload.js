const {uploader} = require('../qcloud')
const asyncBusboy = require('async-busboy');
const qn = require('qn');

const client = qn.create({
	accessKey: 'rsnQ1mPiWJwthOmbSSIfwvsKkNX0ZzTrISaLMlM0',
	secretKey: 'Gu00U4X8-KUgHIAybg4TeeZnhjRX5d7-Dn8Jo89M',
	bucket: 'taoxianfeng',
	origin: 'pa3iktbos.bkt.clouddn.com',

	// timeout: 3600000, // default rpc timeout: one hour, optional
	// if your app outside of China, please set `uploadURL` to `http://up.qiniug.com/`
	// uploadURL: 'http://up.qiniu.com/',
});


function upload(path,key){
	return new Promise((resolve,reject) =>{
		client.uploadFile(path, {key: `${key}`}, (err, result)=> {
			if(err){
				reject(err)
			}else{
				resolve(result);
			}

			// {
			//   hash: 'FhGbwBlFASLrZp2d16Am2bP5A9Ut',
			//   key: 'qn/lib/client.js',
			//   url: 'http://qtestbucket.qiniudn.com/qn/lib/client.js'
			//   "x:ctime": "1378150371",
			//   "x:filename": "client.js",
			//   "x:mtime": "1378150359",
			//   "x:size": "21944",
			// }
		});
	})
}

module.exports = async ctx => {
	// 获取上传之后的结果
	// 具体可以查看：
	// const data = await uploader(ctx.req)

	// ctx.state.data = data
	const {files} = await asyncBusboy(ctx.req);
	try{
    	let result = await upload(files[0].path,files[0].filename);
		ctx.state.data = {
			name:files[0].filename,
			url:result.url,
			msg: 'success'
		}
	}catch(e){
		ctx.state = {
			code: -1,
			data: {
				msg: '上传失败：' + e.sqlMessage
			}
		}
	}

}

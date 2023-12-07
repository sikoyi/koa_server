'use strict';
const path = require('path');

const config = {
	mailer: {
		prot: 3000,
		host: '127.0.0.1',
	},
	// 数据库相关配置
	database: {
		USERNAME: 'root',
		PASSWORD: '123456',
		DATABASE: 'koa_demo',
		HOST: '127.0.0.1',
	},

	// 静态资源
	static: {
		prefix: '/public/',
		dir: (baseDir) => path.join(baseDir, `../public/uploads`),
		upload_dir: 'uploads',
	},

	// jwt配置
	jwt: {
		secret: 'xhzfoijtar.yyds*.123456@!',
		unless: {
			path: [/^\/public/, /\user\/login/, /\user\/register/], // 免auth鉴权路由
		},
	},
};

const userConfig = {
	verification_mode: 'jwt',
	jwt_exp: 60 * 10, // jwt过期时间(秒)
	jwt_refresh_exp: 60 * 60 * 24 * 15, // refreshToken过期时间(秒)
	socketOnlineUserRoomName: 'onlineUserRoom:', // socket所有在线用户房间名
	socketProjectRoomNamePrefix: 'roomProject:', // socket项目房间名前缀
	socketRedisExp: 30, // socket消息存入redis过期时间(秒)
	staticUseOSS: false, // 上传静态文件，使用云OSS存储
	inviteExpiresRange: 7 * 24 * 60, // 邀请有效时间（分钟）
	inviteExpiresCreateRange: 3 * 24 * 60, // 邀请有效时间更新时间，获取某个邀请时，如有效时间小于此时间，则创建一个新的邀请（分钟）
};

module.exports = {
	...config,
	...userConfig,
};

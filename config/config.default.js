'use strict';

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
};

module.exports = {
	...config,
};

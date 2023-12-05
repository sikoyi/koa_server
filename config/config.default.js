'use strict';

const config = {
	mailer: {
		prot: 3000,
		host: 'localhost',
	},
	// 数据库相关配置
	database: {
		USERNAME: 'root',
		PASSWORD: '',
		DATABASE: 'koa_demo',
		HOST: '3306',
	},
};

module.exports = {
	...config,
};

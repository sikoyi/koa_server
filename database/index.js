const mysql = require('mysql');
const { development } = require('./config.json');
//创建连接池
var pool = mysql.createPool({
	host: development.HOST,
	user: development.USERNAME,
	password: development.PASSWORD,
	database: development.DATABASE,
	port: development.PORT,
});

function query(sql) {
	return new Promise((res, rej) => {
		pool.getConnection(function (err, connection) {
			if (err) {
				rej(err);
			} else {
				connection.query(sql, (err, rows) => {
					if (err) {
						rej(err);
					} else {
						res(rows);
					}
					connection.release();
				});
			}
		});
	});
}

module.exports = {
	query,
};

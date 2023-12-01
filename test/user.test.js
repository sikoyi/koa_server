const supertest = require('supertest');
const chai = require('chai');
const app = require('../app');

const expect = chai.expect;
const request = supertest(app.listen());

// 测试套件
describe('test router', () => {
	// describe 中可以有多个 it
	//  it是对接口自动化测试的用例
	it('router /user/login', (done) => {
		request
			.post('')
			.expect(0)
			.end((err, res) => {
				expect(res.body).to.be.an('object');
				done();
			});
	});
});

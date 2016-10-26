const UserDAO = require('./../../dao/UserDAO');
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'alison',
  database: 'imgx',
  debug: false
});

const dao = UserDAO(pool);

describe('UserDAO Test', () => {

	describe('#findAll', () => {
		it('should find all user without error', (done) =>{
			dao.findAll((err, results) => {
				if(!err){
					done();
				}
				else done("An error ocurred in UserDAO: ")
			})
		});
	});
	
});
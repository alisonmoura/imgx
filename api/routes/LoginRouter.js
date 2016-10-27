var UserDAO = require('./../dao/UserDAO');

module.exports = function(app){

	const dao = UserDAO(app.locals.poolConnection);

	app.route("/login")
		.post((req, res) => {
			dao.findByEmailAndPassword(req.body.email, req.body.password, (err, result) => {
				if (!err) {
					res.json(result);
				} else {
					console.log(err);
					res.sendStatus(501);
				}
			});
		});
}
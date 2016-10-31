var UserDAO = require('./../dao/UserDAO');

module.exports = function (app) {

	const dao = UserDAO(app.locals.poolConnection);
	const onError = app.locals.sendError;

	app.route("/login")
		.post((req, res) => {
			app.locals.response = res;
			dao.findByEmailAndPassword(onError, req.body.email, req.body.password, (result) => {
				res.json(result);
			});
		});
}
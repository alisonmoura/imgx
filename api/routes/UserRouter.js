const UserDAO = require('./../dao/UserDAO');

module.exports = function (app) {

	const dao = UserDAO(app.locals.poolConnection);
	const onError = app.locals.sendError;

	app.route("/users")
	.get((req, res) => {
		app.locals.response = res;
		dao.findAll(onError,(result) => {
			res.json(result);
		});
	})
	.post((req, res) => {
		app.locals.response = res;
		dao.insert(onError, req.body, (result) => {
			res.json(result);
		})
	})
	.put((req, res) => {
		app.locals.response = res;
		dao.update(onError, req.body, (result) => {
			res.json(result);
		})
	});
}
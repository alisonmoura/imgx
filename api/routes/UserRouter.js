var UserDAO = require('./../dao/UserDAO');

module.exports = function (app) {

	const dao = UserDAO(app.locals.poolConnection);

	app.route("/users")
		.get((req, res) => {
			dao.findAll((err, result) => {
				if (!err) {
					res.json(result);
				} else res.sendStatus(501);
			});
		})
		.post((req, res) => {
			dao.insert(req.body, (err, result) => {
				if (!err) {
					res.json(result);
				} else res.sendStatus(501);
			})
		})
		.put((req, res) => {
			dao.update(req.body, (err, result) => {
				if (!err) {
					res.json(result);
				} else res.sendStatus(501);
			})
		});
}
var UserDAO = require('./../dao/UserDAO');

module.exports = function (app) {

    const dao = UserDAO(app.locals.poolConnection);

    app.route("/login")
        .post(function (req, res) {
        	console.log("chamou o login com post");
        	console.log(req.body);
            // dao.findAll(function (err, result) {
            //     if (!err) {
            //         res.json(result);
            //     } else res.sendStatus(501);
            // });
        });
}
var UserDAO = require('./../dao/UserDAO');

module.exports = function (app) {

    const dao = UserDAO(app.locals.poolConnection);

    app.route("/users")
        .get(function (req, res) {
            dao.findAll(function (err, result) {
                if (!err) {
                    res.json(result);
                } else res.sendStatus(501);
            });
        });
}
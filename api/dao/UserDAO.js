module.exports = function (pool) {

    this.findAll = function (callback) {
        pool.getConnection(function (err, connection) {
            if (!err) {
                connection.query("SELECT * FROM user", function (err, rows, fields) {
                    connection.release();
                    if (!err) {
                        callback(null, rows);
                    } else callback(err, null);
                })
            } else callback(err, null);
        });
    }

    this.findByEmailAndPassword = function (email, password, callback) {
        pool.getConnection(function (err, connection) {
            if (!err) {
                connection.query("SELECT * FROM user WHERE email=? AND password=? LIMIT 1", [email, password], function (err, rows, fields) {
                    connection.release();
                    if (!err) {
                        callback(null, rows[0]);
                    } else callback(err, null);
                })
            } else callback(err, null);
        });
    }

    return this;
}
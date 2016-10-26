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

    return this;
}
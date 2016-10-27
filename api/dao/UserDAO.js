module.exports = function (pool) {

    this.findAll = (callback) => {
        pool.getConnection((err, connection) => {
            if (!err) {
                connection.query("SELECT * FROM user", (err, rows, fields) => {
                    connection.release();
                    if (!err) {
                        callback(null, rows);
                    } else callback(err, null);
                })
            } else callback(err, null);
        });
    }

    this.findByEmailAndPassword = (email, password, callback) => {
        pool.getConnection((err, connection) => {
            if (!err) {
                connection.query("SELECT * FROM user WHERE email=? AND password=? LIMIT 1", [email, password], (err, rows, fields) => {
                    connection.release();
                    if (!err) {
                        callback(null, rows[0]);
                    } else callback(err, null);
                })
            } else callback(err, null);
        });
    }

    this.insert = (user, callback) => {
        pool.getConnection((err, connection) => {
            if (!err) {
                connection.query("INSERT INTO user (name, email, password) VALUES(?,?,?)", [user.name, user.email, user.password], (err, rows, fields) => {
                    connection.release();
                    if (!err) {
                        callback(null, rows[0]);
                    } else callback(err, null);
                })
            } else callback(err, null);
        });
    }

    this.update = (user, callback) => {
        pool.getConnection((err, connection) => {
            if (!err) {
                connection.query("UPDATE user SET name=?, email=?, password=? WHERE id=?", [user.name, user.email, user.password, user.id], (err, rows, fields) => {
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
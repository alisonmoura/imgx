module.exports = function (pool) {

    this.findAll = (error, callback) => {
        pool.getConnection((err, connection) => {
            if (!err) {
                connection.query("SELECT * FROM user", (err, rows, fields) => {
                    connection.release();
                    if (!err) {
                        callback(rows);
                    } else error(err);
                })
            } else error(err);
        });
    }

    this.findByEmailAndPassword = (error, email, password, callback) => {
        pool.getConnection((err, connection) => {
            if (!err) {
                connection.query("SELECT * FROM user WHERE email=? AND password=? LIMIT 1", [email, password], (err, rows, fields) => {
                    connection.release();
                    if (!err) {
                        callback(rows[0]);
                    } else error(err);
                })
            } else error(err);
        });
    }

    this.insert = (error, user, callback) => {
        pool.getConnection((err, connection) => {
            if (!err) {
                connection.query("INSERT INTO user (name, email, password) VALUES ?,?,?", [user.name, user.email, user.password], (err, rows, fields) => {
                    connection.release();
                    if (!err) {
                        callback(rows[0]);
                    } else error(err);
                })
            } else error(err);
        });
    }

    this.update = (error, user, callback) => {
        pool.getConnection((err, connection) => {
            if (!err) {
                connection.query("UPDATE user SET name=?, email=?, password=? WHERE id=?", [user.name, user.email, user.password, user.id], (err, rows, fields) => {
                    connection.release();
                    if (!err) {
                        callback(rows[0]);
                    } else error(err);
                })
            } else error(err);
        });
    }

    return this;
}
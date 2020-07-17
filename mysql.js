const config = {
    "host" : 'den1.mysql4.gear.host',
    "username": 'chargeup',
    "password": 'Xr8djZ4-8D_c',
    "database": 'chargeup'
};
const mysql = require('mysql');

module.exports.run = function (sql, succeeded, failed) {
    const con = mysql.createConnection({
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.database,
        insecureAuth : true,
        multipleStatements: true
    });

    con.query(sql, function (err, result, callback) {
        if (err) con.end(failed(err));
        else con.end(succeeded(result));
    });


};
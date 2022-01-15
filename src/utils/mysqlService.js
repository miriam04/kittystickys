const mysql = require('mysql');

let con = null


class MysqlService {
    constructor() {

        this.mysqlConnect()
    }

    mysqlConnect() {
        con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Hello1234",
            database: "kittystickysdb"
        })
        
        con.connect(err => {
            if(err) console.log(err)
        })
    }

    getAll() {
        return new Promise(function(res, rej) {
            con.query(`SELECT * FROM kittystickysdb.newsletter;`, (err, rows) => {
                if(err) console.log(err)
                if(rows.length <= 0) {
                    res(undefined)
                    return;
                };
                res(rows);
            })
        })
    }
}

module.exports = new MysqlService()
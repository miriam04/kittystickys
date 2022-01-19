const mysql = require('mysql');

let con = null


class MysqlService {
    constructor() {

        this.mysqlConnect()
    }

    mysqlConnect() {
        con = mysql.createConnection({
            host: "localhost",
            user: "admin",
            password: "Hello1234",
            database: "kittystickysdb"
        })
        
        con.connect(err => {
            if(err) console.log(err)
        })
    }

    create({name, lastname, email, phonenumber, street, streetnumber, zip, city}) {
        return new Promise(function(res, rej) {
            con.query(`INSERT INTO \`kittystickysdb\`.\`newsletter\` (\`name\`, \`lastname\`, \`email\`, \`phonenumber\`, \`street\`, \`streetnumber\`, \`zip\`, \`city\`) VALUES ('${name}', '${lastname}', '${email}', '${phonenumber}', '${street}', '${streetnumber}', '${zip}', '${city}');`, (err, rows) => {
                if(err) console.log(err)
                if(rows.length <= 0) {
                    res(undefined)
                    return;
                };
                res(rows);
            })
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

    update({id, name, lastname, email, phonenumber, street, streetnumber, zip, city}) {
        return new Promise(function(res, rej) {
            con.query(`UPDATE \`kittystickysdb\`.\`newsletter\` SET \`name\` = '${name}', \`lastname\` = '${lastname}', \`email\` = '${email}', \`phonenumber\` = '${phonenumber}', \`street\` = '${street}', \`streetnumber\` = '${streetnumber}', \`zip\` = '${zip}', \`city\` = '${city}' WHERE (\`id\` = '${id}');`, (err, rows) => {
                if(err) console.log(err)
                if(rows.length <= 0) {
                    res(undefined)
                    return;
                };
                res(rows);
            })
        })
    }

    delete(id) {
        return new Promise(function(res, rej) {
            con.query(`DELETE FROM \`kittystickysdb\`.\`newsletter\` WHERE (\`id\` = '${id}');`, (err, rows) => {
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
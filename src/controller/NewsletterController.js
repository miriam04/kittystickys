const { getAll } = require("../utils/mysqlService")


const list = async (req, res) => {

    const newsletters = await getAll();
    console.log(newsletters)
    res.json({newsletters})
}

module.exports = {list}
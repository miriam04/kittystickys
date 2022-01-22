const mysql = require("../utils/mysqlService")

const create = async (req, res) => {
    if(!checkIsNummer(req.body.phonenumber)) {
        return res.status(404).json({success: false})
    }
    mysql.create(req.body)
    res.status(200).json({success: true})
}

const read = async (req, res) => {
    const newsletters = await mysql.getAll();
    res.status(200).json({newsletters})
}

const update = async (req, res) => {
    if(!checkIsNummer(req.body.phonenumber)) {
        return res.status(404).json({success: false})
    }
    mysql.update(req.body)
    res.status(200).json({success: true})
}

const deleteById = async (req, res) => {
    mysql.delete(req.body.id)
    res.status(200).json({success: true})
}

function checkIsNummer(input) {
    if(!isNaN(input)) {
      return true
    } else {
      return false
    }
}
module.exports = {create, read, update, deleteById}
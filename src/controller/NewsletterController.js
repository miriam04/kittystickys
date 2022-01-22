const mysql = require("../utils/mysqlService")

const create = async (req, res) => {
    mysql.create(req.body)
    res.status(200).json({success: true})
}

const read = async (req, res) => {
    const newsletters = await mysql.getAll();
    res.status(200).json({newsletters})
}

const update = async (req, res) => {
    mysql.update(req.body)
    res.status(200).json({success: true})
}

const deleteById = async (req, res) => {
    mysql.delete(req.body.id)
    res.status(200).json({success: true})
}

module.exports = {create, read, update, deleteById}
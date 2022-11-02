const Client = require('../models/clientModel');

// USER END-POINTS
// 1) ROUTE GET ALL USERS | GET API, END-POINTS /api/v1/users
exports.getAllClient = async (req, res) => {
    try {
        // console.log(req.query);
        const users = await Client.find(req.query); // find returns array of objects
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error
        })
    }
}

// 2) ROUTE GET USER | GET API, END-POINTS /api/v1/users/id
exports.getClient = async (req, res) => {
    try {
        // const id = req.params.id
        // console.log(id)
        const user = await Client.findById(req.params.id); // 
        // console.log(typeof(req.params.id))
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error
        })
    }
}

// 3) ROUTE REGISTER A USER | POST API, END-POINTS /api/v1/users
exports.createClient = async (req, res) => {
    try {
        const newUser = await Client.create(req.body);
        // console.log(newUser)
        res.status(200).json({
            status: 'success',
            data: {
                newUser
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error
        })
    }
}
const Canteen = require('../models/canteenDataModel');

// USER END-POINTS
// 1) ROUTE GET ALL USERS | GET API, END-POINTS /api/v1/users
exports.getAllCanteen = async (req, res) => {
    try {
        // console.log(req.query);
        const canteens = await Canteen.find(req.query); // find returns array of objects
        res.status(200).json({
            status: 'success',
            results: canteens.length,
            data: {
                canteens
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
exports.getCanteen = async (req, res) => {
    try {
        // const id = req.params.id
        // console.log(id)
        const canteen = await Canteen.findById(req.params.id); // 
        // console.log(typeof(req.params.id))
        res.status(200).json({
            status: 'success',
            data: {
                canteen
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
exports.createCanteen = async (req, res) => {
    try {
        const newCanteen = await Canteen.create(req.body);
        // console.log(newUser)
        res.status(200).json({
            status: 'success',
            data: {
                newCanteen
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error
        })
    }
}
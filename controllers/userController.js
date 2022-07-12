const User = require('../models/User')


const userCtrl = {
    getAllUsers: async (req, res) => {
        try {
            const newUser = await User.find()
            console.log(newUser,"data")
            res.status(200).send({screen:true, message:"Successfully",newUser})       
        } catch (error) {
            console.log(error)
            res.status(500).send({screen:true, message:"Error"})
        }
    },
    getUserById: async (req, res) => {
        const {id} = req.params
        try {
            const newUserId = await User.findById(id)
            res.status(200).send({screen:true, message:"Successfully user ID",newUserId})
        } catch (error) {
            console.log(error)
            res.status(500).send({screen:true, message:"Error"})
        }
    }
}
module.exports = userCtrl
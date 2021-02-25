const express = require('express');
const router = express.Router();

const authrUser = require('../../model/authr/login')

router.route('/')

.post(async(req, res, next) => {
    try {
        const { body } = req;
        console.log(body);
        const result = await authrUser.find({ emailId: body.emailId });
        if (result) {
            res.status(200).json({
                data: result,
                message: 'Succcessfully logined!'
            })
        }
    } catch (error) {
        next(error);
    }
})

router.route('/create')

.post(async(req, res, next) => {
    try {
        const { body } = req;
        const userDetails = new authrUser(body);
        const result = await userDetails.save();
        if (result) {
            res.status(200).json({
                data: result,
                message: 'Successfully created'
            })
        }
    } catch (error) {
        next(error);
    }
})



module.exports = router;